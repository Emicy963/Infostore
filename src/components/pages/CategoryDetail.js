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

    if (loading) {
        return (
            <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando categoria...</p>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Categoria não encontrada</h2>
                    <p className="text-gray-600 mb-6">A categoria que você está procurando não existe ou foi removida.</p>
                    <Link to="/categories" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
                        Ver todas as categorias
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/categories" className="inline-flex items-center text-primary hover:text-primary-dark">
                        <i className="fas fa-arrow-left mr-2"></i> Voltar para categorias
                    </Link>
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
                    <p className="text-xl text-gray-600">{category.description}</p>
                </div>

                {products.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Nenhum produto encontrado</h2>
                        <p className="text-gray-600 mb-6">No momento não temos produtos nesta categoria.</p>
                        <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
                        Ver todos os produtos
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetail;
