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
  { id: "featured", name: "Trending", icon: "🔥" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "tacos", name: "Tacos", icon: "🌮" },
  { id: "sides", name: "Sides", icon: "🍟" },
  { id: "drinks", name: "Drinks", icon: "🥤" },
];

export const menuItems = [
  {
    id: 1,
    categoryId: "burgers",
    featured: true,
    names: { en: "Royal Cheese", fr: "Royal Cheese", ar: "رويال تشيز الفاخر" },
    price: 55,
    descriptions: {
      en: "Premium beef patty, double cheddar, caramelized onions, and truffle mayo.",
      fr: "Steak de bœuf d'exception, double cheddar fondu, oignons caramélisés et onctueuse mayonnaise à la truffe noire.",
      ar: "شريحة لحم بقري من الدرجة الممتازة، جبنة شيدر مضعفة، بصل مكرمل ببطء، ومايونيز الكمأة الفاخر."
    },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    options: [
      { en: "Extra Cheese (+5 DH)", fr: "Supplément Fromage (+5 DH)", ar: "جبنة إضافية (+5 درهم)" },
      { en: "Add Bacon (+10 DH)", fr: "Ajouter Bacon (+10 DH)", ar: "إضافة باكون (+10 درهم)" },
      { en: "No Onions", fr: "Sans Oignons", ar: "بدون بصل" }
    ]
  },
  {
    id: 2,
    categoryId: "burgers",
    featured: false,
    names: { en: "Crispy Dynamite", fr: "Poulet Dynamite Croustillant", ar: "دجاج ديناميت المقرمش" },
    price: 50,
    descriptions: {
      en: "Crispy chicken breast, spicy coleslaw, and dynamite sauce.",
      fr: "Poitrine de poulet croustillante, salade coleslaw épicée et notre fameuse sauce dynamite artisanale.",
      ar: "صدر دجاج مقرمش بعناية، سلطة كول سلو حارة، وصلصة الديناميت الخاصة بنا."
    },
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&q=80",
    options: [
      { en: "Extra Sauce", fr: "Supplément Sauce", ar: "صلصة إضافية" },
      { en: "Double Chicken (+15 DH)", fr: "Double Poulet (+15 DH)", ar: "دجاج مضعف (+15 درهم)" }
    ]
  },
  {
    id: 3,
    categoryId: "pizza",
    featured: true,
    names: { en: "Truffle Mushroom", fr: "Pizza Truffe & Champignons", ar: "بيتزا الفطر والكمأة" },
    price: 85,
    descriptions: {
      en: "White base, mozzarella, fresh mushrooms, and truffle oil drizzle.",
      fr: "Base crème onctueuse, mozzarella di bufala, champignons frais de saison et filet d'huile de truffe blanche.",
      ar: "قاعدة كريمة غنية، جبنة موتزاريللا، فطر طازج، ورذاذ زيت الكمأة البيضاء العطري."
    },
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    options: [
      { en: "Family Size (+30 DH)", fr: "Taille Familiale (+30 DH)", ar: "حجم عائلي (+30 درهم)" },
      { en: "Extra Truffle Oil (+10 DH)", fr: "Supplément Huile de Truffe (+10 DH)", ar: "زيت كمأة إضافي (+10 درهم)" }
    ]
  },
  {
    id: 4,
    categoryId: "pizza",
    featured: false,
    names: { en: "Oriental Meat", fr: "Pizza Orientale à la Viande", ar: "بيتزا اللحم الشرقية" },
    price: 75,
    descriptions: {
      en: "Tomato base, spiced minced meat, peppers, and onions.",
      fr: "Base tomate San Marzano, viande hachée épicée façon orientale, poivrons croquants et oignons rouges.",
      ar: "قاعدة طماطم إيطالية، لحم مفروم متبل بالأعشاب الشرقية، فلفل ألوان وبصل."
    },
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?w=500&q=80"
  },
  {
    id: 5,
    categoryId: "tacos",
    featured: true,
    names: { en: "Mix Grill Taco", fr: "Tacos Mixte Grill", ar: "تاكوس المشاوي المشكل" },
    price: 45,
    descriptions: {
      en: "Chicken, Beef, and Merguez with cheesy Algerienne sauce.",
      fr: "Trio de viandes séléctionnées : Poulet, Bœuf, et Merguez artisanale avec sauce Algérienne revisitée.",
      ar: "تشكيلة من اللحوم المشوية: دجاج، لحم بقري، ومرقاز أصيل مع صلصة جزائرية غنية بالجبن."
    },
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&q=80",
    options: [
      { en: "Extra Fries", fr: "Supplément Frites", ar: "بطاطس إضافية" },
      { en: "Gratiné (+5 DH)", fr: "Gratiné au Four (+5 DH)", ar: "غراتيني في الفرن (+5 درهم)" }
    ]
  },
  {
    id: 6,
    categoryId: "sides",
    featured: false,
    names: { en: "Cheesy Wedges", fr: "Wedges au Fromage", ar: "ودجز الجبن المقرمشة" },
    price: 30,
    descriptions: {
      en: "Crispy wedges smothered in melted cheddar and chives.",
      fr: "Quartiers de pommes de terre croustillants nappés de cheddar fondu et de ciboulette fraîche.",
      ar: "قطع بطاطس ودجز مقرمشة مغطاة بجبنة الشيدر الذائبة ورشة بقدونس."
    },
    image: "https://images.unsplash.com/photo-1573016608964-f4b0af1df535?w=500&q=80"
  },
  {
    id: 7,
    categoryId: "drinks",
    featured: false,
    names: { en: "Fresh Mojito", fr: "Mojito Frais Maison", ar: "موهيتو الانتعاش" },
    price: 25,
    descriptions: {
      en: "Lime, mint, and soda water. Refreshing and cool.",
      fr: "Citron vert pressé, menthe fraîche cueillie et eau pétillante. Un pur moment de fraîcheur.",
      ar: "ليمون حامض، نعناع طازج، ومياه فوارة. انتعاش مثالي في كل رشفة."
    },
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80",
    options: [
      { en: "Strawberry Flavor", fr: "Saveur Fraise", ar: "نكهة الفراولة" },
      { en: "Passion Fruit Flavor", fr: "Saveur Fruit de la Passion", ar: "نكهة فاكهة العاطفة" }
    ]
  }
];
