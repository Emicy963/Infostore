import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const { user } = useAuth();

    const [cartCode, setCartCode] = useState(() => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    });

    const fetchCart = async () => {
        try {
            let response;
            if (user) {
                // Usuário autenticado
                response = await api.get('/cart/');
            } else {
                // Usuário anônimo - precisa do código
                response = await api.get('/cart/', { params: { code: cartCode } });
            }
            if (response.data) {
                setCart(response.data);
            } else {
                setCart(null)
            }
        } catch (error) {
            if (error.response?.status === 404 || error.response?.status === 400) {
                setCart(null);
            } else {
                console.error('Error fetching cart:', error);
                setCart(null);
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
            fetchCart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        try {
            let currentCartCode = cartCode;
            
            // Se não existe carrinho, criar primeiro
            if (!cart) {
                const createResponse = await api.post('/cart/', {});
                const newCart = createResponse.data;
                setCart(newCart);
                currentCartCode = newCart.cart_code;
                setCartCode(newCart.cart_code);
            }
            
            // Usar o cart_code correto (novo ou existente)
            await api.post('/cart/add/', {
                cart_code: currentCartCode,
                product_id: productId,
                quantity
            });
            
            // IMPORTANTE: O cache de /cart/ é automaticamente invalidado pelo interceptor
            // do axios após a requisição POST. Portanto, fetchCart() vai buscar dados frescos.
            await fetchCart();
            
            return { success: true }; // Retornar sucesso
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const updateCartItemQuantity = async (itemId, quantity) => {
        try {
            await api.put('/cart/update/', {
                item_id: itemId,
                quantity
            });
            // IMPORTANTE: Aguardar o fetchCart terminar
            await fetchCart();
        } catch (error) {
            console.error('Error updating cart item:', error);
            // Mesmo com erro, tenta recarregar
            await fetchCart();
        }
    };

    const removeCartItem = async (itemId) => {
        try {
            await api.delete(`/cart/item/${itemId}/delete/`);
            // IMPORTANTE: Aguardar o fetchCart terminar
            await fetchCart();
        } catch (error) {
            console.error('Error removing cart item:', error);
            // Mesmo com erro, tenta recarregar
            await fetchCart();
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