'use client';

import { useEffect, useState } from 'react';

export type NotificationType = 'info' | 'order' | 'warning' | 'alert' | 'success';

export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  timestamp: string;
  channel?: string;
}

export function useNotificationStream(channel: string = 'system') {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch initial history
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/history?channel=${channel}`);
        if (response.ok) {
          const history = await response.json();
          if (isMounted) {
            setNotifications(history.reverse());
          }
        }
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    
    fetchHistory();

    // 2. Setup SSE connection
    // NOTE: When Person 4 implements Auth, we might need to adjust this
    // if a token needs to be passed in the URL (e.g. &token=XYZ)
    const eventSource = new EventSource(`http://localhost:8000/stream?channel=${channel}`);

    eventSource.onopen = () => {
      if (isMounted) {
        setConnected(true);
        setError(null);
      }
    };

    eventSource.onmessage = (event) => {
      try {
        const data: Notification = JSON.parse(event.data);
        if (isMounted) {
          setNotifications((prev) => {
            // Prevent duplicates if history already loaded it
            if (prev.some(n => n.id === data.id)) return prev;
            return [data, ...prev];
          });
        }
      } catch (err) {
        console.error("Failed to parse SSE data", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE Connection Error", err);
      if (isMounted) {
        setConnected(false);
        setError("Connexion perdue. Tentative de reconnexion...");
      }
    };

    // Cleanup on unmount or channel change
    return () => {
      isMounted = false;
      eventSource.close();
      setConnected(false);
    };
  }, [channel]);

  return { notifications, connected, error };
}
