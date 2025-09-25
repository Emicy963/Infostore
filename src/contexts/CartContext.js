import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartCode, setCartCode] = useState(localStorage.getItem("cart_code") || generateCartCode());
    const { user } = useAuth();

    function generateCartCode() {
        const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("cart_code", code);
        return code;
    }

    // When the user do login, merging the local cart with the user cart
    useEffect(() => {
        if (user) {
            const mergeCart = async () => {
                try {
                    // If user be authenticated, try find the user cart
                    const response = await api.get("/cart/user/");
                    const userCart = response.data;

                    // If the use cart exit, merging with the local cart
                    if (userCart && userCart.items && userCart.items.length > 0) {
                        // Add items of the local cart to user user cart
                        if (cart && cart.items && cart.items.length > 0) {
                            for (const item of cart.items) {
                                await api.post("/add_to_cart/", {
                                    cart_code: userCart.cart_code,
                                    product_id: item.product.id,
                                    quantity: item.quantity
                                });
                            }
                        }

                        // Update the cartCode for of the user
                        setCartCode(userCart.cart_code);
                        localStorage.setItem("cart_code", userCart.cart_code);

                        // Found the update cart
                        const updatedCart = await api.get(`/cart/${userCart.cart_code}`);
                        setCart(updatedCart.data);
                    } else {
                        // If user haven't cart, create one to him
                        const newCartResponse = await api.post("/cart/create/", { user:user.id });
                        const newCart = newCartResponse.data;

                        // Move items of the cart to the new user cart
                        if (cart && cart.items && cart.items.length > 0) {
                            for (const item of cart.items) {
                                await api.post("/add_to_cart/", {
                                    cart_code: newCart.cart_code,
                                    product_id: item.product.id,
                                    quantity: item.quantity
                                });
                            }

                            // Found the updated cart
                            const updatedCart = await api.get(`/cart/${newCart.cart_code}`);
                            setCart(updatedCart.data);
                        } else {
                            setCart(newCart);
                        }

                        setCartCode(newCart.cart_code);
                        localStorage.setItem("cart_code", newCart.cart_code);
                    }
                } catch (error) {
                    console.error("Error merging carts:", error);
                    // If some thing worng happen, keep with the local cart
                    fetchCart();
                }
            };

            mergeCart();
        } else {
            // Îf user not be authenticated, use the local cart
            fetchCart();
        }
    }, [user]);

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

    const removeCartItem = async (itemId) => {
        try {
            await api.delete(`/delete_cartitem/${itemId}`);
            fetchCart();
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            fetchCart,
            addToCart,
            updateCartItemQuantity,
            removeCartItem
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
