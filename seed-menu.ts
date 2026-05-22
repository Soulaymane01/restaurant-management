import prisma from './app/lib/db';
import { menuItems } from './app/lib/branch-data';

async function updateDb() {
  await prisma.menuItem.deleteMany({});
  
  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        categoryId: item.categoryId,
        featured: item.featured,
        available: true,
        nameEn: item.names.en,
        nameFr: item.names.fr,
        nameAr: item.names.ar,
        descEn: item.descriptions.en,
        descFr: item.descriptions.fr,
        descAr: item.descriptions.ar,
        price: item.price,
        image: item.image,
      }
    });
  }
  console.log("Database updated successfully");
}

updateDb().catch(console.error).finally(() => prisma.$disconnect());
