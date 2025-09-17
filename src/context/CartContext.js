import React, { createContext, useState, useContext } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ childen }) => {
    const [cart, setCart] = useState(null);
    const [cartCode, setCartCode] = useState(localStorage.getItem("cart_code") || generateCartCode());

    function generateCartCode() {
        const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("cart_code", code);
        return code;
    }

    const fetchCart = async () => {
        try {
            const response = await api.get(`/cart/${cartCode}`);
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const addToCart = async (productId) => {
        try {
            await api.post("/add_to_cart", {
                cart_code: cartCode,
                productId: productId
            });
            fetchCart();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const updateCartItemQuantity = async (itemId, quantity) => {
        try {
            await api.put("/update_cartitem_quantity/", {
                item_id: itemId,
                quantity
            });
            fetchCart();
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };
}
