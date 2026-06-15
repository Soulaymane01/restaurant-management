'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SendNotificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    channel: 'system'
  });

  const channels = ['system', 'alerts', 'chat', 'orders', 'tasks'];
  const notificationTypes = [
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Avertissement' },
    { value: 'alert', label: 'Alerte' },
    { value: 'success', label: 'Succès' },
    { value: 'order', label: 'Commande' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.message.trim()) {
      setToast({ message: 'Le message ne peut pas être vide.', type: 'error' });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      // NOTE: Authentication token might need to be added to headers when Auth is implemented by Person 4
      const response = await fetch('http://localhost:8000/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Example
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setToast({ message: 'Notification envoyée avec succès !', type: 'success' });
        // Reset form text fields
        setFormData({ ...formData, title: '', message: '' });
        
        // Redirect to dashboard after brief delay to see the notification
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Erreur lors de l\'envoi');
      }
    } catch (err: any) {
      console.error(err);
      setToast({ message: err.message || 'Impossible de se connecter au serveur backend.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 animate-fade-in max-w-3xl">
      <div className="mb-8">
        <Link href="/dashboard" className="text-gray-500 hover:text-[var(--primary)] flex items-center gap-2 mb-4 transition-colors">
          <span>&larr;</span> Retour au Dashboard
        </Link>
        <h1 className="text-4xl brand-font">Diffuser une Notification</h1>
        <p className="text-gray-500 mt-2">Envoyez des événements en temps réel via Redis Pub/Sub.</p>
      </div>

      <div className="card glass p-6 md:p-8 relative overflow-hidden">
        {/* Toast Notification */}
        {toast && (
          <div className={`absolute top-0 left-0 right-0 p-4 text-center text-white font-medium animate-fade-in ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {toast.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={`space-y-6 ${toast ? 'pt-8' : ''} transition-all`}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="channel" className="block text-sm font-medium">Canal de destination (Channel)</label>
              <select
                id="channel"
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
              >
                {channels.map(ch => (
                  <option key={ch} value={ch}>#{ch}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium">Type d'événement</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
              >
                {notificationTypes.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">Titre (Optionnel)</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titre court de l'alerte"
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium">Message <span className="text-red-500">*</span></label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Contenu de la notification..."
              className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow resize-none"
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full md:w-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Envoi en cours...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  Diffuser l'événement
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
