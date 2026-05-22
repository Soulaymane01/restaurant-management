const fs = require('fs');

const categories = [
  { id: "featured", name: "Trending", icon: "🔥" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "sandwichs", name: "Sandwichs", icon: "🥪" },
  { id: "shawarmas", name: "Shawarmas", icon: "🌯" },
  { id: "plats", name: "Plats", icon: "🍛" },
  { id: "pizzas", name: "Pizzas", icon: "🍕" },
  { id: "tacos", name: "Tacos", icon: "🌮" },
  { id: "salades", name: "Salades", icon: "🥗" },
  { id: "extras", name: "Extras", icon: "🍟" },
  { id: "boissons", name: "Boissons", icon: "🥤" },
  { id: "jus", name: "Jus", icon: "🧃" },
  { id: "jus_presse", name: "Jus Pressé", icon: "🍹" },
  { id: "jus_za3za3", name: "Jus Za3za3", icon: "🥤" }
];

const menuData = [
  // Burgers
  { cat: "burgers", n: "Classic Burger", d: "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon", p: 45 },
  { cat: "burgers", n: "Mushroom Burger", d: "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Cheddar, Champignon", p: 49 },
  { cat: "burgers", n: "Cheese Burger", d: "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Fromage Cheddar", p: 49 },
  { cat: "burgers", n: "Smoke Burger", d: "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar, Champignon, Sauce Barbecue, Oignon", p: 49 },
  { cat: "burgers", n: "Buffalo Chicken", d: "Blanc de Poulet Frit, Sauce Buffalo, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar", p: 49 },
  { cat: "burgers", n: "Zinger Burger", d: "Steak Haché Grillé, Salade, Tomate, Sauce Jalapeño, Cornichon, Sauce Mayonnaise, Fromage Cheddar", p: 49 },
  // Sandwichs
  { cat: "sandwichs", n: "Super Crunchy", d: "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Mozzarella, Mayonnaise, Frites", p: 49 },
  { cat: "sandwichs", n: "S. Crunchy Spicy", d: "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites", p: 49 },
  { cat: "sandwichs", n: "Filet Mushroom", d: "Viande de Bœuf Grillée, Mushrooms Sauce, Frites", p: 59 },
  { cat: "sandwichs", n: "Shish Tawook", d: "Cuisses de Poulet Grillées, Oignon, Poivron, Sauce Cocktail, Frites", p: 49 },
  { cat: "sandwichs", n: "Chicken Alfredo", d: "Blanc de Poulet Grillé, Sauce Alfredo, Frites", p: 49 },
  { cat: "sandwichs", n: "Grilled Chicken", d: "Blanc de Poulet Grillé, Tomate, Laitue, Cornichons, Fromage Cheddar, Mayonnaise, Frites", p: 49 },
  { cat: "sandwichs", n: "Chicken Beignet", d: "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites", p: 49 },
  { cat: "sandwichs", n: "Double Cross", d: "Poulet Grillé, Oignon, Poivron, Champignons, Fromage Mozzarella, Frites", p: 49 },
  { cat: "sandwichs", n: "Chicken Fajitas", d: "Blanc de Poulet Grillé, Oignon, Poivron, Olive Noire, Frites", p: 49 },
  { cat: "sandwichs", n: "Beef Fajitas", d: "Viande de Bœuf Grillée, Oignon, Poivron, Olive Noire, Frites", p: 59 },
  { cat: "sandwichs", n: "Kefta Grillée", d: "Viande Hachée Grillée, Sauce Blanche, Salade Arabe, Frites", p: 59 },
  { cat: "sandwichs", n: "Filet Pepper", d: "Viande de Bœuf Grillée, Pepper Sauce, Frites", p: 59 },
  // Shawarmas
  { cat: "shawarmas", n: "Dürum Döner", d: "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche", p: 49 },
  { cat: "shawarmas", n: "Shawarma 3ich", d: "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche", p: 35 },
  { cat: "shawarmas", n: "Shawarma Baguette", d: "Baguette, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche", p: 40 },
  { cat: "shawarmas", n: "Shawarma Jumbo 1", d: "Shawarma Poulet, Riz, Tomate, Maïs, Fromage Rouge ou Sauce Blanche, Frites — Sur Charbon", p: 79 },
  { cat: "shawarmas", n: "Shawarma Jumbo 2", d: "Shawarma Poulet, Tomate, Carotte, Œuf, Haricots, Pomme de Terre, Oignon, Sauce Blanche, Frites", p: 79 },
  // Plats
  { cat: "plats", n: "Smock Chicken", d: "Poulet Frit, Riz Basmati, Amande, Raisin, Salade Arabe, Dinde Fumée, Fromage Cheddar, Sauce Barbecue, Frites", p: 89 },
  { cat: "plats", n: "Chicken Thunder", d: "Chicken Thunder Frit, Honey Mustard Sauce, Frites", p: 65 },
  { cat: "plats", n: "Grill Chicken", d: "Blanc de Poulet Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites", p: 79 },
  { cat: "plats", n: "Shish Tawook Chicken", d: "Shish Tawook Chicken Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Frites", p: 79 },
  { cat: "plats", n: "Kefta Grillée", d: "Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites", p: 89 },
  { cat: "plats", n: "Mix Grill", d: "Shish Tawook Chicken, Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites", p: 89 },
  { cat: "plats", n: "Côtelette", d: "Côtelette, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites", p: 120 },
  { cat: "plats", n: "Filet Viande", d: "Filet de Bœuf Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Sauce aux Choix, Frites", p: 120 },
  // Pizzas
  { cat: "pizzas", n: "Margarita", d: "Sauce Tomate, Olives et Mozzarella", p: 49 },
  { cat: "pizzas", n: "Poulet", d: "Poulet Chawarma, Sauce Tomate, Olives et Mozzarella", p: 59 },
  { cat: "pizzas", n: "Chicken Pop Corn", d: "Poulet Frit, Sauce Barbecue, Poivrons, Olives, Champignons et Mozzarella", p: 69 },
  { cat: "pizzas", n: "4 Fromages", d: "Quatre Fromages, Cheddar, Mozzarella, Roquefort et Parmesan, Olives", p: 59 },
  { cat: "pizzas", n: "Bolognaise", d: "Kefta Bolognaise, Poivrons, Olives et Mozzarella", p: 69 },
  { cat: "pizzas", n: "Pizza Végétarienne", d: "", p: 59 },
  { cat: "pizzas", n: "Pizza Pepperoni", d: "", p: 59 },
  { cat: "pizzas", n: "Thon", d: "Oignons, Poivrons, Olives, Champignons et Mozzarella", p: 59 },
  { cat: "pizzas", n: "Fruits de Mer", d: "Crevettes, Calamars, Surimi, Oignons, Poivrons, Olives, Champignons et Mozzarella", p: 69 },
  { cat: "pizzas", n: "Royale", d: "Poulet, Viande Hachée, Crevettes, Calamars, Oignons, Poivrons, Olives, Champignons et Mozzarella", p: 89 },
  // Tacos
  { cat: "tacos", n: "Poulet", d: "Blanc de Poulet, Sauce Fromage, Mozzarella, Frites", p: 49 },
  { cat: "tacos", n: "Viande Hachée", d: "Viande Hachée, Sauce Fromage, Mozzarella, Frites", p: 55 },
  { cat: "tacos", n: "Mahrousa", d: "Viande Hachée, Poulet Frit, Sauce Fromage, Dinde Fumée, Mozzarella, Frites", p: 59 },
  { cat: "tacos", n: "Nuggets", d: "Nuggets, Sauce Fromage, Mozzarella, Frites", p: 49 },
  { cat: "tacos", n: "Cordon Bleu", d: "Cordon Bleu, Sauce Fromage, Mozzarella, Frites", p: 55 },
  { cat: "tacos", n: "Pasticciò à la Bolognaise", d: "", p: 59 },
  { cat: "tacos", n: "Pasticciò au Poulet", d: "", p: 49 },
  { cat: "tacos", n: "Pasticciò au Dinde", d: "", p: 39 },
  // Salades
  { cat: "salades", n: "Salade Arabe", d: "", p: 25 },
  { cat: "salades", n: "Salade Niçoise", d: "", p: 39 },
  { cat: "salades", n: "Salade Maison", d: "", p: 39 },
  { cat: "salades", n: "Salade Mixte", d: "", p: 39 },
  // Extras
  { cat: "extras", n: "Frites", d: "", p: 12 },
  { cat: "extras", n: "Riz Basmati", d: "", p: 25 },
  { cat: "extras", n: "Poulet", d: "", p: 25 },
  { cat: "extras", n: "Fromage", d: "", p: 7 },
  // Boissons
  { cat: "boissons", n: "Boissons Gazeuses", d: "", p: 12 },
  { cat: "boissons", n: "Eau Minérale", d: "", p: 7 },
  { cat: "boissons", n: "Ouïmès", d: "", p: 12 },
  { cat: "boissons", n: "Thé ou Café", d: "", p: 15 },
  // Jus
  { cat: "jus", n: "Citron", d: "", p: 20 },
  { cat: "jus", n: "Orange", d: "", p: 25 },
  { cat: "jus", n: "Mangue", d: "", p: 30 },
  { cat: "jus", n: "Mangue, Petit Suisse et Dragon", d: "", p: 40 },
  { cat: "jus", n: "Mangue, Ananas et Poire", d: "", p: 35 },
  { cat: "jus", n: "Mangue + Petit Suisse", d: "", p: 35 },
  { cat: "jus", n: "Fraise", d: "", p: 30 },
  { cat: "jus", n: "Ananas", d: "", p: 30 },
  { cat: "jus", n: "Ananas, Kiwi et Citron", d: "", p: 35 },
  { cat: "jus", n: "Dragon", d: "", p: 35 },
  { cat: "jus", n: "Dragon et Petit Suisse", d: "", p: 30 },
  { cat: "jus", n: "Panaché", d: "", p: 30 },
  { cat: "jus", n: "Avocat", d: "", p: 30 },
  { cat: "jus", n: "Avocat Fruits Secs", d: "", p: 35 },
  { cat: "jus", n: "Avocat Dragon Fruits Secs", d: "", p: 40 },
  { cat: "jus", n: "Banane", d: "", p: 30 },
  { cat: "jus", n: "Pomme", d: "", p: 30 },
  { cat: "jus", n: "Karkade", d: "", p: 20 },
  { cat: "jus", n: "Mojito", d: "", p: 25 },
  // Jus Presse
  { cat: "jus_presse", n: "Ananas Carottes", d: "", p: 45 },
  { cat: "jus_presse", n: "Grenade", d: "", p: 30 },
  { cat: "jus_presse", n: "Pomme", d: "", p: 30 },
  // Jus Za3za3
  { cat: "jus_za3za3", n: "Za3za3 Panaché", d: "", p: 35 },
  { cat: "jus_za3za3", n: "Za3za3 Avocat", d: "", p: 35 },
  { cat: "jus_za3za3", n: "Za3za3 Spécial", d: "", p: 50 },
  { cat: "jus_za3za3", n: "Salade de Fruits", d: "", p: 59 }
];

const categoryImages = {
  featured: "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80",
  burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  sandwichs: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  shawarmas: "https://images.unsplash.com/photo-1648827453303-317bd1270b22?w=800&q=80",
  plats: "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80",
  pizzas: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
  tacos: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80",
  salades: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  extras: "https://images.unsplash.com/photo-1573016608964-f4b0af1df535?w=800&q=80",
  boissons: "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=80",
  jus: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80",
  jus_presse: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80",
  jus_za3za3: "https://images.unsplash.com/photo-1553530666-ba11a7ddbb86?w=800&q=80",
};

const itemsWithId = menuData.map((item, idx) => ({
  id: idx + 1,
  categoryId: item.cat,
  featured: idx % 10 === 0,
  names: { en: item.n, fr: item.n, ar: item.n },
  price: item.p,
  descriptions: { en: item.d, fr: item.d, ar: item.d },
  image: categoryImages[item.cat] || categoryImages.featured
}));

const fileContent = `export const branches = [
  {
    id: "beni-makada",
    names: { en: "Souk Mghazine", fr: "Souk Mghazine", ar: "صور معكازين" },
    phone: "+212706849081",
    hours: { en: "11:00 AM - 12:00 AM", fr: "11:00 - 00:00", ar: "11:00 ص - 12:00 م" },
    locations: { en: "Souk Mghazine, Tangier", fr: "Souk Mghazine, Tanger", ar: "بني مكادة، طنجة" },
    lat: 35.7594,
    lng: -5.8000
  },
  {
    id: "mesnana",
    names: { en: "Renault High School", fr: "Lycée Renault", ar: "ثانوية رينول" },
    phone: "+212706849081",
    hours: { en: "11:00 AM - 11:30 PM", fr: "11:00 - 23:30", ar: "11:00 ص - 11:30 م" },
    locations: { en: "Renault High School, Tangier", fr: "Lycée Renault, Tanger", ar: "ثانوية رينول, طنجة" },
    lat: 35.7500,
    lng: -5.8500
  },
  {
    id: "aaouama",
    names: { en: "Mauritania Cinema", fr: "Cinéma Mauritanie", ar: "سينما موريتانيا" },
    phone: "+212706849081",
    hours: { en: "11:00 AM - 10:00 PM", fr: "11:00 - 22:00", ar: "11:00 ص - 10:00 م" },
    locations: { en: "Mauritania Cinema, Tangier", fr: "Cinéma Mauritanie, Tanger", ar: "سينما موريتانيا , طنجة" },
    lat: 35.7400,
    lng: -5.8200
  },
  {
    id: "drissia",
    names: { en: "Drissia", fr: "Drissia", ar: "إدريسية" },
    phone: "+212706849081",
    hours: { en: "11:00 AM - 12:00 AM", fr: "11:00 - 00:00", ar: "11:00 ص - 12:00 م" },
    locations: { en: "Drissia, Tangier", fr: "Drissia, Tanger", ar: "إدريسية، طنجة" },
    lat: 35.7600,
    lng: -5.8100
  }
];

export const menuCategories = ${JSON.stringify(categories, null, 2)};

export const menuItems = ${JSON.stringify(itemsWithId, null, 2)};
`;

fs.writeFileSync('app/lib/branch-data.ts', fileContent);
