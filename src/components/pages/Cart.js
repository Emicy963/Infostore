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
        )
    }
};

export default Cart;
