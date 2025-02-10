import React, { useEffect, useState } from "react";
import { Star, Heart } from "lucide-react";
import axios from "axios";

const Product = ({ product }) => {
  // Extract the base price from variations (fallback to 0 if not available)
  const basePrice = product.variations?.[0]?.basePrice || 0;
  const description = product.description
    ? product.description.slice(0, 50) + (product.description.length > 50 ? "..." : "")
    : "No description available";

  return (
    <div className="flex flex-col lg:flex-col p-4 border rounded-lg hover:shadow-lg transition-shadow">
      <div className="flex gap-4 lg:flex-col">
        <div className="relative group w-24 h-24 lg:w-full lg:h-48 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
          <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex-grow lg:mt-3">
          <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < (product.rating || 4) // Default rating 4
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews || 0})
            </span>
          </div>
          <div className="mt-1">
            <span className="text-lg font-bold">${basePrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const HOST = import.meta.env.VITE_HOST_URL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${HOST}/api/products`);
        console.log("API Response:", response.data);

        // Ensure products are extracted correctly
        setProducts(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:grid lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
