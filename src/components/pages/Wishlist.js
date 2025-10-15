import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        // Se não há usuário autenticado, não carrega a lista de desejos
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchWishlist = async () => {
            try {
                const response = await api.get('/wishlist/');
                setWishlistItems(response.data);
                setLoading(false);
            } catch (error) {
                setError("Erro ao carregar sua lista de desejos. Tente novamente.");
                setLoading(false);
                console.error("Error fetching wishlist:", error);
            }
        };

        fetchWishlist();
    }, [user]);

    const handleAddToCart = (productId) => {
        addToCart(productId);
    };

    const handleRemoveFromWishlist = async (itemId) => {
        try {
            await api.delete(`/wishlist/${itemId}/delete/`);
            setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
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

    // Se não há usuário autenticado, mostra mensagem para fazer login
    if (!user) {
        return (
            <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md">
                    <div className="flex justify-center mb-6">
                        <FaHeart className="text-6xl text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Acesso Restrito</h2>
                    <p className="text-gray-600 mb-6">Você precisa estar logado para ver sua lista de desejos.</p>
                    <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
                        Fazer Login
                    </Link>
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
                
                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                
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
                                        <p className="text-xl font-bold text-primary mb-4">
                                            {item.product.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                        </p>
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