// src/components/pages/Wishlist.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    // Simulação de carregamento da lista de desejos
    // Em um cenário real, você faria uma chamada à API para buscar os itens
    const fetchWishlist = async () => {
      try {
        // Simulação de dados da lista de desejos
        const mockWishlist = [
          {
            id: 1,
            product: {
              id: 1,
              name: 'PC Gaming Pro',
              price: 450000,
              image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              slug: 'pc-gaming-pro'
            }
          },
          {
            id: 2,
            product: {
              id: 2,
              name: 'Laptop Business',
              price: 320000,
              image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              slug: 'laptop-business'
            }
          }
        ];
        
        setWishlistItems(mockWishlist);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  if (loading) {
    return (
      <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando lista de desejos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-primary hover:text-primary-dark">
            <i className="fas fa-arrow-left mr-2"></i> Continuar comprando
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sua Lista de Desejos</h1>
        
        {wishlistItems.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <button 
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.product.name}</h3>
                    <p className="text-xl font-bold text-primary mb-4">{item.product.price} Kz</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleAddToCart(item.product.id)}
                        className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
                      >
                        <FaShoppingCart className="mr-2" /> Adicionar ao Carrinho
                      </button>
                      <Link 
                        to={`/products/${item.product.slug}`}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Ver
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="flex justify-center mb-6">
              <FaHeart className="text-6xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Sua lista de desejos está vazia</h2>
            <p className="text-gray-600 mb-6">Adicione produtos à sua lista de desejos para não perdê-los.</p>
            <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
              Ver Produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;