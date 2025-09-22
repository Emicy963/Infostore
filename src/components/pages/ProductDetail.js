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

    if (!product) {
        return (
            <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Produto não encontrado</h2>
                    <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
                    <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
                        Ver todos os produtos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/products" className="inline-flex items-center text-primary hover:text-primary-dark">
                        <FaArrowLeft className="mr-2" /> Voltar para produtos
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidde">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
                        </div>
                        <div className="md:w-1/2 p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalfAlt />
                                </div>
                                <span className="ml-2 text-gray-600">(4.5)</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-gray-600">{product.reviews ? product.reviews.length : 0} avaliações</span>
                            </div>

                            <p className="text-2xl font-bold text-primary mb-6">{product.price} Kz</p>
                            <p className="text-gray-600 mb-6">{product.description}</p>

                            <div className="flex items-center mb-6">
                                <span className="mr-4 text-gray-700">Quantidade:</span>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={quantity} 
                                    onChange={handleQuantityChange}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="flex space-x-4 mb-8">
                                <button 
                                    onClick={handleAddToCart}
                                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 flex items-center"
                                    >
                                        <FaShoppingCart className="mr-2" /> Adicionar ao Carrinho
                                </button>
                                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center">
                                    <FaHeart className="mr-2" /> Favoritar
                                </button>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold mb-2">Detalhes do Produto</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li><span className="font-medium">Categoria:</span> {product.category}</li>
                                    <li><span className="font-medium">Garantia:</span> 1 ano</li>
                                    <li><span className="font-medium">Entrega:</span> 2-3 dias úteis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
