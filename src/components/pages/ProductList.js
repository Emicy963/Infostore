import React, { useEffect, useState } from "react";
import ProductCard from "../common/ProductCard";
import api from "../../services/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/product_list");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando produtos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
            <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todos os <span className="text-primary">Produtos</span></h1>
                    <p className="text-xl text-gray-600">Explore nossa linha completa de produtos tecnológicos</p>
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
                        <p className="text-gray-600 mb-6">No momento não temos produtos disponíveis.</p>
                        <a href="/" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
                            Voltar para a página inicial
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
