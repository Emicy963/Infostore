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

  
};

export default Wishlist;