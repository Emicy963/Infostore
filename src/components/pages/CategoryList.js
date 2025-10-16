import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useTheme } from "../../contexts/ThemeContext";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { darkMode } = useTheme();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/category_list");
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carregando categorias...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Nossas <span className="text-primary">Categorias</span>
                    </h1>
                    <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Explore nossas categorias de produtos tecnológicos
                    </p>
                </div>

                {categories.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Link 
                                key={category.id} 
                                to={`/categories/${category.slug}`}
                                className={`${
                                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                                } rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border group`}
                            >
                                <div className="p-6">
                                    <div className={`${
                                        darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                                    } text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300`}>
                                        <i className="fas fa-laptop text-2xl"></i>
                                    </div>
                                    <h3 className={`text-xl font-semibold mb-2 text-center ${
                                        darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        {category.name}
                                    </h3>
                                    <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {category.description}
                                    </p>
                                    <div className="mt-4 text-center">
                                        <span className="text-primary font-medium group-hover:underline">Ver produtos</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Nenhuma categoria encontrada
                        </h2>
                        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            No momento não temos categorias disponíveis.
                        </p>
                        <Link 
                            to="/" 
                            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block"
                        >
                            Voltar para a página inicial
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryList;