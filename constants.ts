import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Taladro Percutor 750W',
    description: 'Taladro de alta potencia para concreto y madera. Incluye maletín.',
    price: 85.99,
    category: Category.HERRAMIENTAS,
    image: 'https://picsum.photos/400/300?random=1',
    stock: 15
  },
  {
    id: '2',
    name: 'Set de Destornilladores Pro',
    description: 'Juego de 12 destornilladores con punta magnética y mango ergonómico.',
    price: 24.50,
    category: Category.HERRAMIENTAS,
    image: 'https://picsum.photos/400/300?random=2',
    stock: 40
  },
  {
    id: '3',
    name: 'Pintura Blanca Interior 20L',
    description: 'Pintura látex lavable de alto cubrimiento, acabado mate.',
    price: 65.00,
    category: Category.PINTURA,
    image: 'https://picsum.photos/400/300?random=3',
    stock: 10
  },
  {
    id: '4',
    name: 'Rodillo Antigota 22cm',
    description: 'Rodillo profesional para superficies lisas, evita salpicaduras.',
    price: 8.90,
    category: Category.PINTURA,
    image: 'https://picsum.photos/400/300?random=4',
    stock: 100
  },
  {
    id: '5',
    name: 'Cemento Portland 50kg',
    description: 'Cemento gris de uso general para construcción y reparaciones.',
    price: 12.50,
    category: Category.CONSTRUCCION,
    image: 'https://picsum.photos/400/300?random=5',
    stock: 50
  },
  {
    id: '6',
    name: 'Llave Inglesa Ajustable 10"',
    description: 'Acero al cromo vanadio, apertura máxima 30mm.',
    price: 15.75,
    category: Category.HERRAMIENTAS,
    image: 'https://picsum.photos/400/300?random=6',
    stock: 25
  },
  {
    id: '7',
    name: 'Tubo PVC 1/2" 3m',
    description: 'Tubería para agua fría, alta resistencia a la presión.',
    price: 4.20,
    category: Category.FONTANERIA,
    image: 'https://picsum.photos/400/300?random=7',
    stock: 200
  },
  {
    id: '8',
    name: 'Cinta Métrica 5m',
    description: 'Cinta métrica robusta con freno y clip para cinturón.',
    price: 6.50,
    category: Category.HERRAMIENTAS,
    image: 'https://picsum.photos/400/300?random=8',
    stock: 60
  },
  {
    id: '9',
    name: 'Juego de Brocas Muro',
    description: 'Set de 5 brocas para concreto de diferentes medidas.',
    price: 11.00,
    category: Category.HERRAMIENTAS,
    image: 'https://picsum.photos/400/300?random=9',
    stock: 35
  },
  {
    id: '10',
    name: 'Bombilla LED 10W (Pack 3)',
    description: 'Luz blanca fría, ahorro energético A+.',
    price: 9.99,
    category: Category.ELECTRICIDAD,
    image: 'https://picsum.photos/400/300?random=10',
    stock: 80
  },
  {
    id: '11',
    name: 'Carretilla de Obra',
    description: 'Estructura metálica reforzada y rueda neumática.',
    price: 45.00,
    category: Category.CONSTRUCCION,
    image: 'https://picsum.photos/400/300?random=11',
    stock: 5
  },
  {
    id: '12',
    name: 'Manguera de Jardín 15m',
    description: 'Manguera reforzada con boquilla de riego ajustable.',
    price: 18.90,
    category: Category.JARDIN,
    image: 'https://picsum.photos/400/300?random=12',
    stock: 22
  }
];

export const APP_NAME = "Ferretería El Maestro";