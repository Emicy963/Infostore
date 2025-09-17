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
}
