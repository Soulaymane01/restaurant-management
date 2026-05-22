const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

const defaultImage = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80";

const menuData = [
  // BURGERS
  { categoryId: "burgers", nameEn: "Classic Burger", price: 45, descEn: "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon" },
  { categoryId: "burgers", nameEn: "Mushroom Burger", price: 49, descEn: "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Cheddar, Champignon" },
  { categoryId: "burgers", nameEn: "Cheese Burger", price: 49, descEn: "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Fromage Cheddar" },
  { categoryId: "burgers", nameEn: "Smoke Burger", price: 49, descEn: "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar, Champignon, Sauce Barbecue, Oignon" },
  { categoryId: "burgers", nameEn: "Buffalo Chicken", price: 49, descEn: "Blanc de Poulet Frit, Sauce Buffalo, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar" },
  { categoryId: "burgers", nameEn: "Zinger Burger", price: 49, descEn: "Steak Haché Grillé, Salade, Tomate, Sauce Jalapeño, Cornichon, Sauce Mayonnaise, Fromage Cheddar" },

  // SANDWICHS
  { categoryId: "sandwichs", nameEn: "Super Crunchy", price: 49, descEn: "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Mozzarella, Mayonnaise, Frites" },
  { categoryId: "sandwichs", nameEn: "S. Crunchy Spicy", price: 49, descEn: "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites" },
  { categoryId: "sandwichs", nameEn: "Filet Mushroom", price: 59, descEn: "Viande de Bœuf Grillée, Mushrooms Sauce, Frites" },
  { categoryId: "sandwichs", nameEn: "Shish Tawook", price: 49, descEn: "Cuisses de Poulet Grillées, Oignon, Poivron, Sauce Cocktail, Frites" },
  { categoryId: "sandwichs", nameEn: "Chicken Alfredo", price: 49, descEn: "Blanc de Poulet Grillé, Sauce Alfredo, Frites" },
  { categoryId: "sandwichs", nameEn: "Grilled Chicken", price: 49, descEn: "Blanc de Poulet Grillé, Tomate, Laitue, Cornichons, Fromage Cheddar, Mayonnaise, Frites" },
  { categoryId: "sandwichs", nameEn: "Chicken Beignet", price: 49, descEn: "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites" },
  { categoryId: "sandwichs", nameEn: "Double Cross", price: 49, descEn: "Poulet Grillé, Oignon, Poivron, Champignons, Fromage Mozzarella, Frites" },
  { categoryId: "sandwichs", nameEn: "Chicken Fajitas", price: 49, descEn: "Blanc de Poulet Grillé, Oignon, Poivron, Olive Noire, Frites" },
  { categoryId: "sandwichs", nameEn: "Beef Fajitas", price: 59, descEn: "Viande de Bœuf Grillée, Oignon, Poivron, Olive Noire, Frites" },
  { categoryId: "sandwichs", nameEn: "Kefta Grillée", price: 59, descEn: "Viande Hachée Grillée, Sauce Blanche, Salade Arabe, Frites" },
  { categoryId: "sandwichs", nameEn: "Filet Pepper", price: 59, descEn: "Viande de Bœuf Grillée, Pepper Sauce, Frites" },

  // SHAWARMAS
  { categoryId: "shawarmas", nameEn: "Dürum Döner", price: 49, descEn: "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche" },
  { categoryId: "shawarmas", nameEn: "Shawarma 3ich", price: 35, descEn: "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche" },
  { categoryId: "shawarmas", nameEn: "Shawarma Baguette", price: 40, descEn: "Baguette, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche" },
  { categoryId: "shawarmas", nameEn: "Shawarma Jumbo 1", price: 79, descEn: "Shawarma Poulet, Riz, Tomate, Maïs, Fromage Rouge ou Sauce Blanche, Frites — Sur Charbon" },
  { categoryId: "shawarmas", nameEn: "Shawarma Jumbo 2", price: 79, descEn: "Shawarma Poulet, Tomate, Carotte, Œuf, Haricots, Pomme de Terre, Oignon, Sauce Blanche, Frites" },

  // PLATS
  { categoryId: "plats", nameEn: "Smock Chicken", price: 89, descEn: "Poulet Frit, Riz Basmati, Amande, Raisin, Salade Arabe, Dinde Fumée, Fromage Cheddar, Sauce Barbecue, Frites" },
  { categoryId: "plats", nameEn: "Chicken Thunder", price: 65, descEn: "Chicken Thunder Frit, Honey Mustard Sauce, Frites" },
  { categoryId: "plats", nameEn: "Grill Chicken", price: 79, descEn: "Blanc de Poulet Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites" },
  { categoryId: "plats", nameEn: "Shish Tawook Chicken", price: 79, descEn: "Shish Tawook Chicken Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Frites" },
  { categoryId: "plats", nameEn: "Kefta Grillée", price: 89, descEn: "Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites" },
  { categoryId: "plats", nameEn: "Mix Grill", price: 89, descEn: "Shish Tawook Chicken, Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites" },
  { categoryId: "plats", nameEn: "Côtelette", price: 120, descEn: "Côtelette, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites" },
  { categoryId: "plats", nameEn: "Filet Viande", price: 120, descEn: "Filet de Bœuf Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Sauce aux Choix, Frites" },

  // PIZZAS
  { categoryId: "pizzas", nameEn: "Margarita", price: 49, descEn: "Sauce Tomate, Olives et Mozzarella" },
  { categoryId: "pizzas", nameEn: "Poulet", price: 59, descEn: "Poulet Chawarma, Sauce Tomate, Olives et Mozzarella" },
  { categoryId: "pizzas", nameEn: "Chicken Pop Corn", price: 69, descEn: "Poulet Frit, Sauce Barbecue, Poivrons, Olives, Champignons et Mozzarella" },
  { categoryId: "pizzas", nameEn: "4 Fromages", price: 59, descEn: "Quatre Fromages, Cheddar, Mozzarella, Roquefort et Parmesan, Olives" },
  { categoryId: "pizzas", nameEn: "Bolognaise", price: 69, descEn: "Kefta Bolognaise, Poivrons, Olives et Mozzarella" },
  { categoryId: "pizzas", nameEn: "Pizza Végétarienne", price: 59, descEn: "" },
  { categoryId: "pizzas", nameEn: "Pizza Pepperoni", price: 59, descEn: "" },
  { categoryId: "pizzas", nameEn: "Thon", price: 59, descEn: "Oignons, Poivrons, Olives, Champignons et Mozzarella" },
  { categoryId: "pizzas", nameEn: "Fruits de Mer", price: 69, descEn: "Crevettes, Calamars, Surimi, Oignons, Poivrons, Olives, Champignons et Mozzarella" },
  { categoryId: "pizzas", nameEn: "Royale", price: 89, descEn: "Poulet, Viande Hachée, Crevettes, Calamars, Oignons, Poivrons, Olives, Champignons et Mozzarella" },

  // TACOS
  { categoryId: "tacos", nameEn: "Poulet", price: 49, descEn: "Blanc de Poulet, Sauce Fromage, Mozzarella, Frites" },
  { categoryId: "tacos", nameEn: "Viande Hachée", price: 55, descEn: "Viande Hachée, Sauce Fromage, Mozzarella, Frites" },
  { categoryId: "tacos", nameEn: "Mahrousa", price: 59, descEn: "Viande Hachée, Poulet Frit, Sauce Fromage, Dinde Fumée, Mozzarella, Frites" },
  { categoryId: "tacos", nameEn: "Nuggets", price: 49, descEn: "Nuggets, Sauce Fromage, Mozzarella, Frites" },
  { categoryId: "tacos", nameEn: "Cordon Bleu", price: 55, descEn: "Cordon Bleu, Sauce Fromage, Mozzarella, Frites" },
  { categoryId: "tacos", nameEn: "Pasticciò à la Bolognaise", price: 59, descEn: "" },
  { categoryId: "tacos", nameEn: "Pasticciò au Poulet", price: 49, descEn: "" },
  { categoryId: "tacos", nameEn: "Pasticciò au Dinde", price: 39, descEn: "" },

  // SALADES
  { categoryId: "salades", nameEn: "Salade Arabe", price: 25, descEn: "" },
  { categoryId: "salades", nameEn: "Salade Niçoise", price: 39, descEn: "" },
  { categoryId: "salades", nameEn: "Salade Maison", price: 39, descEn: "" },
  { categoryId: "salades", nameEn: "Salade Mixte", price: 39, descEn: "" },

  // EXTRAS
  { categoryId: "extras", nameEn: "Frites", price: 12, descEn: "" },
  { categoryId: "extras", nameEn: "Riz Basmati", price: 25, descEn: "" },
  { categoryId: "extras", nameEn: "Poulet", price: 25, descEn: "" },
  { categoryId: "extras", nameEn: "Fromage", price: 7, descEn: "" },

  // BOISSONS
  { categoryId: "boissons", nameEn: "Boissons Gazeuses", price: 12, descEn: "" },
  { categoryId: "boissons", nameEn: "Eau Minérale", price: 7, descEn: "" },
  { categoryId: "boissons", nameEn: "Ouïmès", price: 12, descEn: "" },
  { categoryId: "boissons", nameEn: "Thé ou Café", price: 15, descEn: "" },

  // JUS
  { categoryId: "jus", nameEn: "Citron", price: 20, descEn: "" },
  { categoryId: "jus", nameEn: "Orange", price: 25, descEn: "" },
  { categoryId: "jus", nameEn: "Mangue", price: 30, descEn: "" },
  { categoryId: "jus", nameEn: "Mangue, Petit Suisse et Dragon", price: 40, descEn: "" },
  { categoryId: "jus", nameEn: "Mangue, Ananas et Poire", price: 35, descEn: "" },
  { categoryId: "jus", nameEn: "Mangue + Petit Suisse", price: 35, descEn: "" },
  { categoryId: "jus", nameEn: "Fraise", price: 30, descEn: "" },
  { categoryId: "jus", nameEn: "Ananas", price: 30, descEn: "" },
  { categoryId: "jus", nameEn: "Ananas, Kiwi et Citron", price: 35, descEn: "" },
  { categoryId: "jus", nameEn: "Dragon", price: 35, descEn: "" },
  { categoryId: "jus", nameEn: "Dragon et Petit Suisse", price: 30, descEn: "" },
  { categoryId: "jus", nameEn: "Panaché", price: 30, descEn: "" },
  { categoryId: "jus", nameEn: "Avocat", price: 30, descEn: "" },
  { categoryId: "jus", nameEn: "Avocat Fruits Secs", price: 35, descEn: "" },
  { categoryId: "jus", nameEn: "Avocat Dragon Fruits Secs", price: 40, descEn: "" },
  { categoryId: "jus", nameEn: "Banane", price: 30, descEn: "" },
  { categoryId: "jus", nameEn: "Pomme", price: 30, descEn: "" },
  { categoryId: "jus", nameEn: "Karkade", price: 20, descEn: "" },
  { categoryId: "jus", nameEn: "Mojito", price: 25, descEn: "" },

  // JUS PRESSÉ
  { categoryId: "jus_presse", nameEn: "Ananas", price: 45, descEn: "" },
  { categoryId: "jus_presse", nameEn: "Carottes", price: 20, descEn: "" },
  { categoryId: "jus_presse", nameEn: "Grenade", price: 30, descEn: "" },
  { categoryId: "jus_presse", nameEn: "Pomme", price: 30, descEn: "" },

  // JUS ZA3ZA3
  { categoryId: "jus_za3za3", nameEn: "Za3za3 Panaché", price: 35, descEn: "" },
  { categoryId: "jus_za3za3", nameEn: "Za3za3 Avocat", price: 35, descEn: "" },
  { categoryId: "jus_za3za3", nameEn: "Za3za3 Spécial", price: 50, descEn: "" },
  { categoryId: "jus_za3za3", nameEn: "Salade de Fruits", price: 59, descEn: "" }
];

async function main() {
  console.log("Clearing existing menu items...");
  await prisma.menuItem.deleteMany({});
  console.log("Seeding new menu items...");

  for (const item of menuData) {
    await prisma.menuItem.create({
      data: {
        categoryId: item.categoryId,
        featured: false,
        available: true,
        nameEn: item.nameEn,
        nameFr: item.nameEn,
        nameAr: item.nameEn,
        descEn: item.descEn,
        descFr: item.descEn,
        descAr: item.descEn,
        price: item.price,
        image: defaultImage,
      }
    });
  }
  
  console.log("Seed completed successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
