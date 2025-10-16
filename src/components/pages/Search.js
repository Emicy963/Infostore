import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import api from "../../services/api";
import { useTheme } from "../../contexts/ThemeContext";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/search/?query=${encodeURIComponent(searchTerm)}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching products:", error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Buscar <span className="text-primary">Produtos</span>
          </h1>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className={`flex-grow px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } border-2`}
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-primary-dark transition-colors flex items-center"
              >
                <FaSearch className="mr-2" />
                Buscar
              </button>
            </div>
          </form>
        </div>
        
        {query && (
          <div className="mb-6">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Resultados para: <span className="text-primary">"{query}"</span>
            </h2>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
            <div className="flex justify-center mb-6">
              <FaSearch className={`text-6xl ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            </div>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Nenhum produto encontrado
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Não encontramos produtos correspondentes à sua busca "{query}".
            </p>
            <div className="space-y-4">
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Sugestões:</p>
              <ul className={`list-disc list-inside text-left max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>Verifique a ortografia das palavras</li>
                <li>Tente usar termos mais genéricos</li>
                <li>Tente usar menos palavras-chave</li>
              </ul>
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300"
            >
              Limpar Busca
            </button>
          </div>
        ) : (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
            <div className="flex justify-center mb-6">
              <FaSearch className={`text-6xl ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            </div>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Buscar Produtos
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Digite o nome do produto que você está procurando no campo acima.
            </p>
            <div className="max-w-md mx-auto">
              <h3 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                Sugestões de busca:
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['Laptop', 'PC Gaming', 'Desktop', 'All-in-One', 'Monitor'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch(term);
                    }}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;