import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const Cart = () => {
    const { cart, fetchCart, updateCartItemQuantity, removeCartItem } = useCart();
    const { user } = useAuth();
    const { darkMode } = useTheme();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            await fetchCart();
            setLoading(false);
        };

        loadCart();
    }, [fetchCart]);

    useEffect(() => {
        console.log('Cart state:', cart);
        console.log('Cart items:', cart?.cartitems);
    }, [cart]);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity >= 1) {
            updateCartItemQuantity(itemId, newQuantity);
        }
    };

    const handleRemoveItem = async (itemId) => {
        removeCartItem(itemId);
        await fetchCart();
    };

    const calculateTotal = () => {
        if (!cart || !cart.cartitems) return 0;
        return cart.cartitems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    if (loading) {
        return (
            <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carregando carrinho...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/products" className={`inline-flex items-center ${darkMode ? 'text-gray-300 hover:text-primary' : 'text-primary hover:text-primary-dark'}`}>
                        <FaArrowLeft className="mr-2" /> Continuar comprando
                    </Link>
                </div>

                <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Seu Carrinho
                </h1>

                {cart && cart.cartitems && cart.cartitems.length > 0 ? (
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                        <div className="md:flex">
                            <div className="md:w-2/3 p-6">
                                <div className="space-y-6">
                                    {cart.cartitems.map((item) => (
                                        <div key={item.id} className={`flex items-center border-b pb-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <img 
                                                src={item.product.image} 
                                                alt={item.product.name} 
                                                className="w-24 h-24 object-cover rounded-lg" 
                                            />
                                            <div className="ml-4 flex-1">
                                                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {item.product.name}
                                                </h3>
                                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {item.product.description}
                                                </p>
                                                <div className="flex items-center mt-2">
                                                    <span className="text-xl font-bold text-primary">
                                                        {item.product.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center mb-4">
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        className={`${
                                                            darkMode 
                                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        } w-8 h-8 rounded-full flex items-center justify-center transition-colors`}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <FaMinus size={12} />
                                                    </button>
                                                    <span className={`mx-3 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className={`${
                                                            darkMode 
                                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        } w-8 h-8 rounded-full flex items-center justify-center transition-colors`}
                                                    >
                                                        <FaPlus size={12} />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`md:w-1/3 p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Resumo do Pedido
                                </h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                                        <span className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
                                            {calculateTotal().toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Entrega</span>
                                        <span className="text-green-600 font-medium">Grátis</span>
                                    </div>
                                    <div className={`flex justify-between font-bold text-lg pt-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                                        <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                                        <span className="text-primary">
                                            {calculateTotal().toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                                        </span>
                                    </div>
                                </div>
                                
                                {user ? (
                                    <Link 
                                        to="/checkout"
                                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 block text-center"
                                    >
                                        Finalizar Compra
                                    </Link>
                                ) : (
                                    <div className="mb-4">
                                        <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Faça login para finalizar sua compra
                                        </p>
                                        <Link 
                                            to="/login" 
                                            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 block text-center"
                                        >
                                            Fazer Login
                                        </Link>
                                    </div>
                                )}
                                
                                <Link 
                                    to="/products" 
                                    className={`w-full mt-4 border-2 py-3 rounded-lg font-semibold transition-all duration-300 block text-center ${
                                        darkMode 
                                            ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                                            : 'border-primary text-primary hover:bg-gray-100'
                                    }`}
                                >
                                    Continuar Comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
                        <div className="flex justify-center mb-6">
                            <FaShoppingCart className={`text-6xl ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                        </div>
                        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Seu carrinho está vazio
                        </h2>
                        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Adicione produtos ao seu carrinho para continuar comprando.
                        </p>
                        <Link 
                            to="/products" 
                            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block"
                        >
                            Ver Produtos
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;