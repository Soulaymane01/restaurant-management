export const branches = [
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

export const menuCategories = [
  {
    "id": "featured",
    "name": "Trending",
    "icon": "🔥"
  },
  {
    "id": "burgers",
    "name": "Burgers",
    "icon": "🍔"
  },
  {
    "id": "sandwichs",
    "name": "Sandwichs",
    "icon": "🥪"
  },
  {
    "id": "shawarmas",
    "name": "Shawarmas",
    "icon": "🌯"
  },
  {
    "id": "plats",
    "name": "Plats",
    "icon": "🍛"
  },
  {
    "id": "pizzas",
    "name": "Pizzas",
    "icon": "🍕"
  },
  {
    "id": "tacos",
    "name": "Tacos",
    "icon": "🌮"
  },
  {
    "id": "salades",
    "name": "Salades",
    "icon": "🥗"
  },
  {
    "id": "extras",
    "name": "Extras",
    "icon": "🍟"
  },
  {
    "id": "boissons",
    "name": "Boissons",
    "icon": "🥤"
  },
  {
    "id": "jus",
    "name": "Jus",
    "icon": "🧃"
  },
  {
    "id": "jus_presse",
    "name": "Jus Pressé",
    "icon": "🍹"
  },
  {
    "id": "jus_za3za3",
    "name": "Jus Za3za3",
    "icon": "🥤"
  }
];

export const menuItems = [
  {
    "id": 1,
    "categoryId": "burgers",
    "featured": true,
    "names": {
      "en": "Classic Burger",
      "fr": "Classic Burger",
      "ar": "Classic Burger"
    },
    "price": 45,
    "descriptions": {
      "en": "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon",
      "fr": "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon",
      "ar": "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon"
    },
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
  },
  {
    "id": 2,
    "categoryId": "burgers",
    "featured": false,
    "names": {
      "en": "Mushroom Burger",
      "fr": "Mushroom Burger",
      "ar": "Mushroom Burger"
    },
    "price": 49,
    "descriptions": {
      "en": "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Cheddar, Champignon",
      "fr": "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Cheddar, Champignon",
      "ar": "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Cheddar, Champignon"
    },
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
  },
  {
    "id": 3,
    "categoryId": "burgers",
    "featured": false,
    "names": {
      "en": "Cheese Burger",
      "fr": "Cheese Burger",
      "ar": "Cheese Burger"
    },
    "price": 49,
    "descriptions": {
      "en": "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Fromage Cheddar",
      "fr": "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Fromage Cheddar",
      "ar": "Steak Haché Grillé, Salade, Tomates, Sauce Mayonnaise, Cornichon, Fromage Cheddar"
    },
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
  },
  {
    "id": 4,
    "categoryId": "burgers",
    "featured": false,
    "names": {
      "en": "Smoke Burger",
      "fr": "Smoke Burger",
      "ar": "Smoke Burger"
    },
    "price": 49,
    "descriptions": {
      "en": "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar, Champignon, Sauce Barbecue, Oignon",
      "fr": "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar, Champignon, Sauce Barbecue, Oignon",
      "ar": "Steak Haché Grillé, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar, Champignon, Sauce Barbecue, Oignon"
    },
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
  },
  {
    "id": 5,
    "categoryId": "burgers",
    "featured": false,
    "names": {
      "en": "Buffalo Chicken",
      "fr": "Buffalo Chicken",
      "ar": "Buffalo Chicken"
    },
    "price": 49,
    "descriptions": {
      "en": "Blanc de Poulet Frit, Sauce Buffalo, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar",
      "fr": "Blanc de Poulet Frit, Sauce Buffalo, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar",
      "ar": "Blanc de Poulet Frit, Sauce Buffalo, Salade, Tomate, Sauce Mayonnaise, Cornichon, Fromage Cheddar"
    },
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
  },
  {
    "id": 6,
    "categoryId": "burgers",
    "featured": false,
    "names": {
      "en": "Zinger Burger",
      "fr": "Zinger Burger",
      "ar": "Zinger Burger"
    },
    "price": 49,
    "descriptions": {
      "en": "Steak Haché Grillé, Salade, Tomate, Sauce Jalapeño, Cornichon, Sauce Mayonnaise, Fromage Cheddar",
      "fr": "Steak Haché Grillé, Salade, Tomate, Sauce Jalapeño, Cornichon, Sauce Mayonnaise, Fromage Cheddar",
      "ar": "Steak Haché Grillé, Salade, Tomate, Sauce Jalapeño, Cornichon, Sauce Mayonnaise, Fromage Cheddar"
    },
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
  },
  {
    "id": 7,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Super Crunchy",
      "fr": "Super Crunchy",
      "ar": "Super Crunchy"
    },
    "price": 49,
    "descriptions": {
      "en": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Mozzarella, Mayonnaise, Frites",
      "fr": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Mozzarella, Mayonnaise, Frites",
      "ar": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Mozzarella, Mayonnaise, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 8,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "S. Crunchy Spicy",
      "fr": "S. Crunchy Spicy",
      "ar": "S. Crunchy Spicy"
    },
    "price": 49,
    "descriptions": {
      "en": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites",
      "fr": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites",
      "ar": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 9,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Filet Mushroom",
      "fr": "Filet Mushroom",
      "ar": "Filet Mushroom"
    },
    "price": 59,
    "descriptions": {
      "en": "Viande de Bœuf Grillée, Mushrooms Sauce, Frites",
      "fr": "Viande de Bœuf Grillée, Mushrooms Sauce, Frites",
      "ar": "Viande de Bœuf Grillée, Mushrooms Sauce, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 10,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Shish Tawook",
      "fr": "Shish Tawook",
      "ar": "Shish Tawook"
    },
    "price": 49,
    "descriptions": {
      "en": "Cuisses de Poulet Grillées, Oignon, Poivron, Sauce Cocktail, Frites",
      "fr": "Cuisses de Poulet Grillées, Oignon, Poivron, Sauce Cocktail, Frites",
      "ar": "Cuisses de Poulet Grillées, Oignon, Poivron, Sauce Cocktail, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 11,
    "categoryId": "sandwichs",
    "featured": true,
    "names": {
      "en": "Chicken Alfredo",
      "fr": "Chicken Alfredo",
      "ar": "Chicken Alfredo"
    },
    "price": 49,
    "descriptions": {
      "en": "Blanc de Poulet Grillé, Sauce Alfredo, Frites",
      "fr": "Blanc de Poulet Grillé, Sauce Alfredo, Frites",
      "ar": "Blanc de Poulet Grillé, Sauce Alfredo, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 12,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Grilled Chicken",
      "fr": "Grilled Chicken",
      "ar": "Grilled Chicken"
    },
    "price": 49,
    "descriptions": {
      "en": "Blanc de Poulet Grillé, Tomate, Laitue, Cornichons, Fromage Cheddar, Mayonnaise, Frites",
      "fr": "Blanc de Poulet Grillé, Tomate, Laitue, Cornichons, Fromage Cheddar, Mayonnaise, Frites",
      "ar": "Blanc de Poulet Grillé, Tomate, Laitue, Cornichons, Fromage Cheddar, Mayonnaise, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 13,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Chicken Beignet",
      "fr": "Chicken Beignet",
      "ar": "Chicken Beignet"
    },
    "price": 49,
    "descriptions": {
      "en": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites",
      "fr": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites",
      "ar": "Blanc de Poulet Frit, Tomate, Cornichons, Laitue, Fromage Cheddar, Sauce Mayonnaise, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 14,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Double Cross",
      "fr": "Double Cross",
      "ar": "Double Cross"
    },
    "price": 49,
    "descriptions": {
      "en": "Poulet Grillé, Oignon, Poivron, Champignons, Fromage Mozzarella, Frites",
      "fr": "Poulet Grillé, Oignon, Poivron, Champignons, Fromage Mozzarella, Frites",
      "ar": "Poulet Grillé, Oignon, Poivron, Champignons, Fromage Mozzarella, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 15,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Chicken Fajitas",
      "fr": "Chicken Fajitas",
      "ar": "Chicken Fajitas"
    },
    "price": 49,
    "descriptions": {
      "en": "Blanc de Poulet Grillé, Oignon, Poivron, Olive Noire, Frites",
      "fr": "Blanc de Poulet Grillé, Oignon, Poivron, Olive Noire, Frites",
      "ar": "Blanc de Poulet Grillé, Oignon, Poivron, Olive Noire, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 16,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Beef Fajitas",
      "fr": "Beef Fajitas",
      "ar": "Beef Fajitas"
    },
    "price": 59,
    "descriptions": {
      "en": "Viande de Bœuf Grillée, Oignon, Poivron, Olive Noire, Frites",
      "fr": "Viande de Bœuf Grillée, Oignon, Poivron, Olive Noire, Frites",
      "ar": "Viande de Bœuf Grillée, Oignon, Poivron, Olive Noire, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 17,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Kefta Grillée",
      "fr": "Kefta Grillée",
      "ar": "Kefta Grillée"
    },
    "price": 59,
    "descriptions": {
      "en": "Viande Hachée Grillée, Sauce Blanche, Salade Arabe, Frites",
      "fr": "Viande Hachée Grillée, Sauce Blanche, Salade Arabe, Frites",
      "ar": "Viande Hachée Grillée, Sauce Blanche, Salade Arabe, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 18,
    "categoryId": "sandwichs",
    "featured": false,
    "names": {
      "en": "Filet Pepper",
      "fr": "Filet Pepper",
      "ar": "Filet Pepper"
    },
    "price": 59,
    "descriptions": {
      "en": "Viande de Bœuf Grillée, Pepper Sauce, Frites",
      "fr": "Viande de Bœuf Grillée, Pepper Sauce, Frites",
      "ar": "Viande de Bœuf Grillée, Pepper Sauce, Frites"
    },
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80"
  },
  {
    "id": 19,
    "categoryId": "shawarmas",
    "featured": false,
    "names": {
      "en": "Dürum Döner",
      "fr": "Dürum Döner",
      "ar": "Dürum Döner"
    },
    "price": 49,
    "descriptions": {
      "en": "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche",
      "fr": "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche",
      "ar": "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche"
    },
    "image": "https://images.unsplash.com/photo-1648827453303-317bd1270b22?w=800&q=80"
  },
  {
    "id": 20,
    "categoryId": "shawarmas",
    "featured": false,
    "names": {
      "en": "Shawarma 3ich",
      "fr": "Shawarma 3ich",
      "ar": "Shawarma 3ich"
    },
    "price": 35,
    "descriptions": {
      "en": "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche",
      "fr": "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche",
      "ar": "3ich, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche"
    },
    "image": "https://images.unsplash.com/photo-1648827453303-317bd1270b22?w=800&q=80"
  },
  {
    "id": 21,
    "categoryId": "shawarmas",
    "featured": true,
    "names": {
      "en": "Shawarma Baguette",
      "fr": "Shawarma Baguette",
      "ar": "Shawarma Baguette"
    },
    "price": 40,
    "descriptions": {
      "en": "Baguette, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche",
      "fr": "Baguette, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche",
      "ar": "Baguette, Shawarma Poulet, Oignon, Tomate, Laitue, Cornichon, Sauce Blanche"
    },
    "image": "https://images.unsplash.com/photo-1648827453303-317bd1270b22?w=800&q=80"
  },
  {
    "id": 22,
    "categoryId": "shawarmas",
    "featured": false,
    "names": {
      "en": "Shawarma Jumbo 1",
      "fr": "Shawarma Jumbo 1",
      "ar": "Shawarma Jumbo 1"
    },
    "price": 79,
    "descriptions": {
      "en": "Shawarma Poulet, Riz, Tomate, Maïs, Fromage Rouge ou Sauce Blanche, Frites — Sur Charbon",
      "fr": "Shawarma Poulet, Riz, Tomate, Maïs, Fromage Rouge ou Sauce Blanche, Frites — Sur Charbon",
      "ar": "Shawarma Poulet, Riz, Tomate, Maïs, Fromage Rouge ou Sauce Blanche, Frites — Sur Charbon"
    },
    "image": "https://images.unsplash.com/photo-1648827453303-317bd1270b22?w=800&q=80"
  },
  {
    "id": 23,
    "categoryId": "shawarmas",
    "featured": false,
    "names": {
      "en": "Shawarma Jumbo 2",
      "fr": "Shawarma Jumbo 2",
      "ar": "Shawarma Jumbo 2"
    },
    "price": 79,
    "descriptions": {
      "en": "Shawarma Poulet, Tomate, Carotte, Œuf, Haricots, Pomme de Terre, Oignon, Sauce Blanche, Frites",
      "fr": "Shawarma Poulet, Tomate, Carotte, Œuf, Haricots, Pomme de Terre, Oignon, Sauce Blanche, Frites",
      "ar": "Shawarma Poulet, Tomate, Carotte, Œuf, Haricots, Pomme de Terre, Oignon, Sauce Blanche, Frites"
    },
    "image": "https://images.unsplash.com/photo-1648827453303-317bd1270b22?w=800&q=80"
  },
  {
    "id": 24,
    "categoryId": "plats",
    "featured": false,
    "names": {
      "en": "Smock Chicken",
      "fr": "Smock Chicken",
      "ar": "Smock Chicken"
    },
    "price": 89,
    "descriptions": {
      "en": "Poulet Frit, Riz Basmati, Amande, Raisin, Salade Arabe, Dinde Fumée, Fromage Cheddar, Sauce Barbecue, Frites",
      "fr": "Poulet Frit, Riz Basmati, Amande, Raisin, Salade Arabe, Dinde Fumée, Fromage Cheddar, Sauce Barbecue, Frites",
      "ar": "Poulet Frit, Riz Basmati, Amande, Raisin, Salade Arabe, Dinde Fumée, Fromage Cheddar, Sauce Barbecue, Frites"
    },
    "image": "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80"
  },
  {
    "id": 25,
    "categoryId": "plats",
    "featured": false,
    "names": {
      "en": "Chicken Thunder",
      "fr": "Chicken Thunder",
      "ar": "Chicken Thunder"
    },
    "price": 65,
    "descriptions": {
      "en": "Chicken Thunder Frit, Honey Mustard Sauce, Frites",
      "fr": "Chicken Thunder Frit, Honey Mustard Sauce, Frites",
      "ar": "Chicken Thunder Frit, Honey Mustard Sauce, Frites"
    },
    "image": "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80"
  },
  {
    "id": 26,
    "categoryId": "plats",
    "featured": false,
    "names": {
      "en": "Grill Chicken",
      "fr": "Grill Chicken",
      "ar": "Grill Chicken"
    },
    "price": 79,
    "descriptions": {
      "en": "Blanc de Poulet Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites",
      "fr": "Blanc de Poulet Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites",
      "ar": "Blanc de Poulet Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites"
    },
    "image": "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80"
  },
  {
    "id": 27,
    "categoryId": "plats",
    "featured": false,
    "names": {
      "en": "Shish Tawook Chicken",
      "fr": "Shish Tawook Chicken",
      "ar": "Shish Tawook Chicken"
    },
    "price": 79,
    "descriptions": {
      "en": "Shish Tawook Chicken Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Frites",
      "fr": "Shish Tawook Chicken Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Frites",
      "ar": "Shish Tawook Chicken Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Frites"
    },
    "image": "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80"
  },
  {
    "id": 28,
    "categoryId": "plats",
    "featured": false,
    "names": {
      "en": "Kefta Grillée",
      "fr": "Kefta Grillée",
      "ar": "Kefta Grillée"
    },
    "price": 89,
    "descriptions": {
      "en": "Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites",
      "fr": "Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites",
      "ar": "Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites"
    },
    "image": "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80"
  },
  {
    "id": 29,
    "categoryId": "plats",
    "featured": false,
    "names": {
      "en": "Mix Grill",
      "fr": "Mix Grill",
      "ar": "Mix Grill"
    },
    "price": 89,
    "descriptions": {
      "en": "Shish Tawook Chicken, Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites",
      "fr": "Shish Tawook Chicken, Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites",
      "ar": "Shish Tawook Chicken, Kefta Grillée, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites"
    },
    "image": "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80"
  },
  {
    "id": 30,
    "categoryId": "plats",
    "featured": false,
    "names": {
      "en": "Côtelette",
      "fr": "Côtelette",
      "ar": "Côtelette"
    },
    "price": 120,
    "descriptions": {
      "en": "Côtelette, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites",
      "fr": "Côtelette, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites",
      "ar": "Côtelette, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Frites"
    },
    "image": "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80"
  },
  {
    "id": 31,
    "categoryId": "plats",
    "featured": true,
    "names": {
      "en": "Filet Viande",
      "fr": "Filet Viande",
      "ar": "Filet Viande"
    },
    "price": 120,
    "descriptions": {
      "en": "Filet de Bœuf Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Sauce aux Choix, Frites",
      "fr": "Filet de Bœuf Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Sauce aux Choix, Frites",
      "ar": "Filet de Bœuf Grillé, Riz Basmati, Amande, Raisin, Salade Arabe, Oignon, Poivron, Sauce aux Choix, Frites"
    },
    "image": "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80"
  },
  {
    "id": 32,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "Margarita",
      "fr": "Margarita",
      "ar": "Margarita"
    },
    "price": 49,
    "descriptions": {
      "en": "Sauce Tomate, Olives et Mozzarella",
      "fr": "Sauce Tomate, Olives et Mozzarella",
      "ar": "Sauce Tomate, Olives et Mozzarella"
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 33,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "Poulet",
      "fr": "Poulet",
      "ar": "Poulet"
    },
    "price": 59,
    "descriptions": {
      "en": "Poulet Chawarma, Sauce Tomate, Olives et Mozzarella",
      "fr": "Poulet Chawarma, Sauce Tomate, Olives et Mozzarella",
      "ar": "Poulet Chawarma, Sauce Tomate, Olives et Mozzarella"
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 34,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "Chicken Pop Corn",
      "fr": "Chicken Pop Corn",
      "ar": "Chicken Pop Corn"
    },
    "price": 69,
    "descriptions": {
      "en": "Poulet Frit, Sauce Barbecue, Poivrons, Olives, Champignons et Mozzarella",
      "fr": "Poulet Frit, Sauce Barbecue, Poivrons, Olives, Champignons et Mozzarella",
      "ar": "Poulet Frit, Sauce Barbecue, Poivrons, Olives, Champignons et Mozzarella"
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 35,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "4 Fromages",
      "fr": "4 Fromages",
      "ar": "4 Fromages"
    },
    "price": 59,
    "descriptions": {
      "en": "Quatre Fromages, Cheddar, Mozzarella, Roquefort et Parmesan, Olives",
      "fr": "Quatre Fromages, Cheddar, Mozzarella, Roquefort et Parmesan, Olives",
      "ar": "Quatre Fromages, Cheddar, Mozzarella, Roquefort et Parmesan, Olives"
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 36,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "Bolognaise",
      "fr": "Bolognaise",
      "ar": "Bolognaise"
    },
    "price": 69,
    "descriptions": {
      "en": "Kefta Bolognaise, Poivrons, Olives et Mozzarella",
      "fr": "Kefta Bolognaise, Poivrons, Olives et Mozzarella",
      "ar": "Kefta Bolognaise, Poivrons, Olives et Mozzarella"
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 37,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "Pizza Végétarienne",
      "fr": "Pizza Végétarienne",
      "ar": "Pizza Végétarienne"
    },
    "price": 59,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 38,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "Pizza Pepperoni",
      "fr": "Pizza Pepperoni",
      "ar": "Pizza Pepperoni"
    },
    "price": 59,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 39,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "Thon",
      "fr": "Thon",
      "ar": "Thon"
    },
    "price": 59,
    "descriptions": {
      "en": "Oignons, Poivrons, Olives, Champignons et Mozzarella",
      "fr": "Oignons, Poivrons, Olives, Champignons et Mozzarella",
      "ar": "Oignons, Poivrons, Olives, Champignons et Mozzarella"
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 40,
    "categoryId": "pizzas",
    "featured": false,
    "names": {
      "en": "Fruits de Mer",
      "fr": "Fruits de Mer",
      "ar": "Fruits de Mer"
    },
    "price": 69,
    "descriptions": {
      "en": "Crevettes, Calamars, Surimi, Oignons, Poivrons, Olives, Champignons et Mozzarella",
      "fr": "Crevettes, Calamars, Surimi, Oignons, Poivrons, Olives, Champignons et Mozzarella",
      "ar": "Crevettes, Calamars, Surimi, Oignons, Poivrons, Olives, Champignons et Mozzarella"
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 41,
    "categoryId": "pizzas",
    "featured": true,
    "names": {
      "en": "Royale",
      "fr": "Royale",
      "ar": "Royale"
    },
    "price": 89,
    "descriptions": {
      "en": "Poulet, Viande Hachée, Crevettes, Calamars, Oignons, Poivrons, Olives, Champignons et Mozzarella",
      "fr": "Poulet, Viande Hachée, Crevettes, Calamars, Oignons, Poivrons, Olives, Champignons et Mozzarella",
      "ar": "Poulet, Viande Hachée, Crevettes, Calamars, Oignons, Poivrons, Olives, Champignons et Mozzarella"
    },
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
  },
  {
    "id": 42,
    "categoryId": "tacos",
    "featured": false,
    "names": {
      "en": "Poulet",
      "fr": "Poulet",
      "ar": "Poulet"
    },
    "price": 49,
    "descriptions": {
      "en": "Blanc de Poulet, Sauce Fromage, Mozzarella, Frites",
      "fr": "Blanc de Poulet, Sauce Fromage, Mozzarella, Frites",
      "ar": "Blanc de Poulet, Sauce Fromage, Mozzarella, Frites"
    },
    "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80"
  },
  {
    "id": 43,
    "categoryId": "tacos",
    "featured": false,
    "names": {
      "en": "Viande Hachée",
      "fr": "Viande Hachée",
      "ar": "Viande Hachée"
    },
    "price": 55,
    "descriptions": {
      "en": "Viande Hachée, Sauce Fromage, Mozzarella, Frites",
      "fr": "Viande Hachée, Sauce Fromage, Mozzarella, Frites",
      "ar": "Viande Hachée, Sauce Fromage, Mozzarella, Frites"
    },
    "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80"
  },
  {
    "id": 44,
    "categoryId": "tacos",
    "featured": false,
    "names": {
      "en": "Mahrousa",
      "fr": "Mahrousa",
      "ar": "Mahrousa"
    },
    "price": 59,
    "descriptions": {
      "en": "Viande Hachée, Poulet Frit, Sauce Fromage, Dinde Fumée, Mozzarella, Frites",
      "fr": "Viande Hachée, Poulet Frit, Sauce Fromage, Dinde Fumée, Mozzarella, Frites",
      "ar": "Viande Hachée, Poulet Frit, Sauce Fromage, Dinde Fumée, Mozzarella, Frites"
    },
    "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80"
  },
  {
    "id": 45,
    "categoryId": "tacos",
    "featured": false,
    "names": {
      "en": "Nuggets",
      "fr": "Nuggets",
      "ar": "Nuggets"
    },
    "price": 49,
    "descriptions": {
      "en": "Nuggets, Sauce Fromage, Mozzarella, Frites",
      "fr": "Nuggets, Sauce Fromage, Mozzarella, Frites",
      "ar": "Nuggets, Sauce Fromage, Mozzarella, Frites"
    },
    "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80"
  },
  {
    "id": 46,
    "categoryId": "tacos",
    "featured": false,
    "names": {
      "en": "Cordon Bleu",
      "fr": "Cordon Bleu",
      "ar": "Cordon Bleu"
    },
    "price": 55,
    "descriptions": {
      "en": "Cordon Bleu, Sauce Fromage, Mozzarella, Frites",
      "fr": "Cordon Bleu, Sauce Fromage, Mozzarella, Frites",
      "ar": "Cordon Bleu, Sauce Fromage, Mozzarella, Frites"
    },
    "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80"
  },
  {
    "id": 47,
    "categoryId": "tacos",
    "featured": false,
    "names": {
      "en": "Pasticciò à la Bolognaise",
      "fr": "Pasticciò à la Bolognaise",
      "ar": "Pasticciò à la Bolognaise"
    },
    "price": 59,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80"
  },
  {
    "id": 48,
    "categoryId": "tacos",
    "featured": false,
    "names": {
      "en": "Pasticciò au Poulet",
      "fr": "Pasticciò au Poulet",
      "ar": "Pasticciò au Poulet"
    },
    "price": 49,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80"
  },
  {
    "id": 49,
    "categoryId": "tacos",
    "featured": false,
    "names": {
      "en": "Pasticciò au Dinde",
      "fr": "Pasticciò au Dinde",
      "ar": "Pasticciò au Dinde"
    },
    "price": 39,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80"
  },
  {
    "id": 50,
    "categoryId": "salades",
    "featured": false,
    "names": {
      "en": "Salade Arabe",
      "fr": "Salade Arabe",
      "ar": "Salade Arabe"
    },
    "price": 25,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
  },
  {
    "id": 51,
    "categoryId": "salades",
    "featured": true,
    "names": {
      "en": "Salade Niçoise",
      "fr": "Salade Niçoise",
      "ar": "Salade Niçoise"
    },
    "price": 39,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
  },
  {
    "id": 52,
    "categoryId": "salades",
    "featured": false,
    "names": {
      "en": "Salade Maison",
      "fr": "Salade Maison",
      "ar": "Salade Maison"
    },
    "price": 39,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
  },
  {
    "id": 53,
    "categoryId": "salades",
    "featured": false,
    "names": {
      "en": "Salade Mixte",
      "fr": "Salade Mixte",
      "ar": "Salade Mixte"
    },
    "price": 39,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
  },
  {
    "id": 54,
    "categoryId": "extras",
    "featured": false,
    "names": {
      "en": "Frites",
      "fr": "Frites",
      "ar": "Frites"
    },
    "price": 12,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1573016608964-f4b0af1df535?w=800&q=80"
  },
  {
    "id": 55,
    "categoryId": "extras",
    "featured": false,
    "names": {
      "en": "Riz Basmati",
      "fr": "Riz Basmati",
      "ar": "Riz Basmati"
    },
    "price": 25,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1573016608964-f4b0af1df535?w=800&q=80"
  },
  {
    "id": 56,
    "categoryId": "extras",
    "featured": false,
    "names": {
      "en": "Poulet",
      "fr": "Poulet",
      "ar": "Poulet"
    },
    "price": 25,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1573016608964-f4b0af1df535?w=800&q=80"
  },
  {
    "id": 57,
    "categoryId": "extras",
    "featured": false,
    "names": {
      "en": "Fromage",
      "fr": "Fromage",
      "ar": "Fromage"
    },
    "price": 7,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1573016608964-f4b0af1df535?w=800&q=80"
  },
  {
    "id": 58,
    "categoryId": "boissons",
    "featured": false,
    "names": {
      "en": "Boissons Gazeuses",
      "fr": "Boissons Gazeuses",
      "ar": "Boissons Gazeuses"
    },
    "price": 12,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=80"
  },
  {
    "id": 59,
    "categoryId": "boissons",
    "featured": false,
    "names": {
      "en": "Eau Minérale",
      "fr": "Eau Minérale",
      "ar": "Eau Minérale"
    },
    "price": 7,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=80"
  },
  {
    "id": 60,
    "categoryId": "boissons",
    "featured": false,
    "names": {
      "en": "Ouïmès",
      "fr": "Ouïmès",
      "ar": "Ouïmès"
    },
    "price": 12,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=80"
  },
  {
    "id": 61,
    "categoryId": "boissons",
    "featured": true,
    "names": {
      "en": "Thé ou Café",
      "fr": "Thé ou Café",
      "ar": "Thé ou Café"
    },
    "price": 15,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=80"
  },
  {
    "id": 62,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Citron",
      "fr": "Citron",
      "ar": "Citron"
    },
    "price": 20,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 63,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Orange",
      "fr": "Orange",
      "ar": "Orange"
    },
    "price": 25,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 64,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Mangue",
      "fr": "Mangue",
      "ar": "Mangue"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 65,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Mangue, Petit Suisse et Dragon",
      "fr": "Mangue, Petit Suisse et Dragon",
      "ar": "Mangue, Petit Suisse et Dragon"
    },
    "price": 40,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 66,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Mangue, Ananas et Poire",
      "fr": "Mangue, Ananas et Poire",
      "ar": "Mangue, Ananas et Poire"
    },
    "price": 35,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 67,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Mangue + Petit Suisse",
      "fr": "Mangue + Petit Suisse",
      "ar": "Mangue + Petit Suisse"
    },
    "price": 35,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 68,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Fraise",
      "fr": "Fraise",
      "ar": "Fraise"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 69,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Ananas",
      "fr": "Ananas",
      "ar": "Ananas"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 70,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Ananas, Kiwi et Citron",
      "fr": "Ananas, Kiwi et Citron",
      "ar": "Ananas, Kiwi et Citron"
    },
    "price": 35,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 71,
    "categoryId": "jus",
    "featured": true,
    "names": {
      "en": "Dragon",
      "fr": "Dragon",
      "ar": "Dragon"
    },
    "price": 35,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 72,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Dragon et Petit Suisse",
      "fr": "Dragon et Petit Suisse",
      "ar": "Dragon et Petit Suisse"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 73,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Panaché",
      "fr": "Panaché",
      "ar": "Panaché"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 74,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Avocat",
      "fr": "Avocat",
      "ar": "Avocat"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 75,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Avocat Fruits Secs",
      "fr": "Avocat Fruits Secs",
      "ar": "Avocat Fruits Secs"
    },
    "price": 35,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 76,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Avocat Dragon Fruits Secs",
      "fr": "Avocat Dragon Fruits Secs",
      "ar": "Avocat Dragon Fruits Secs"
    },
    "price": 40,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 77,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Banane",
      "fr": "Banane",
      "ar": "Banane"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 78,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Pomme",
      "fr": "Pomme",
      "ar": "Pomme"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 79,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Karkade",
      "fr": "Karkade",
      "ar": "Karkade"
    },
    "price": 20,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 80,
    "categoryId": "jus",
    "featured": false,
    "names": {
      "en": "Mojito",
      "fr": "Mojito",
      "ar": "Mojito"
    },
    "price": 25,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80"
  },
  {
    "id": 81,
    "categoryId": "jus_presse",
    "featured": true,
    "names": {
      "en": "Ananas Carottes",
      "fr": "Ananas Carottes",
      "ar": "Ananas Carottes"
    },
    "price": 45,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80"
  },
  {
    "id": 82,
    "categoryId": "jus_presse",
    "featured": false,
    "names": {
      "en": "Grenade",
      "fr": "Grenade",
      "ar": "Grenade"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80"
  },
  {
    "id": 83,
    "categoryId": "jus_presse",
    "featured": false,
    "names": {
      "en": "Pomme",
      "fr": "Pomme",
      "ar": "Pomme"
    },
    "price": 30,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80"
  },
  {
    "id": 84,
    "categoryId": "jus_za3za3",
    "featured": false,
    "names": {
      "en": "Za3za3 Panaché",
      "fr": "Za3za3 Panaché",
      "ar": "Za3za3 Panaché"
    },
    "price": 35,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7ddbb86?w=800&q=80"
  },
  {
    "id": 85,
    "categoryId": "jus_za3za3",
    "featured": false,
    "names": {
      "en": "Za3za3 Avocat",
      "fr": "Za3za3 Avocat",
      "ar": "Za3za3 Avocat"
    },
    "price": 35,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7ddbb86?w=800&q=80"
  },
  {
    "id": 86,
    "categoryId": "jus_za3za3",
    "featured": false,
    "names": {
      "en": "Za3za3 Spécial",
      "fr": "Za3za3 Spécial",
      "ar": "Za3za3 Spécial"
    },
    "price": 50,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7ddbb86?w=800&q=80"
  },
  {
    "id": 87,
    "categoryId": "jus_za3za3",
    "featured": false,
    "names": {
      "en": "Salade de Fruits",
      "fr": "Salade de Fruits",
      "ar": "Salade de Fruits"
    },
    "price": 59,
    "descriptions": {
      "en": "",
      "fr": "",
      "ar": ""
    },
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7ddbb86?w=800&q=80"
  }
];
