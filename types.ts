export enum Category {
  HERRAMIENTAS = 'Herramientas',
  CONSTRUCCION = 'Construcción',
  PINTURA = 'Pintura',
  FONTANERIA = 'Fontanería',
  ELECTRICIDAD = 'Electricidad',
  JARDIN = 'Jardín'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}