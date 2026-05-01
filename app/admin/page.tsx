'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { branches, menuItems as initialMenuItems } from '../lib/branch-data';

type Order = {
  id: number;
  customer: string;
  phone: string;
  address: string;
  items: any[];
  total: number;
  branch: string;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
};

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [filter, setFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [activeTab, setActiveTab] = useState<'orders' | 'crm' | 'menu'>('orders');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Load Orders
    const savedOrders = JSON.parse(localStorage.getItem('restaurant_orders') || '[]');
    setOrders(savedOrders);

    // Load custom menu if exists
    const savedMenu = JSON.parse(localStorage.getItem('restaurant_custom_menu') || 'null');
    setMenuItems(savedMenu || initialMenuItems);

    // Check auth
    if (sessionStorage.getItem('admin_auth') === 'true') setIsAuthorized(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple placeholder password
      setIsAuthorized(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  const updateStatus = (orderId: number, newStatus: string) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o);
    setOrders(updated);
    localStorage.setItem('restaurant_orders', JSON.stringify(updated));
  };

  const updatePrice = (itemId: number, newPrice: number) => {
    const updated = menuItems.map(i => i.id === itemId ? { ...i, price: newPrice } : i);
    setMenuItems(updated);
    localStorage.setItem('restaurant_custom_menu', JSON.stringify(updated));
  };

  const dashboardData = useMemo(() => {
    const now = new Date();
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.date);
      if (filter === 'daily') return orderDate.toDateString() === now.toDateString();
      if (filter === 'weekly') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= weekAgo;
      }
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    });

    const revenue = filtered.filter(o => o.status !== 'cancelled').reduce((acc, o) => acc + o.total, 0);
    const clients = Array.from(new Set(orders.map(o => o.phone))).map(phone => {
      const cOrders = orders.filter(o => o.phone === phone);
      return {
        phone,
        name: cOrders[cOrders.length - 1].customer,
        totalSpent: cOrders.reduce((a, b) => a + b.total, 0),
        orderCount: cOrders.length,
        lastOrder: cOrders[cOrders.length - 1].date
      };
    });

    return { filtered, revenue, clients };
  }, [orders, filter]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="card w-full max-w-sm p-10 space-y-6">
          <h1 className="text-3xl font-black tracking-tighter text-center">Secure Access</h1>
          <p className="text-center opacity-40 text-xs uppercase tracking-widest">Enter Admin Password</p>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-muted border-none p-4 rounded-xl outline-none focus:ring-2 ring-primary/20 text-center text-2xl tracking-[0.5em]"
            placeholder="••••"
          />
          <button type="submit" className="btn-primary w-full py-4 uppercase font-black tracking-widest text-xs">Unlock Systems</button>
        </form>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
             <h1 className="text-5xl font-black tracking-tighter">Backstage.</h1>
             <p className="text-primary font-black uppercase text-[10px] tracking-[0.4em] mt-2">Operations Command Center</p>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl">
            {['orders', 'crm', 'menu'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white' : 'opacity-40'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'orders' && (
          <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="card bg-white/5 border-white/5">
                 <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">Total Revenue</p>
                 <h2 className="text-4xl font-black text-primary">{dashboardData.revenue} DH</h2>
               </div>
               <div className="card bg-white/5 border-white/5">
                 <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">Active Filials</p>
                 <h2 className="text-4xl font-black text-secondary">{branches.length}</h2>
               </div>
               <div className="card bg-white/5 border-white/5">
                 <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">Filters</p>
                 <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="bg-transparent border-none outline-none font-black text-xl uppercase tracking-tighter cursor-pointer">
                   <option value="daily" className="bg-black">Daily Cycle</option>
                   <option value="weekly" className="bg-black">Weekly Cycle</option>
                   <option value="monthly" className="bg-black">Monthly Cycle</option>
                 </select>
               </div>
            </div>

            <div className="space-y-4">
              {dashboardData.filtered.sort((a,b) => b.id - a.id).map(order => (
                <div key={order.id} className="card bg-white/5 border-white/5 flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                       <span className="text-primary font-black">#{order.id.toString().slice(-4)}</span>
                       <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          order.status === 'delivered' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'
                       }`}>{order.status}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-1">{order.customer}</h3>
                    <p className="opacity-40 text-xs mb-4">{order.phone} • {order.address}</p>
                    <div className="flex gap-2">
                       {order.items.map((i,idx) => <span key={idx} className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold">{i.name} x{i.quantity}</span>)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4 min-w-[200px]">
                    <span className="text-3xl font-black">{order.total} DH</span>
                    <div className="flex gap-2">
                       <button onClick={() => updateStatus(order.id, 'confirmed')} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase">Confirm</button>
                       <button onClick={() => updateStatus(order.id, 'delivered')} className="px-4 py-2 bg-green-500 text-white rounded-lg text-[10px] font-black uppercase">Ship</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.clients.map(client => (
              <div key={client.phone} className="card bg-white/5 border-white/5">
                <h3 className="text-xl font-black mb-1">{client.name}</h3>
                <p className="text-primary font-black text-sm mb-4">{client.phone}</p>
                <div className="space-y-4 pt-4 border-t border-white/10">
                   <div className="flex justify-between text-xs">
                     <span className="opacity-40 uppercase">Total Orders</span>
                     <span className="font-black">{client.orderCount}</span>
                   </div>
                   <div className="flex justify-between text-xs">
                     <span className="opacity-40 uppercase">Lifetime Value</span>
                     <span className="font-black text-secondary">{client.totalSpent} DH</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-2xl font-black mb-8">Price Engineering</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {menuItems.map(item => (
                 <div key={item.id} className="card bg-white/5 border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                       <div>
                         <h4 className="font-black">{item.name}</h4>
                         <p className="text-[10px] opacity-40 uppercase tracking-widest">{item.categoryId}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <input 
                         type="number" 
                         defaultValue={item.price} 
                         onBlur={(e) => updatePrice(item.id, parseFloat(e.target.value))}
                         className="bg-black border border-white/10 p-3 rounded-lg w-24 text-center font-black text-primary"
                       />
                       <span className="font-black text-xs opacity-40">DH</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
