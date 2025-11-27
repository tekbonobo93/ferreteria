import React from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { ShoppingCart, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden h-full group">
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1">
          <Tag size={12} className="text-orange-500" />
          {product.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <span className="text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <Button 
            onClick={() => onAddToCart(product)} 
            size="sm"
            className="gap-2"
          >
            <ShoppingCart size={16} />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
};