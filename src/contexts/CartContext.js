// src/contexts/CartContext.js
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
        // Adicionar a barra no final da URL
        const response = await api.get(`/api/cart/${cartCode}/`);
        setCart(response.data);
        } catch (error) {
        console.error('Error fetching cart:', error);
        // Se o carrinho não existir, criar um novo
        try {
            const newCartResponse = await api.post('/cart/create/');
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
        // Se o usuário está autenticado, tentamos buscar o carrinho do usuário
        const response = await api.get('/api/cart/user/');
        const userCart = response.data;
        
        // Se o carrinho do usuário existe, mesclar com o carrinho local
        if (userCart && userCart.items && userCart.items.length > 0) {
            // Adicionar itens do carrinho local ao carrinho do usuário
            if (cart && cart.items && cart.items.length > 0) {
            for (const item of cart.items) {
                await api.post('/add_to_cart/', {
                cart_code: userCart.cart_code,
                product_id: item.product.id,
                quantity: item.quantity
                });
            }
            }
            
            // Atualizar o cartCode para o do usuário
            setCartCode(userCart.cart_code);
            localStorage.setItem('cart_code', userCart.cart_code);
            
            // Buscar o carrinho atualizado
            const updatedCart = await api.get(`/api/cart/${userCart.cart_code}/`);
            setCart(updatedCart.data);
        } else {
            // Se o usuário não tem carrinho, criar um para ele
            const newCartResponse = await api.post('/api/cart/create/', { user: user.id });
            const newCart = newCartResponse.data;
            
            // Mover itens do carrinho local para o novo carrinho do usuário
            if (cart && cart.items && cart.items.length > 0) {
            for (const item of cart.items) {
                await api.post('/add_to_cart/', {
                cart_code: newCart.cart_code,
                product_id: item.product.id,
                quantity: item.quantity
                });
            }
            
            // Buscar o carrinho atualizado
            const updatedCart = await api.get(`/api/cart/${newCart.cart_code}/`);
            setCart(updatedCart.data);
            } else {
            setCart(newCart);
            }
            
            setCartCode(newCart.cart_code);
            localStorage.setItem('cart_code', newCart.cart_code);
        }
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
    }, [user]); // Removemos as dependências que causam o erro

    const addToCart = async (productId) => {
        try {
        await api.post('/add_to_cart/', {
            cart_code: cartCode,
            product_id: productId
        });
        fetchCart();
        } catch (error) {
        console.error('Error adding to cart:', error);
        }
    };

    const updateCartItemQuantity = async (itemId, quantity) => {
        try {
        await api.put('/update_cartitem_quantity/', {
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
        await api.delete(`/delete_cartitem/${itemId}`);
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