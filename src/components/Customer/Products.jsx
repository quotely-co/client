import React from 'react';
import { Star, Heart } from 'lucide-react';

const Product = ({ product }) => (
  <div className="flex flex-col lg:flex-col p-4 border rounded-lg hover:shadow-lg transition-shadow">
    <div className="flex gap-4 lg:flex-col">
      <div className="relative group w-24 h-24 lg:w-full lg:h-48 flex-shrink-0">
        <img 
          src="/api/placeholder/200/200" 
          alt="Product" 
          className="w-full h-full object-cover rounded-md"
        />
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="flex-grow lg:mt-3">
        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <div className="mt-1">
          <span className="text-lg font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const ProductList = () => {
  const products = [
    {
      id: 1,
      title: "Wireless Noise Cancelling Headphones with Premium Sound Quality",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4,
      reviews: 2456,
    },
    {
      id: 2,
      title: "Smart Fitness Tracker with Heart Rate Monitor",
      price: 79.99,
      rating: 5,
      reviews: 1832,
    },
    {
      id: 3,
      title: "Ultra HD 4K Action Camera with Waterproof Case",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4,
      reviews: 958,
    },
    {
      id: 4,
      title: "Portable Power Bank 20000mAh Fast Charging",
      price: 45.99,
      rating: 4,
      reviews: 3267,
    },
    {
      id: 5,
      title: "Premium Bluetooth Speaker with 360° Sound",
      price: 129.99,
      rating: 5,
      reviews: 1543,
    },
    {
      id: 6,
      title: "Smart Home Security Camera with Night Vision",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4,
      reviews: 2156,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:grid lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;