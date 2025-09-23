import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id);
  };

  return (
    <Link to={`/products/${product.slug}`} className="block">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift animate-on-scroll product-card h-full flex flex-col">
            <div className="relative overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
                {product.feature && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm animate-pulse">
                        Novo
                    </div>
                )}
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary animate-pulse-slow">{product.price} Kz</span>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleAddToCart}
                            className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105">
                                <FaShoppingCart />
                        </button>
                        <button className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-all duration-300 hover:scale-105">
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default ProductCard;
