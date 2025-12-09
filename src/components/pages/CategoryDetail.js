import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import api from "../../services/api";
import { useTheme } from "../../contexts/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";

const CategoryDetail = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/product/categories/${slug}/`);
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
      <div
        className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className={`mt-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Carregando categoria...
          </p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div
        className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-lg p-12 text-center max-w-md`}
        >
          <h2
            className={`text-2xl font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Categoria não encontrada
          </h2>
          <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            A categoria que você está procurando não existe ou foi removida.
          </p>
          <Link
            to="/categories"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block"
          >
            Ver todas as categorias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`pt-16 pb-12 min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/categories"
            className={`inline-flex items-center ${
              darkMode
                ? "text-gray-300 hover:text-primary"
                : "text-primary hover:text-primary-dark"
            }`}
          >
            <FaArrowLeft className="mr-2" /> Voltar para categorias
          </Link>
        </div>

        <div className="mb-12">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {category.name}
          </h1>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {category.description}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-lg p-12 text-center`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Nenhum produto encontrado
            </h2>
            <p
              className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              No momento não temos produtos nesta categoria.
            </p>
            <Link
              to="/products"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block"
            >
              Ver todos os produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
