'use client';

import { useState, useEffect } from 'react';
import { menuItems as initialMenuItems } from '../lib/branch-data';
import { Order, MenuItem, Notification, Tab, ORDERS_KEY, MENU_KEY, NOTIFICATIONS_KEY } from './components/types';
import AdminLogin        from './components/AdminLogin';
import AdminSidebar      from './components/AdminSidebar';
import OrdersTab         from './components/OrdersTab';
import AnalyticsTab      from './components/AnalyticsTab';
import CRMTab            from './components/CRMTab';
import MenuTab           from './components/MenuTab';
import NotificationsTab  from './components/NotificationsTab';
import SettingsTab       from './components/SettingsTab';

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized]     = useState(false);
  const [activeTab, setActiveTab]           = useState<Tab>('orders');
  const [orders, setOrders]                 = useState<Order[]>([]);
  const [menuItems, setMenuItems]           = useState<MenuItem[]>([]);
  const [notifications, setNotifications]   = useState<Notification[]>([]);
  const [settingsMsg, setSettingsMsg]       = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') setIsAuthorized(true);
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;
    setOrders(JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'));
    setMenuItems(JSON.parse(localStorage.getItem(MENU_KEY) || 'null') || initialMenuItems);
    setNotifications(JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]'));
  }, [isAuthorized]);

  // Auto-generate notification for each new pending order (once per session)
  useEffect(() => {
    if (!isAuthorized) return;
    const autoNotify = JSON.parse(localStorage.getItem('admin_auto_notify') || 'true');
    if (!autoNotify) return;
    const seen = JSON.parse(sessionStorage.getItem('admin_seen_orders') || '[]') as number[];
    const newPending = orders.filter(o => o.status === 'pending' && !seen.includes(o.id));
    if (newPending.length === 0) return;
    const additions: Notification[] = newPending.map(o => ({
      id: Date.now() + o.id,
      type: 'order' as const,
      message: `New order #${String(o.id).slice(-5)} from ${o.customer} — ${o.total} DH`,
      date: new Date().toISOString(),
      read: false,
    }));
    const updated = [...notifications, ...additions];
    setNotifications(updated);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    sessionStorage.setItem('admin_seen_orders', JSON.stringify([...seen, ...newPending.map(o => o.id)]));
  }, [orders, isAuthorized]);

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const n: Notification = { id: Date.now(), type, message, date: new Date().toISOString(), read: false };
    const updated = [...notifications, n];
    setNotifications(updated);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthorized(false);
  };

  if (!isAuthorized) {
    return <AdminLogin onLogin={() => setIsAuthorized(true)} />;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          orders={orders}
          notifications={notifications}
          onLogout={handleLogout}
        />

        <div className="flex-1 p-6 md:p-10 pb-28 md:pb-10 overflow-x-hidden min-w-0">
          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              setOrders={setOrders}
              onNewNotification={(msg) => addNotification(msg, 'order')}
            />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsTab orders={orders} menuItems={menuItems} />
          )}
          {activeTab === 'crm' && (
            <CRMTab orders={orders} />
          )}
          {activeTab === 'menu' && (
            <MenuTab menuItems={menuItems} setMenuItems={setMenuItems} />
          )}
          {activeTab === 'notifications' && (
            <NotificationsTab notifications={notifications} setNotifications={setNotifications} />
          )}
          {activeTab === 'settings' && (
            <SettingsTab
              onLogout={handleLogout}
              onSettingsMessage={(msg) => { setSettingsMsg(msg); addNotification(msg, 'info'); }}
              settingsMsg={settingsMsg}
            />
          )}
        </div>
      </div>
    </main>
  );
}
