import React, { createContext, useState, useContext } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ childen }) => {
    const [cart, setCart] = useState(null);
    const [cartCode, setCartCode] = useState(localStorage.getItem("cart_code") || generateCartCode());
}
