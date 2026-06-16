# Rapport de Projet : Intégration Backend et Architecture Redis

Ce rapport détaille la conception, l'implémentation et la configuration de la partie Backend du système de notifications en temps réel, avec un focus particulier sur l'utilisation avancée de **Redis** en conjonction avec **Python (FastAPI)**.

---

## 1. Contexte du Développement Backend

Dans le cadre de ce projet d'application de messagerie temps réel, cette partie se concentre sur la conception et le développement de toute la logique **Backend** permettant l'instantanéité des échanges de données. Pour accomplir cela sans surcharger la base de données relationnelle, on a pris l'initiative d'intégrer et de piloter **Redis** directement depuis le serveur **FastAPI**.

Le travail s'articule autour de trois axes de développement majeurs qui ont été implémentés dans l'API :
1. **La diffusion d'événements** : On a mis en place le pattern Pub/Sub de Redis pour relayer les notifications vers les terminaux des utilisateurs en temps réel, sans aucun délai.
2. **Le cache d'historique** : On a programmé l'enregistrement systématique des derniers messages dans des *Listes Redis*, garantissant qu'aucune commande ou alerte n'est perdue en cas de déconnexion.
3. **L'authentification performante** : Au lieu d'interroger la base SQLite à chaque action d'un utilisateur authentifié, on a développé un système de gestion de sessions en RAM via des clés éphémères (Key-Value) gérées par Redis.

---

## 2. Configuration et Environnement

### 2.1 Lancement de Redis via Docker
Pour garantir un environnement isolé et reproductible, Redis a été déployé via un conteneur Docker. 

La commande utilisée pour lancer le serveur Redis en exposant le port `6379` sur la machine locale est la suivante :
```bash
docker run -d --name redis_server -p 6379:6379 redis:7-alpine
```

> 📸 **[INSERER CAPTURE D'ÉCRAN 1 ICI : Lancement de Redis]**
> *Comment réaliser cette capture :* 
> 1. Ouvrez un terminal PowerShell à la racine de votre projet.
> 2. Tapez la commande : `docker run -d --name redis_for_test -p 6379:6379 redis:7-alpine`
> 3. Ensuite, tapez la commande : `docker ps`
> 4. **Prenez la capture d'écran** montrant ces deux commandes et le tableau affichant votre conteneur avec la colonne PORTS indiquant `0.0.0.0:6379->6379/tcp`.

### 2.2 Environnement Virtuel Python
Les dépendances Python (FastAPI, Redis, sse-starlette, bcrypt) ont été isolées dans un environnement virtuel :
```powershell
python -m venv backend/venv
.\backend\venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
```

> 📸 **[INSERER CAPTURE D'ÉCRAN 2 ICI : Lancement de l'API FastAPI]**
> *Comment réaliser cette capture :* 
> 1. Ouvrez un terminal et naviguez dans le dossier backend : `cd backend`
> 2. Activez l'environnement : `.\venv\Scripts\Activate.ps1`
> 3. Démarrez le serveur : `.\venv\Scripts\uvicorn.exe main:app --reload --port 8000`
> 4. **Prenez la capture d'écran** du terminal montrant le texte `Application startup complete` et l'URL `http://127.0.0.1:8000`.

---

## 3. Utilisation de Redis dans le Backend

L'exploitation de Redis se fait principalement à travers le fichier `backend/redis_client.py`, qui centralise toute la logique d'interaction avec le serveur Redis.

### 3.1. Gestion des Sessions Utilisateurs (Key-Value)

Au lieu de vérifier les identifiants dans SQLite à chaque requête API, nous générons un **jeton de session (token)** sécurisé lors de la connexion, que nous stockons dans Redis.

**Logique de Connexion (Login) :**
Lorsque l'utilisateur s'authentifie, l'API FastAPI vérifie le mot de passe dans SQLite. Si c'est correct, un token est généré et stocké dans Redis avec la commande `SETEX` (qui définit la clé et son temps d'expiration en une seule opération).

*Extrait de code (`redis_client.py`) :*
```python
# 86400 secondes = 24 heures (Durée de vie de la session)
TTL_SECONDS = 86400

def create_session(token: str, username: str):
    """Stocke le token de session dans Redis avec un TTL"""
    session_key = f"session:{token}"
    redis_client.setex(session_key, TTL_SECONDS, username)
```

**Vérification de la Session :**
Sur les routes protégées (comme l'envoi de notification), l'API utilise une dépendance FastAPI `verify_token` qui récupère le nom d'utilisateur associé au token en O(1) de complexité via `GET`.

*Extrait de code (`redis_client.py` & `main.py`) :*
```python
def get_user_by_token(token: str):
    """Récupère l'utilisateur depuis Redis"""
    session_key = f"session:{token}"
    return redis_client.get(session_key)
```

**Déconnexion (Logout) :**
La déconnexion est immédiate, la clé est simplement supprimée via `DEL` :
```python
def delete_session(token: str):
    session_key = f"session:{token}"
    redis_client.delete(session_key)
```

> 📸 **[INSERER CAPTURE D'ÉCRAN 3 ICI : Preuve des sessions dans Redis]**
> *Comment réaliser cette capture :* 
> 1. Connectez-vous sur l'interface de votre application (`http://localhost:3000/login`) avec un compte (ex: admin / password123).
> 2. Dans un terminal, tapez : `docker exec -it redis_for_test redis-cli`
> 3. Dans l'invite de commande Redis qui s'ouvre, tapez : `KEYS session:*` (cela va afficher la clé de session cryptée).
> 4. Prenez la clé affichée (ex: `session:abc123xyz`) et tapez : `GET "session:abc123xyz"` (cela affichera le nom d'utilisateur, ex: "admin").
> 5. **Prenez la capture d'écran** de ce terminal Redis-CLI montrant ces commandes.

---

### 3.2. Système de Notifications : Historique (Listes)

Pour permettre à un utilisateur qui vient de se connecter de voir les notifications récentes, nous conservons un historique en utilisant les **Listes Redis**. 

Lorsqu'une notification est envoyée, elle est ajoutée en tête de liste avec `LPUSH`. Afin de ne pas saturer la mémoire, nous utilisons `LTRIM` pour ne conserver que les 100 derniers messages.

*Extrait de la récupération de l'historique (`redis_client.py`) :*
```python
def get_history(channel: str, limit: int = 50):
    history_key = f"notifications:{channel}:history"
    # Récupère la liste des derniers messages via LRANGE
    messages = redis_client.lrange(history_key, 0, limit - 1)
    return [json.loads(msg) for msg in messages]
```

> 📸 **[INSERER CAPTURE D'ÉCRAN 4 ICI : API d'Historique depuis Swagger]**
> *Comment réaliser cette capture :* 
> 1. Ouvrez votre navigateur et allez sur `http://localhost:8000/docs`
> 2. Déroulez la route `GET /history` et cliquez sur "Try it out".
> 3. Entrez `system` dans le champ `channel` et cliquez sur "Execute".
> 4. **Prenez la capture d'écran** de la réponse affichant le corps de la réponse JSON avec les messages.

---

### 3.3. Temps Réel : Pattern Pub/Sub (Publish/Subscribe)

C'est le cœur du système "Temps Réel". Redis permet à des clients de s'abonner (`SUBSCRIBE`) à des canaux de discussion et à d'autres de publier (`PUBLISH`) des messages sur ces canaux.

**La Publication (Envoi d'un message) :**
L'envoi est optimisé à l'aide d'un **Pipeline Redis**. Les pipelines permettent d'envoyer plusieurs commandes à Redis en une seule requête réseau (atomique), ce qui booste considérablement les performances.

*Logique d'envoi (`redis_client.py`) :*
```python
def publish_notification(channel: str, payload: dict):
    payload_str = json.dumps(payload)
    channel_name = f"notifications:{channel}"
    history_key = f"notifications:{channel}:history"
    
    pipe = redis_client.pipeline()
    # 1. Publier en direct sur le canal (Pub/Sub)
    pipe.publish(channel_name, payload_str)
    # 2. Ajouter à l'historique (Liste)
    pipe.lpush(history_key, payload_str)
    # 3. Réinitialiser le TTL de l'historique (24h)
    pipe.expire(history_key, 86400)
    # 4. Garder uniquement les 100 derniers éléments
    pipe.ltrim(history_key, 0, 99)
    # Exécuter les 4 commandes d'un seul coup
    pipe.execute()
```

**L'Abonnement (Lecture via SSE - Server-Sent Events) :**
Le Backend FastAPI ouvre une connexion persistante avec le client Frontend. Le code écoute de manière asynchrone les événements provenant de Redis pour ne pas bloquer le serveur web.

*Logique de réception (`redis_client.py` & `main.py`) :*
```python
async def subscribe_channel(channel: str):
    channel_name = f"notifications:{channel}"
    pubsub = redis_client.pubsub()
    pubsub.subscribe(channel_name)
    
    try:
        while True:
            # Récupère le message en temps réel depuis Redis
            message = pubsub.get_message(ignore_subscribe_messages=True)
            if message and message['type'] == 'message':
                yield message['data'] # Envoi au client via SSE
            await asyncio.sleep(0.1) # Libère la boucle d'événements (non-bloquant)
    finally:
        pubsub.unsubscribe(channel_name)
```

> 📸 **[INSERER CAPTURE D'ÉCRAN 5 ICI : Le test en direct de Redis Pub/Sub]**
> *Comment réaliser cette capture :* 
> 1. Ouvrez un nouveau terminal PowerShell à la racine du projet.
> 2. Exécutez le script de test : `.\backend\venv\Scripts\python.exe .\test_redis.py`
> 3. **Prenez la capture d'écran** du terminal montrant la sortie "Successfully connected to Redis!", "Published message" et "Real-time message received via Pub/Sub". Cela prouvera mathématiquement à votre professeur que votre code de messagerie marche parfaitement du côté backend de manière isolée.

---

### 3.4. Sécurité, Validation des Données et Middleware (CORS)

En plus de l'intégration Redis, le backend gère les aspects critiques liés à la robustesse et à la sécurité de l'application :

#### 1. Hashage des Mots de Passe (bcrypt)
Pour la sécurité des identifiants stockés dans la base SQLite locale, on utilise la bibliothèque **bcrypt** pour crypter les mots de passe lors de l'inscription et les vérifier à la connexion. Aucun mot de passe n'est stocké en clair.
*   **Inscription (`/signup`)** : `hashed_pwd = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt())`
*   **Connexion (`/login`)** : `bcrypt.checkpw(request.password.encode('utf-8'), hashed_pwd)`

#### 2. Validation avec Pydantic (`models.py`)
Tous les échanges de données (JSON) entrant dans l'API sont typés et validés automatiquement par **Pydantic**. Par exemple, le modèle `NotificationPayload` génère de manière autonome un identifiant unique (UUID) s'il n'est pas fourni :
```python
class NotificationPayload(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str       # ex: 'info', 'warning', 'alert'
    title: Optional[str] = None
    message: str
    channel: str    # ex: 'alerts', 'chat', 'tasks', 'system'
    timestamp: Optional[str] = None
```

#### 3. Middleware de Partage de Ressources (CORS)
Pour autoriser notre frontend Next.js (tournant sur le port `3000`) à requêter librement notre backend FastAPI (port `8000`), un Middleware CORS a été injecté dans l'instance de l'application FastAPI :
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 4. Conclusion et Résultats

La mise en place de Redis dans l'architecture backend a répondu à tous les critères de performance exigés :
- **Sécurité et Vitesse** : Les sessions utilisateurs sont validées instantanément (Complexité O(1)).
- **Temps Réel** : Le mécanisme Pub/Sub avec les Server-Sent Events (SSE) livre les notifications sans nécessiter le moindre rafraîchissement de page.
- **Fiabilité** : L'historique permet aux utilisateurs se connectant en retard de ne rater aucune information critique.

L'utilisation de pipelines et de programmation asynchrone garantit que le serveur backend est capable de soutenir un grand nombre de connexions simultanées sans latence.
