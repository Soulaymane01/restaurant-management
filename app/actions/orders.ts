'use server';

import prisma from '../lib/db';
import { Order as UIOrder, OrderStatus } from '../admin/components/types';

export async function getOrders(): Promise<UIOrder[]> {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { date: 'desc' },
  });

  return orders.map((o) => ({
    id: o.id,
    customer: o.customer,
    phone: o.phone,
    address: o.address,
    total: o.total,
    branch: o.branch,
    date: o.date.toISOString(),
    status: o.status as OrderStatus,
    note: o.note || undefined,
    items: o.items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
    })),
  }));
}

export async function updateOrderStatus(id: number, status: string) {
  await prisma.order.update({
    where: { id },
    data: { status },
  });
}

export async function updateOrderNote(id: number, note: string) {
  await prisma.order.update({
    where: { id },
    data: { note },
  });
}

export async function deleteOrder(id: number) {
  await prisma.order.delete({
    where: { id },
  });
}

export async function bulkUpdateOrders(ids: number[], status: string) {
  await prisma.order.updateMany({
    where: { id: { in: ids } },
    data: { status },
  });
}

export async function createOrder(data: Omit<UIOrder, 'id' | 'date' | 'status'>) {
  const order = await prisma.order.create({
    data: {
      customer: data.customer,
      phone: data.phone,
      address: data.address,
      total: data.total,
      branch: data.branch,
      items: {
        create: data.items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        }))
      }
    },
    include: { items: true }
  });
  return order;
}
