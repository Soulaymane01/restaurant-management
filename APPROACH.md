# Plan de transformation : Projet Notification Temps Réel avec Redis et Python

## Résumé général

Le projet actuel est une application Next.js spécifique à un restaurant avec un tableau de bord admin, gestion de commandes et notifications basiques (localStorage). L'objectif est de le transformer en une **application générique de notifications temps réel** qui répond au cahier des charges du professeur (Redis Pub/Sub, backend Python, frontend réactif).

---

## Architecture cible

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (Next.js)                 │
│  Interface utilisateur : connexion + notifications   │
│  Connexion au backend via SSE / WebSocket             │
└──────────────┬──────────────────────────────────────┘
               │ SSE / WebSocket (flux événements)
               ▼
┌──────────────────────────────────────────────────────┐
│              Backend Python (FastAPI)                 │
│  - REST API : login, envoi notifications             │
│  - SSE endpoint : écoute Redis Pub/Sub en temps réel │
│  - redis-py pour Pub/Sub + LIST + TTL               │
└──────────────┬──────────────────────────────────────┘
               │ Pub/Sub
               ▼
┌──────────────────────────────────────────────────────┐
│                    Redis                             │
│  - Pub/Sub : canaux "notifications"                  │
│  - LIST : historique récent des notifications        │
│  - TTL : expiration automatique                      │
└──────────────────────────────────────────────────────┘
```

---

## Modifications par couche

### 1. Backend Python (NOUVEAU — à créer)

Créer un dossier `backend/` à la racine avec FastAPI et redis-py.

```
backend/
├── main.py            # Application FastAPI + endpoints
├── redis_client.py    # Connexion Redis + Pub/Sub
├── models.py          # Modèles Pydantic (Notification, User)
├── requirements.txt   # fastapi, uvicorn, redis, sse-starlette
└── .env               # REDIS_URL
```

**Endpoints REST :**
- `POST /login` — connexion utilisateur, retourne un token simple
- `POST /notify` — publie une notification sur Redis (channel)
- `GET /stream?channel=xxx` — SSE endpoint, s'abonne à un canal Redis et push les events au client
- `GET /history?channel=xxx` — retourne les N dernières notifications depuis une LIST Redis

**Logique Redis :**
- `PUBLISH notifications:{channel} "{json}"` — publication temps réel
- `LPUSH notifications:{channel}:history "{json}"` + `EXPIRE 86400` — historique avec TTL
- `LRANGE notifications:{channel}:history 0 -1` — lecture historique

### 2. Redis

Installer Redis localement (ou Docker) :

```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis

# Fedora
sudo dnf install redis
sudo systemctl start redis

# Docker
docker run -d -p 6379:6379 redis:7
```

Aucune configuration complexe — Redis sert uniquement de message broker et cache temporaire.

### 3. Frontend Next.js — Modifications

#### a. Supprimer le spécifique restaurant

- `app/lib/branch-data.ts` → remplacer par des données génériques
- Supprimer les références à "Mahrousa", "Tangier", etc. dans `layout.tsx` et `page.tsx`
- Conserver l'architecture Next.js App Router, Tailwind CSS, et les providers

#### b. Composant NotificationStream (NOUVEAU)

Remplacer le système actuel (localStorage dans `admin/page.tsx`) par un composant qui se connecte au SSE du backend Python :

```tsx
// app/components/NotificationStream.tsx
'use client';

import { useEffect, useState } from 'react';

type Notification = {
  id: string;
  type: 'info' | 'order' | 'warning';
  message: string;
  timestamp: string;
};

export function useNotificationStream(channel: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8000/stream?channel=${channel}`
    );

    eventSource.onopen = () => setConnected(true);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [data, ...prev]);
    };
    eventSource.onerror = () => setConnected(false);

    // Charger l'historique au montage
    fetch(`http://localhost:8000/history?channel=${channel}`)
      .then((r) => r.json())
      .then((history) => setNotifications(history.reverse()));

    return () => eventSource.close();
  }, [channel]);

  return { notifications, connected };
}
```

#### c. Page de connexion utilisateur (NOUVELLE)

Créer une page générique de connexion :

```
app/login/page.tsx
```

Formulaire simple (nom d'utilisateur + mot de passe) → POST `/api/login` → stocke token dans sessionStorage.

#### d. Dashboard des notifications (MODIFIÉ)

Transformer `app/admin/page.tsx` en `app/dashboard/page.tsx` générique :

- Affiche le flux temps réel via `useNotificationStream()`
- Permet de s'abonner à différents canaux (chat, alertes, tâches)
- Interface d'envoi de notification (formulaire POST `/notify`)
- Badge de connexion (connected/disconnected à Redis)

#### e. Page d'envoi de notification (NOUVELLE ou intégrée)

```
app/dashboard/send/page.tsx
```

Simple formulaire : titre, message, type (info/warning/order), canal cible.

### 4. Généralisation du projet

| Ce qui était restaurant | Ce qui devient |
|---|---|
| Commandes clients | Notifications génériques (nouveau message, alerte, update tâche) |
| Branches (Tanger, etc.) | Canaux thématiques (chat, alerts, tasks, system) |
| Admin uniquement | Multi-utilisateurs (connexion par canal) |
| Statut commande (pending, etc.) | Type notification (info, warning, alert) |
| localStorage notifications | Redis Pub/BlinkingSub en temps réel |

### 5. Communication temps réel — choix technique

**Solution retenue : Server-Sent Events (SSE)**

- Plus simple que WebSocket pour un flux unidirectionnel serveur → client
- Support natif dans les navigateurs via `EventSource` API
- Fonctionne parfaitement avec Redis Pub/Sub côté Python
- Pas de bibliothèque supplémentaire côté frontend

### 6. Installation et démarrage

```bash
# 1. Backend Python
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# 2. Redis
redis-server  # ou docker run -d -p 6379:6379 redis:7

# 3. Frontend
cd ..
npm install
npm run dev  # → http://localhost:3000
```

### 7. Fichiers à créer (résumé)

| Fichier | Action |
|---|---|
| `backend/main.py` | CRÉER — FastAPI app, endpoints REST + SSE |
| `backend/redis_client.py` | CRÉER — connexion Redis, Pub/Sub helpers |
| `backend/models.py` | CRÉER — modèles Pydantic |
| `backend/requirements.txt` | CRÉER — dépendances Python |
| `backend/.env` | CRÉER — configuration Redis |
| `app/components/NotificationStream.tsx` | CRÉER — hook SSE temps réel |
| `app/login/page.tsx` | CRÉER — page connexion utilisateur |
| `app/dashboard/page.tsx` | CRÉER — dashboard notifications |
| `app/dashboard/send/page.tsx` | CRÉER — formulaire envoi notification |

### 8. Fichiers à modifier

| Fichier | Modification |
|---|---|
| `app/layout.tsx` | Remplacer métadonnées restaurant par génériques |
| `app/page.tsx` | Remplacer landing restaurant par page d'accueil générique |
| `app/globals.css` | Garder tel quel (design system réutilisable) |
| `package.json` | Optionnel : ajouter proxy dev pour backend |

### 9. Fichiers à supprimer ou ignorer

| Fichier | Raison |
|---|---|
| `app/lib/branch-data.ts` | Données restaurant spécifiques |
| `app/lib/translations.ts` | Traductions restaurant (garder si multilingue souhaité) |
| `app/admin/` | Remplacé par `app/dashboard/` |
| `app/actions/` | Server Actions Prisma (remplacé par API Python) |
| `app/menu/`, `app/contact/`, `app/about/`, `app/history/` | Pages restaurant spécifiques |

---

## Fonctionnalités pédagogiques couvertes

| Objectif | Comment c'est atteint |
|---|---|
| Redis comme gestionnaire de données en mémoire | Pub/Sub + LIST + TTL |
| Modèle Pub/Sub et communication temps réel | Redis Pub/Sub → SSE → client |
| Gestion sessions, files d'attente, caches | Session token simple, LIST historique, TTL |
| Intégration Redis dans Python (redis-py) | Backend FastAPI avec `redis-py` |
| Interface réactive à l'arrivée d'événements | React + SSE → mise à jour instantanée |
| Connexion/déconnexion utilisateur | `/login` avec token stocké en sessionStorage |
| Abonnement à des canaux personnalisés | Paramètre `channel` dans l'URL SSE |
| Historique avec TTL | `LPUSH + LTRIM + EXPIRE` sur Redis |
| Archivage (optionnel) | Possibilité d'ajouter SQLite/PostgreSQL |

---

## Résultat final

Une application générique de **notifications en temps réel** où :
- Plusieurs utilisateurs peuvent se connecter
- Chacun s'abonne à des canaux thématiques
- Les notifications arrivent instantanément via Redis Pub/Sub
- L'historique est disponible et expire automatiquement
- Le backend est en Python/FastAPI
- Le frontend est en Next.js/React avec SSE
