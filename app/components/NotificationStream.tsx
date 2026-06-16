'use client';

import { useEffect, useState, useRef } from 'react';

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
  // Track consecutive errors to avoid flashing "Déconnecté" on normal SSE reconnects
  const errorCountRef = useRef(0);
  const disconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const eventSource = new EventSource(`http://localhost:8000/stream?channel=${channel}`);

    eventSource.onopen = () => {
      if (isMounted) {
        // Clear any pending disconnect timer on successful reconnect
        errorCountRef.current = 0;
        if (disconnectTimerRef.current) {
          clearTimeout(disconnectTimerRef.current);
          disconnectTimerRef.current = null;
        }
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
      // onerror fires on every SSE timeout/reconnect — this is normal browser behavior.
      // EventSource auto-reconnects, so we debounce: only show "Déconnecté" after
      // 2 consecutive errors with a 4-second delay.
      errorCountRef.current += 1;
      if (errorCountRef.current >= 2 && isMounted) {
        disconnectTimerRef.current = setTimeout(() => {
          if (isMounted) {
            setConnected(false);
            setError("Connexion perdue. Tentative de reconnexion...");
          }
        }, 4000);
      }
    };

    // Cleanup on unmount or channel change
    return () => {
      isMounted = false;
      errorCountRef.current = 0;
      if (disconnectTimerRef.current) {
        clearTimeout(disconnectTimerRef.current);
      }
      eventSource.close();
      setConnected(false);
    };
  }, [channel]);

  return { notifications, connected, error };
}
