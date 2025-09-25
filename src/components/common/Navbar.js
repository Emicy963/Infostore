import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdown, setDropdown] = useState(false);
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
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center animate-fade-in-left">
            <div className="hidden bg-primary text-white px-3 py-1 rounded-lg font-bold text-xl">IS</div>
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-light transition-colors ml-2">Infostore</Link>
          </div>
          
          {/* Search Bar for Desktop */}
          <div className="hidden md:block flex-grow max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden text-gray-700 hover:text-primary transition-colors"
            >
              <FaSearch />
            </button>
            
            <Link to="/cart" className="text-gray-700 hover:text-primary transition-colors relative">
              <FaShoppingCart />
              {cart && cart.items && cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            
            <Link to="/wishlist" className="text-gray-700 hover:text-primary transition-colors">
              <FaHeart />
            </Link>
            
            {/* User Menu */}
            {user ? (
              <div className="relative user-dropdown">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <FaUser />
                </button>
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.name || user.email}
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdown(false)}
                    >
                      Meu Perfil
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdown(false)}
                    >
                      Meus Pedidos
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline mr-2" /> Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">
                <FaUser />
              </Link>
            )}
            
            <div className="md:hidden">
              <button onClick={handleClick} className="text-gray-700 hover:text-primary transition-colors">
                {click ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden py-3 border-t">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Início</Link>
            <Link to="/products" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Produtos</Link>
            <Link to="/categories" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Categorias</Link>
            <Link to="/about" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Sobre</Link>
            <Link to="/contact" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Contacto</Link>
            
            {user ? (
              <>
                <Link to="/profile" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Meu Perfil</Link>
                <Link to="/orders" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Meus Pedidos</Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    handleClick();
                  }}
                  className="block w-full text-left text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                >
                  <FaSignOutAlt className="inline mr-2" /> Sair
                </button>
              </>
            ) : (
              <Link to="/login" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;