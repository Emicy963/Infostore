import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import api from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const { darkMode } = useTheme();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let url = '/products/';
                const params = {};
                
                if (searchQuery) {
                    url = '/search/';
                    params.query = searchQuery;
                }
                
                params.page = currentPage;
                params.page_size = 12;
                
                const response = await api.get(url, { params });
                setProducts(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 12));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setSearchQuery(e.target.search.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carregando produtos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/" className={`inline-flex items-center ${darkMode ? 'text-gray-300 hover:text-primary' : 'text-primary hover:text-primary-dark'}`}>
                        <i className="fas fa-arrow-left mr-2"></i> Voltar para a página inicial
                    </Link>
                </div>
                
                <div className="mb-8">
                    <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Todos os Produtos</h1>
                    
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar produtos..."
                                className={`w-full px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                    darkMode 
                                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                                        : 'border-gray-300'
                                } border`}
                            />
                            <button
                                type="submit"
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                                    darkMode ? 'text-gray-400 hover:text-primary' : 'text-gray-400 hover:text-primary'
                                }`}
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
                
                {products.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        
                        {/* Paginação */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex space-x-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 rounded-lg ${
                                                currentPage === page
                                                    ? 'bg-primary text-white'
                                                    : darkMode
                                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nenhum produto encontrado</h2>
                        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {searchQuery 
                                ? `Não encontramos resultados para "${searchQuery}".`
                                : 'No momento não temos produtos disponíveis.'
                            }
                        </p>
                        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
                            Voltar para a página inicial
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;