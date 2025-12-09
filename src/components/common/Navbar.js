import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaBox,
  FaTh,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleClick = useCallback(() => setClick((prev) => !prev), []);
  const toggleDropdown = useCallback(() => setDropdown((prev) => !prev), []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchOpen(false);
        setSearchQuery("");
        setClick(false);
      }
    },
    [searchQuery, navigate]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
    setDropdown(false);
  }, [logout, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && !event.target.closest(".user-dropdown")) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  const cartItemsCount =
    cart?.cartitems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white"
      } fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-md"
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="Infostore"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <img
                  src="/infostore-text.png"
                  alt="Infostore"
                  className="h-6 object-contain"
                />
                <span className="text-xs text-primary font-medium">
                  Tecnologia & Soluções
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { to: "/", label: "Início" },
              { to: "/products", label: "Produtos", icon: FaBox },
              { to: "/categories", label: "Categorias", icon: FaTh },
              { to: "/about", label: "Sobre" },
              { to: "/contact", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-700 hover:text-primary hover:bg-blue-50"
                } px-4 py-2 rounded-lg font-medium transition-all relative group flex items-center gap-2`}
              >
                {link.icon && <link.icon className="text-sm" />}
                {link.label}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-3/4"></span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-grow max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className={`w-full px-4 py-2 pr-10 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-primary"
                } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode
                    ? "text-gray-400 hover:text-primary"
                    : "text-gray-500 hover:text-primary"
                } transition-colors`}
              >
                <FaSearch />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-all`}
              title={darkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`md:hidden p-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              } transition-all`}
            >
              <FaSearch size={18} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`p-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              } transition-all relative`}
              title="Lista de Desejos"
            >
              <FaHeart size={18} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className={`p-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              } transition-all relative`}
              title="Carrinho"
            >
              <FaShoppingCart size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                  {cartItemsCount > 9 ? "9+" : cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  } transition-all`}
                >
                  <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className={`hidden lg:block font-medium max-w-24 truncate text-sm ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {user.name || user.email.split("@")[0]}
                  </span>
                </button>
                {dropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-56 ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-100"
                    } rounded-lg shadow-xl py-2 border animate-fade-in-down`}
                  >
                    <div
                      className={`px-4 py-3 border-b ${
                        darkMode ? "border-gray-700" : "border-gray-100"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          darkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {user.name || "Usuário"}
                      </p>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        } truncate`}
                      >
                        {user.email}
                      </p>
                    </div>
                    {[
                      { to: "/profile", icon: FaUser, label: "Meu Perfil" },
                      { to: "/orders", icon: FaBox, label: "Meus Pedidos" },
                      {
                        to: "/wishlist",
                        icon: FaHeart,
                        label: "Lista de Desejos",
                      },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center px-4 py-2 text-sm ${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-50"
                        } transition-colors`}
                        onClick={() => setDropdown(false)}
                      >
                        <item.icon className="mr-3" />
                        {item.label}
                      </Link>
                    ))}
                    <hr
                      className={`my-2 ${
                        darkMode ? "border-gray-700" : "border-gray-100"
                      }`}
                    />
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
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all hover:shadow-lg font-medium text-sm"
              >
                <FaUser size={14} />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            )}

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <button
                onClick={handleClick}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-all`}
              >
                {click ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div
            className={`md:hidden py-3 border-t ${
              darkMode ? "border-gray-800" : "border-gray-100"
            } animate-fade-in-down`}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className={`w-full px-4 py-2 pr-10 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-200"
                } border-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                autoFocus
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } hover:text-primary`}
              >
                <FaSearch />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {click && (
        <div
          className={`lg:hidden ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-100"
          } border-t shadow-lg animate-fade-in-down`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {[
              { to: "/", label: "Início" },
              { to: "/products", label: "Produtos", icon: FaBox },
              { to: "/categories", label: "Categorias", icon: FaTh },
              { to: "/about", label: "Sobre" },
              { to: "/contact", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleClick}
                className={`flex items-center ${
                  darkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                } px-3 py-3 rounded-lg text-base font-medium transition-all`}
              >
                {link.icon && <link.icon className="mr-2" />}
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <hr
                  className={`my-2 ${
                    darkMode ? "border-gray-800" : "border-gray-100"
                  }`}
                />
                <Link
                  to="/profile"
                  onClick={handleClick}
                  className={`flex items-center ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-50"
                  } px-3 py-3 rounded-lg text-base font-medium transition-all`}
                >
                  <FaUser className="mr-2" />
                  Meu Perfil
                </Link>
                <Link
                  to="/orders"
                  onClick={handleClick}
                  className={`flex items-center ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-50"
                  } px-3 py-3 rounded-lg text-base font-medium transition-all`}
                >
                  <FaBox className="mr-2" />
                  Meus Pedidos
                </Link>
                <Link
                  to="/wishlist"
                  onClick={handleClick}
                  className={`flex items-center ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-50"
                  } px-3 py-3 rounded-lg text-base font-medium transition-all`}
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
                <hr
                  className={`my-2 ${
                    darkMode ? "border-gray-800" : "border-gray-100"
                  }`}
                />
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
