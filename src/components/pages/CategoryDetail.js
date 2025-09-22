import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import api from "../../services/api";

const CategoryDetail = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await api.get(`/categories/${slug}`);
                setCategory(response.data);
                setProducts(response.data.products || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching category:", error);
                setLoading(false);
            }
        };

        fetchCategory();
    }, [slug]);
};

export default CategoryDetail;
