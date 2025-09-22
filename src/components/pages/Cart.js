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
};

export default Cart;
