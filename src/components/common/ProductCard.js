import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id);
  };

  <Link to={`/products/${product.slug}`} className="block">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift animate-on-scroll product-card h-full flex flex-col">
        <div className=""></div>
    </div>
  </Link>
}