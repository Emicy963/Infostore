import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar, FaSatrHalfAlt, FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";
import { useCart } from "../../context/CartContext";

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${slug}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            setQuantity(value);
        }
    };

    if (loading) {
        return(
            <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando produto...</p>
                </div>
            </div>
        );
    }
};

export default ProductDetail;
