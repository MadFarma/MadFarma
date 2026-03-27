export const categories = [
  {
    id: 'bebe-mama',
    name: 'Bebé y Mama',
    icon: '👶',
    subcategories: [
      { id: 'alimentacion', name: 'Alimentación del Bebé' },
      { id: 'cuidado-bebe', name: 'Cuidado del Bebé' },
      { id: 'higiene-bebe', name: 'Higiene Bebé' },
      { id: 'juguetes', name: 'Juguetes' },
      { id: 'lactancia', name: 'Lactancia' }
    ]
  },
  {
    id: 'cosmetica-belleza',
    name: 'Cosmética y Belleza',
    icon: '💄',
    subcategories: [
      { id: 'facial', name: 'Cuidado Facial' },
      { id: 'corporal', name: 'Cuidado Corporal' },
      { id: 'cabello', name: 'Cabello' },
      { id: 'manos-unas', name: 'Manos y Uñas' },
      { id: 'perfumes', name: 'Perfumes' }
    ]
  },
  {
    id: 'higiene',
    name: 'Higiene',
    icon: '🧴',
    subcategories: [
      { id: 'bucal', name: 'Higiene Bucal' },
      { id: 'corporal', name: 'Higiene Corporal' },
      { id: 'intima', name: 'Higiene Íntima' }
    ]
  },
  {
    id: 'dietetica-nutricion',
    name: 'Dietética y Nutrición',
    icon: '💊',
    subcategories: [
      { id: 'vitaminas', name: 'Vitaminas' },
      { id: 'suplementos', name: 'Suplementos' },
      { id: 'adelgazar', name: 'Adelgazar' },
      { id: 'deportistas', name: 'Deportistas' }
    ]
  },
  {
    id: 'salud-sexual',
    name: 'Salud Sexual',
    icon: '💑',
    subcategories: [
      { id: 'anticonceptivos', name: 'Anticonceptivos' },
      { id: 'lubricantes', name: 'Lubricantes' },
      { id: 'test-embarazo', name: 'Test de Embarazo' }
    ]
  }
];

export const brands = [
  { id: '1', name: 'La Roche-Posay' },
  { id: '2', name: 'Vichy' },
  { id: '3', name: 'CeraVe' },
  { id: '4', name: 'Bioderma' },
  { id: '5', name: 'Neutrogena' },
  { id: '6', name: 'Nivea' },
  { id: '7', name: 'Listerine' },
  { id: '8', name: 'Colgate' },
  { id: '9', name: 'Aquilea' },
  { id: '10', name: 'Arkopharma' }
];

export const products = [
  {
    id: '1',
    name: 'La Roche-Posay Anthelios SPF50+',
    description: 'Protector solar facial de alta protección FPS 50+ para piel sensible. Resistente al agua y sin perfume.',
    price: 24.90,
    originalPrice: 29.90,
    image: 'https://images.dosfarma.com/products/la-roche-posay-anthelios-fluid.jpg',
    category: 'cosmetica-belleza',
    subcategory: 'facial',
    brand: 'La Roche-Posay',
    rating: 4.8,
    reviews: 2456,
    stock: 50,
    badge: 'offer',
    featured: true
  },
  {
    id: '2',
    name: 'Vichy Mineral 89',
    description: 'Sérum hidratante con agua termal de Vichy y ácido hialurónico. Para rostro, cuello y contorno de ojos.',
    price: 19.50,
    originalPrice: null,
    image: 'https://images.dosfarma.com/products/vichy-mineral-89.jpg',
    category: 'cosmetica-belleza',
    subcategory: 'facial',
    brand: 'Vichy',
    rating: 4.7,
    reviews: 1823,
    stock: 35,
    badge: null,
    featured: true
  },
  {
    id: '3',
    name: 'CeraVe Limpiadora Hidratante',
    description: 'Limpiadora facial sin espuma con ceramidas y ácido hialurónico. Apta para piel sensible.',
    price: 12.95,
    originalPrice: 15.95,
    image: 'https://images.dosfarma.com/products/cerave-hydrating-cleanser.jpg',
    category: 'cosmetica-belleza',
    subcategory: 'facial',
    brand: 'CeraVe',
    rating: 4.9,
    reviews: 3421,
    stock: 80,
    badge: 'offer',
    featured: true
  },
  {
    id: '4',
    name: 'Bioderma Atoderm Intensive',
    description: 'Bálsamo emoliente para piel atópica. Nutre y repara la barrera cutánea.',
    price: 16.90,
    originalPrice: null,
    image: 'https://images.dosfarma.com/products/bioderma-atoderm.jpg',
    category: 'cosmetica-belleza',
    subcategory: 'corporal',
    brand: 'Bioderma',
    rating: 4.6,
    reviews: 987,
    stock: 45,
    badge: null,
    featured: false
  },
  {
    id: '5',
    name: 'Listerine Colgate Total',
    description: 'Colutorio dental con flúor para protección completa. Anticaries y antibacteriano.',
    price: 6.95,
    originalPrice: 8.50,
    image: 'https://images.dosfarma.com/products/listerine-total.jpg',
    category: 'higiene',
    subcategory: 'bucal',
    brand: 'Listerine',
    rating: 4.5,
    reviews: 2156,
    stock: 120,
    badge: 'offer',
    featured: true
  },
  {
    id: '6',
    name: 'Colgate Sensitive Plus',
    description: 'Pasta dental para dientes sensibles con tecnología Pro-Argin.',
    price: 4.50,
    originalPrice: null,
    image: 'https://images.dosfarma.com/products/colgate-sensitive.jpg',
    category: 'higiene',
    subcategory: 'bucal',
    brand: 'Colgate',
    rating: 4.4,
    reviews: 1876,
    stock: 200,
    badge: null,
    featured: false
  },
  {
    id: '7',
    name: 'Aquilea Sueño Gummies',
    description: 'Complemento alimenticio con melatonina y valeriana para conciliar el sueño.',
    price: 14.90,
    originalPrice: 17.90,
    image: 'https://images.dosfarma.com/products/aquilea-sueno.jpg',
    category: 'dietetica-nutricion',
    subcategory: 'vitaminas',
    brand: 'Aquilea',
    rating: 4.3,
    reviews: 543,
    stock: 60,
    badge: 'offer',
    featured: true
  },
  {
    id: '8',
    name: 'Arkopharma Arkocápsulas',
    description: 'Complemento alimenticio a base de plantas medicinales.',
    price: 11.50,
    originalPrice: null,
    image: 'https://images.dosfarma.com/products/arkopharma-arkocapsulas.jpg',
    category: 'dietetica-nutricion',
    subcategory: 'suplementos',
    brand: 'Arkopharma',
    rating: 4.2,
    reviews: 321,
    stock: 40,
    badge: null,
    featured: false
  },
  {
    id: '9',
    name: 'Nivea Body Lotion',
    description: 'Loción corporal hidratante con tecnología de cuidado de la piel.',
    price: 8.90,
    originalPrice: null,
    image: 'https://images.dosfarma.com/products/nivea-body-lotion.jpg',
    category: 'cosmetica-belleza',
    subcategory: 'corporal',
    brand: 'Nivea',
    rating: 4.5,
    reviews: 2341,
    stock: 90,
    badge: null,
    featured: false
  },
  {
    id: '10',
    name: 'La Roche-Posay Cicaplast',
    description: 'Bálsamo reparador para irritaciones, rojeces y pequeñas heridas.',
    price: 9.90,
    originalPrice: 12.50,
    image: 'https://images.dosfarma.com/products/cicaplast.jpg',
    category: 'cosmetica-belleza',
    subcategory: 'facial',
    brand: 'La Roche-Posay',
    rating: 4.7,
    reviews: 1567,
    stock: 55,
    badge: 'offer',
    featured: true
  },
  {
    id: '11',
    name: 'Leche Infantil奶粉',
    description: 'Leche de continuación para bebés de 6-12 meses.',
    price: 18.90,
    originalPrice: null,
    image: 'https://images.dosfarma.com/products/leche-infantil.jpg',
    category: 'bebe-mama',
    subcategory: 'alimentacion',
    brand: 'Nutribén',
    rating: 4.6,
    reviews: 234,
    stock: 30,
    badge: null,
    featured: false
  },
  {
    id: '12',
    name: 'Chupete Ortodontico',
    description: 'Chupete ortodóncico de silicona para bebés recién nacidos.',
    price: 5.90,
    originalPrice: 7.90,
    image: 'https://images.dosfarma.com/products/chupete.jpg',
    category: 'bebe-mama',
    subcategory: 'higiene-bebe',
    brand: 'Suavinex',
    rating: 4.4,
    reviews: 567,
    stock: 75,
    badge: 'offer',
    featured: false
  },
  {
    id: '13',
    name: 'Preservativos Durex',
    description: 'Caja de 12 preservativos lubricados con aroma.',
    price: 9.50,
    originalPrice: 12.90,
    image: 'https://images.dosfarma.com/products/durex.jpg',
    category: 'salud-sexual',
    subcategory: 'anticonceptivos',
    brand: 'Durex',
    rating: 4.5,
    reviews: 3456,
    stock: 150,
    badge: 'offer',
    featured: true
  },
  {
    id: '14',
    name: 'Test de Embarazo Clearblue',
    description: 'Test de embarazo digital con indicador de semanas.',
    price: 14.90,
    originalPrice: null,
    image: 'https://images.dosfarma.com/products/clearblue.jpg',
    category: 'salud-sexual',
    subcategory: 'test-embarazo',
    brand: 'Clearblue',
    rating: 4.7,
    reviews: 2134,
    stock: 40,
    badge: null,
    featured: true
  },
  {
    id: '15',
    name: 'Gel Íntimo Isdin',
    description: 'Gel de higiene íntima con pH neutro y activos hidratantes.',
    price: 8.90,
    originalPrice: null,
    image: 'https://images.dosfarma.com/products/isdin-gel-intimo.jpg',
    category: 'higiene',
    subcategory: 'intima',
    brand: 'Isdin',
    rating: 4.6,
    reviews: 876,
    stock: 65,
    badge: null,
    featured: false
  }
];

export const promotions = [
  {
    id: '1',
    title: '-15% EXTRA en pedidos +50€',
    code: 'BIENVENIDO15',
    description: 'Cupón de bienvenida',
    discount: 15,
    minPurchase: 50,
    active: true
  },
  {
    id: '2',
    title: '2ª unidad -30%',
    code: null,
    description: 'En productos seleccionados',
    discount: 30,
    minPurchase: 0,
    active: true
  },
  {
    id: '3',
    title: 'Envío gratis',
    code: 'ENVIOFREE',
    description: 'En pedidos +35€',
    discount: 0,
    minPurchase: 35,
    active: true
  }
];

export const users = [
  {
    id: '1',
    email: 'demo@botica.com',
    password: 'demo123',
    name: 'Usuario Demo',
    phone: '612345678',
    address: {
      street: 'Calle Principal 123',
      city: 'Madrid',
      postalCode: '28001'
    }
  }
];

export const orders = [];
