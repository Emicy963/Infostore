import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStar, FaStarHalfAlt, FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";
import { useCart } from "../../contexts/CartContext";
import { useTheme } from "../../contexts/ThemeContext";

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { darkMode } = useTheme();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${slug}/`);
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
            <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carregando produto...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center max-w-md`}>
                    <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Produto não encontrado</h2>
                    <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>O produto que você está procurando não existe ou foi removido.</p>
                    <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
                        Ver todos os produtos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/products" className={`inline-flex items-center ${darkMode ? 'text-gray-300 hover:text-primary' : 'text-primary hover:text-primary-dark'}`}>
                        <FaArrowLeft className="mr-2" /> Voltar para produtos
                    </Link>
                </div>

                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
                        </div>
                        <div className="md:w-1/2 p-8">
                            <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h1>
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalfAlt />
                                </div>
                                <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>(4.5)</span>
                                <span className={`mx-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{product.reviews ? product.reviews.length : 0} avaliações</span>

                            </div>

                            <p className="text-2xl font-bold text-primary mb-6">{product.price} Kz</p>
                            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{product.description}</p>

                            <div className="flex items-center mb-6">
                                <span className={`mr-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quantidade:</span>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={quantity} 
                                    onChange={handleQuantityChange}
                                    className={`w-20 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white' 
                                            : 'border-gray-300'
                                    } border`}
                                />
                            </div>

                            <div className="flex space-x-4 mb-8">
                                <button 
                                    onClick={handleAddToCart}
                                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 flex items-center"
                                    >
                                        <FaShoppingCart className="mr-2" /> Adicionar ao Carrinho
                                </button>
                                <button className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                                    darkMode 
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                >
                                    <FaHeart className="mr-2" /> Favoritar
                                </button>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Detalhes do Produto</h3>
                               <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <li><span className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Categoria:</span> {product.category}</li>
                                    <li><span className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Garantia:</span> 1 ano</li>
                                    <li><span className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Entrega:</span> 2-3 dias úteis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className={`mt-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
                    <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Avaliações</h2>
                    
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-6">
                            {product.reviews.map((review) => (
                                <div key={review.id} className={`border-b pb-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex justify-between mb-2">
                                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{review.user}</h3>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{review.comment}</p>
                                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{review.created_at}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Este produto ainda não possui avaliações.</p>
                    )}

                    <div className="mt-8">
                        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Deixe sua Avaliação</h3>
                        <form>
                            <div className="mb-4">
                                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Avaliação</label>
                                <div className="flex text-2xl">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} type="button" className={`${
                                            darkMode ? 'text-gray-600 hover:text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                                        } focus:outline-none mr-1`}>
                                            <FaStar />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Comentário</label>
                                <textarea className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'border-gray-300'
                                } border`} rows="4"></textarea>
                            </div>
                            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300">
                                Enviar Avaliação
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
