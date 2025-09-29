import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaSearch, FaUser, FaSignOutAlt, FaBox, FaTh } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleClick = () => setClick(!click);
  const toggleDropdown = () => setDropdown(!dropdown);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setClick(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdown(false);
  };

  // Detectar scroll para adicionar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && !event.target.closest('.user-dropdown')) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdown]);

  // Calcular total de itens no carrinho
  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <nav className={`bg-white fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-3 py-1 rounded-lg font-bold text-xl transform group-hover:scale-105 transition-transform">
                IS
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Infostore
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
            >
              Início
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-primary font-medium transition-colors relative group flex items-center gap-1"
            >
              <FaBox className="text-sm" />
              Produtos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-700 hover:text-primary font-medium transition-colors relative group flex items-center gap-1"
            >
              <FaTh className="text-sm" />
              Categorias
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
            >
              Sobre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>
          
          {/* Search Bar for Desktop */}
          <div className="hidden md:block flex-grow max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden text-gray-700 hover:text-primary transition-colors p-2"
            >
              <FaSearch size={20} />
            </button>
            
            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="text-gray-700 hover:text-primary transition-colors relative p-2 hover:bg-gray-100 rounded-lg"
              title="Lista de Desejos"
            >
              <FaHeart size={20} />
            </Link>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-primary transition-colors relative p-2 hover:bg-gray-100 rounded-lg"
              title="Carrinho de Compras"
            >
              <FaShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            {user ? (
              <div className="relative user-dropdown">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block font-medium max-w-24 truncate">
                    {user.name || user.email.split('@')[0]}
                  </span>
                </button>
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100 animate-fade-in-down">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name || 'Usuário'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdown(false)}
                    >
                      <FaUser className="mr-3" />
                      Meu Perfil
                    </Link>
                    <Link 
                      to="/orders" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdown(false)}
                    >
                      <FaBox className="mr-3" />
                      Meus Pedidos
                    </Link>
                    <Link 
                      to="/wishlist" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdown(false)}
                    >
                      <FaHeart className="mr-3" />
                      Lista de Desejos
                    </Link>
                    <hr className="my-2" />
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all hover:shadow-lg font-medium"
              >
                <FaUser />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={handleClick} 
                className="text-gray-700 hover:text-primary transition-colors p-2"
              >
                {click ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fade-in-down">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        )}
      </div>
      
      {/* Mobile menu */}
      {click && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in-down">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              onClick={handleClick} 
              className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
            >
              Início
            </Link>
            <Link 
              to="/products" 
              onClick={handleClick} 
              className="flex items-center text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
            >
              <FaBox className="mr-2" />
              Produtos
            </Link>
            <Link 
              to="/categories" 
              onClick={handleClick} 
              className="flex items-center text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
            >
              <FaTh className="mr-2" />
              Categorias
            </Link>
            <Link 
              to="/about" 
              onClick={handleClick} 
              className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
            >
              Sobre
            </Link>
            <Link 
              to="/contact" 
              onClick={handleClick} 
              className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
            >
              Contacto
            </Link>
            
            {user ? (
              <>
                <hr className="my-2" />
                <Link 
                  to="/profile" 
                  onClick={handleClick} 
                  className="flex items-center text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
                >
                  <FaUser className="mr-2" />
                  Meu Perfil
                </Link>
                <Link 
                  to="/orders" 
                  onClick={handleClick} 
                  className="flex items-center text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
                >
                  <FaBox className="mr-2" />
                  Meus Pedidos
                </Link>
                <Link 
                  to="/wishlist" 
                  onClick={handleClick} 
                  className="flex items-center text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
                >
                  <FaHeart className="mr-2" />
                  Lista de Desejos
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    handleClick();
                  }}
                  className="flex items-center w-full text-left text-red-600 hover:bg-red-50 px-3 py-3 rounded-lg text-base font-medium transition-all"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <hr className="my-2" />
                <Link 
                  to="/login" 
                  onClick={handleClick} 
                  className="block bg-primary text-white hover:bg-primary-dark px-3 py-3 rounded-lg text-base font-medium transition-all text-center"
                >
                  Entrar / Registrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;