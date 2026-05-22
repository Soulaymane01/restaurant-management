'use server';

import prisma from '../lib/db';
import { MenuItem as UIMenuItem } from '../admin/components/types';

export async function getMenuItems(): Promise<UIMenuItem[]> {
  const items = await prisma.menuItem.findMany();
  return items.map((i) => ({
    id: i.id,
    categoryId: i.categoryId,
    featured: i.featured,
    available: i.available,
    names: { en: i.nameEn, fr: i.nameFr, ar: i.nameAr },
    descriptions: { en: i.descEn, fr: i.descFr, ar: i.descAr },
    price: i.price,
    image: i.image,
    options: i.optionsEn && i.optionsFr && i.optionsAr 
      ? JSON.parse(i.optionsEn).map((o: any, idx: number) => ({
          en: o,
          fr: JSON.parse(i.optionsFr!)[idx],
          ar: JSON.parse(i.optionsAr!)[idx],
        }))
      : undefined
  }));
}

export async function saveMenuItems(items: UIMenuItem[]) {
  // Simple approach: clear and insert. In production, a proper sync/upsert is better.
  await prisma.menuItem.deleteMany({});
  
  for (const item of items) {
    await prisma.menuItem.create({
      data: {
        categoryId: item.categoryId,
        featured: item.featured,
        available: item.available ?? true,
        nameEn: item.names.en,
        nameFr: item.names.fr,
        nameAr: item.names.ar,
        descEn: item.descriptions.en,
        descFr: item.descriptions.fr,
        descAr: item.descriptions.ar,
        price: item.price,
        image: item.image,
        optionsEn: item.options ? JSON.stringify(item.options.map(o => o.en)) : null,
        optionsFr: item.options ? JSON.stringify(item.options.map(o => o.fr)) : null,
        optionsAr: item.options ? JSON.stringify(item.options.map(o => o.ar)) : null,
      }
    });
  }
}
