import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {
    const { cart, fetchCart, updateCartItemQuantity, removeCartItem } = useCart();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            await fetchCart();
            setLoading(false);
        };

        loadCart();
    }, [fetchCart]);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity >= 1) {
            updateCartItemQuantity(itemId, newQuantity);
        }
    };

    const handleRemoveItem = (itemId) => {
        removeCartItem(itemId);
    };

    const calculateTotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + (item.product.price *item.quantity), 0);
    };

    if (loading) {
        return (
            <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando carrinho...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/products" className="inline-flex items-center text-primary hover:text-primary-dark">
                        <FaArrowLeft className="mr-2" /> Continuar comprando
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>

                {cart && cart.items && cart.items.length > 0 ? (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidde">
                        <div className="md:flex">
                            <div className="md:w-2/3 p-6">
                                <div className="space-y-6">
                                    {cart.items.map((item) => (
                                        <div className="flex items-center border-b pb-6">
                                            <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg" />
                                            <div className="ml-4 flex-1">
                                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                                <p className="text-gray-600">{item.product.description}</p>
                                                <div className="flex items-center mt-2">
                                                    <span className="text-xl font-bold text-primary">{item.product.price} Kz</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center mb-4">
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <FaMinus size={12} />
                                                    </button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300"
                                                    >
                                                        <FaPlus size={12} />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                    >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="md:w-1/3 bg-gray-50 p-6">
                                <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>{calculateTotal()} Kz</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Entrega</span>
                                        <span>0 Kz</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>{calculateTotal()} Kz</span>
                                    </div>
                                </div>
                                <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300">
                                    Finalizar Compra
                                </button>
                                <Link to="/products" className="w-full mt-4 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 block text-center">
                                    Continuar Comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                        <div className="flex justify-center mb-6">
                            <FaShoppingCart className="text-6xl text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
                        <p className="text-gray-600 mb-6">Adicione produtos ao seu carrinho para continuar comprando.</p>
                        <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
                            Ver Produtos
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
