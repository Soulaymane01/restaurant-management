'use client';

import { useState } from 'react';
import { useNotificationStream, Notification } from '../components/NotificationStream';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeChannel, setActiveChannel] = useState('system');
  const { notifications, connected, error } = useNotificationStream(activeChannel);

  const channels = ['system', 'alerts', 'chat', 'orders', 'tasks'];

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'alert':
        return 'border-l-4 border-red-500';
      case 'warning':
        return 'border-l-4 border-yellow-500';
      case 'info':
        return 'border-l-4 border-blue-500';
      case 'success':
      case 'order':
        return 'border-l-4 border-green-500';
      default:
        return 'border-l-4 border-gray-500';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'alert':
        return (
          <span className="flex items-center text-red-600 dark:text-red-400">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Alerte
          </span>
        );
      case 'warning':
        return (
          <span className="flex items-center text-yellow-600 dark:text-yellow-400">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Avertissement
          </span>
        );
      case 'info':
        return (
          <span className="flex items-center text-blue-600 dark:text-blue-400">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Info
          </span>
        );
      case 'success':
        return (
          <span className="flex items-center text-green-600 dark:text-green-400">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Succès
          </span>
        );
      case 'order':
        return (
          <span className="flex items-center text-green-700 dark:text-green-500">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            Commande
          </span>
        );
      default:
        return (
          <span className="flex items-center text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Notification
          </span>
        );
    }
  };

  return (
    <div className="container py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl brand-font mb-2">Notifications Hub</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="relative flex h-3 w-3">
              {connected && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            {connected ? `Connecté au canal #${activeChannel}` : 'Déconnecté / En attente...'}
          </div>
        </div>
        
        <Link href="/dashboard/send" className="btn-primary whitespace-nowrap">
          + Nouvelle Notification
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Channels */}
        <div className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="card glass">
            <h2 className="font-bold mb-4 text-lg">Canaux (Channels)</h2>
            <div className="flex flex-col gap-2">
              {channels.map((ch) => (
                <button
                  key={ch}
                  onClick={() => setActiveChannel(ch)}
                  className={`text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                    activeChannel === ch 
                      ? 'bg-[var(--primary)] text-white font-medium shadow-md' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>#{ch}</span>
                  {activeChannel === ch && <span className="text-xs opacity-70">Actif</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 space-y-4 min-w-0">
          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-lg animate-pulse-slow border border-red-200">
              {error}
            </div>
          )}

          {notifications.length === 0 ? (
            <div className="card glass text-center py-16 text-gray-500 flex flex-col items-center justify-center">
              <svg className="w-16 h-16 mb-4 opacity-30 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              <p className="text-lg">Aucune notification pour le canal #{activeChannel}</p>
              <p className="text-sm opacity-70 mt-2">En attente d'événements temps réel...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif: Notification) => (
                <div 
                  key={notif.id} 
                  className={`card glass animate-slide-left p-5 ${getNotificationStyles(notif.type)}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {getTypeBadge(notif.type)}
                      </span>
                      {notif.title && <h3 className="font-bold text-lg m-0">{notif.title}</h3>}
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-4">
                      {new Date(notif.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
