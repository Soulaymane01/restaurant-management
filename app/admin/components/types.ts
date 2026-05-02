export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';

export type Order = {
  id: number;
  customer: string;
  phone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  branch: string;
  date: string;
  status: OrderStatus;
  note?: string;
};

export type Tab = 'orders' | 'analytics' | 'crm' | 'menu' | 'settings' | 'notifications';

export type MenuItem = {
  id: number;
  categoryId: string;
  featured: boolean;
  available?: boolean;
  names: { en: string; fr: string; ar: string };
  descriptions: { en: string; fr: string; ar: string };
  price: number;
  image: string;
  options?: { en: string; fr: string; ar: string }[];
};

export type Client = {
  name: string;
  phone: string;
  orders: Order[];
  totalSpent: number;
  orderCount: number;
  lastOrder: string;
  favBranch: string;
  segment: 'vip' | 'regular' | 'new';
};

export type Notification = {
  id: number;
  type: 'order' | 'info' | 'warning';
  message: string;
  date: string;
  read: boolean;
};

export const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; dot: string; ring: string }> = {
  pending:   { label: 'Pending',   color: 'bg-yellow-500/20 text-yellow-400', dot: 'bg-yellow-400', ring: 'ring-yellow-400/40' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-500/20 text-blue-400',     dot: 'bg-blue-400',   ring: 'ring-blue-400/40' },
  preparing: { label: 'Preparing', color: 'bg-purple-500/20 text-purple-400', dot: 'bg-purple-400', ring: 'ring-purple-400/40' },
  delivered: { label: 'Delivered', color: 'bg-green-500/20 text-green-400',   dot: 'bg-green-400',  ring: 'ring-green-400/40' },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/20 text-red-400',       dot: 'bg-red-400',    ring: 'ring-red-400/40' },
};

export const ADMIN_PASSWORD_KEY = 'admin_password';
export const DEFAULT_PASSWORD = 'admin123';
export const ORDERS_KEY = 'restaurant_orders';
export const MENU_KEY = 'restaurant_custom_menu';
export const NOTIFICATIONS_KEY = 'admin_notifications';
