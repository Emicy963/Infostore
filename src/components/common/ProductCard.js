import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useTheme } from "../../contexts/ThemeContext";
import api from "../../services/api";

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const { darkMode } = useTheme();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    // Verificar se o produto já está na wishlist ao carregar
      const checkWishlist = async () => {
          try {
              const response = await api.get('/wishlist/');
              const isInWishlist = response.data.some(item => item.product.id === product.id);
              setIsWishlisted(isInWishlist);
          } catch (error) {
              console.error('Erro ao verificar wishlist:', error);
          }
      };
      
      checkWishlist();
  }, [product.id]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAddingToCart(true);
    try {
      await addToCart(product.id);
      // Mostrar feedback visual
      setTimeout(() => setIsAddingToCart(false), 1000);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async (e) => {
      e.preventDefault();
      try {
          // A API toggle automaticamente (adiciona se não existe, remove se existe)
          const response = await api.post('/wishlist/add/', { product_id: product.id });
          // A API retorna o item se foi criado, ou 204 se foi removido
          if (response.status === 204) {
              setIsWishlisted(false);
          } else {
              setIsWishlisted(true);
          }
      } catch (error) {
          console.error('Erro ao adicionar/remover da wishlist:', error);
      }
  };

  return (
    <Link to={`/products/${product.slug}`} className="block group">
      <div className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      } rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border h-full flex flex-col`}>
        
        {/* Image Container */}
        <div className="relative overflow-hidden flex-shrink-0 bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badges */}
          {product.feature && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              Novo
            </div>
          )}
          
          {product.discount && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              -{product.discount}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
              darkMode ? 'bg-gray-900/80 hover:bg-gray-900' : 'bg-white/90 hover:bg-white'
            } shadow-lg hover:scale-110`}
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" size={16} />
            ) : (
              <FaRegHeart className={darkMode ? 'text-white' : 'text-gray-700'} size={16} />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className={`text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem] ${
            darkMode ? 'text-white group-hover:text-primary' : 'text-gray-900 group-hover:text-primary'
          } transition-colors`}>
            {product.name}
          </h3>
          
          <p className={`text-sm mb-4 flex-grow line-clamp-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {product.description}
          </p>

          {/* Price and Actions */}
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <div>
                {product.discount && (
                  <div className={`text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {Math.round(parseFloat(product.price.replace(/\./g, '')) / (1 - product.discount / 100)).toLocaleString()} Kz
                  </div>
                )}
                <div className="text-2xl font-bold text-primary">
                  {product.price} Kz
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md ${
                  isAddingToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white hover:bg-primary-dark'
                } disabled:opacity-50`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Adicionado!</span>
                  </>
                ) : (
                  <>
                    <FaShoppingCart size={16} />
                    <span className="text-sm">Adicionar</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleToggleWishlist}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  isWishlisted
                    ? 'bg-red-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } hover:scale-105`}
              >
                {isWishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;