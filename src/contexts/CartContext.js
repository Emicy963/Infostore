import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartCode, setCartCode] = useState(localStorage.getItem('cart_code') || generateCartCode());
    const { user } = useAuth();

    function generateCartCode() {
        const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('cart_code', code);
        return code;
    }

    const fetchCart = async () => {
        try {
        let response;
        if (user) {
            // Usuário autenticado - não precisa de código
            response = await api.get('/cart/');
        } else {
            // Usuário anônimo - precisa do código
            response = await api.get('/cart/', { params: { code: cartCode } });
        }
        setCart(response.data);
        } catch (error) {
        console.error('Error fetching cart:', error);
        // Se o carrinho não existir, criar um novo
        try {
            const newCartResponse = await api.post('/cart/', {});
            const newCart = newCartResponse.data;
            setCartCode(newCart.cart_code);
            localStorage.setItem('cart_code', newCart.cart_code);
            setCart(newCart);
        } catch (createError) {
            console.error('Error creating cart:', createError);
        }
        }
    };

    const mergeCarts = async () => {
        try {
        // Mesclar carrinho temporário com o carrinho do usuário
        const response = await api.post('/cart/merge/', {
            temp_cart_code: cartCode
        });
        
        setCart(response.data);
        setCartCode(response.data.cart_code);
        localStorage.setItem('cart_code', response.data.cart_code);
        } catch (error) {
        console.error('Error merging carts:', error);
        // Se houver erro, continuar com o carrinho local
        fetchCart();
        }
    };

    // Quando o usuário faz login, mesclar o carrinho local com o carrinho do usuário
    useEffect(() => {
        if (user) {
        mergeCarts();
        } else {
        // Se o usuário não está autenticado, usar o carrinho local
        fetchCart();
        }
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        try {
        await api.post('/cart/add/', {
            cart_code: cartCode,
            product_id: productId,
            quantity
        });
        fetchCart();
        } catch (error) {
        console.error('Error adding to cart:', error);
        }
    };

    const updateCartItemQuantity = async (itemId, quantity) => {
        try {
        await api.put('/cart/update/', {
            item_id: itemId,
            quantity
        });
        fetchCart();
        } catch (error) {
        console.error('Error updating cart item:', error);
        }
    };

    const removeCartItem = async (itemId) => {
        try {
        await api.delete(`/cart/item/${itemId}/delete/`);
        fetchCart();
        } catch (error) {
        console.error('Error removing cart item:', error);
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