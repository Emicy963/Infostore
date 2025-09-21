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
};
