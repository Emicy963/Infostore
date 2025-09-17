import React, { useState} from "react";
import { FaSearch, FaShoppingCart, FaHeart, FaTimes, FaBars } from "react-icons/fa"
import { Link } from "react-router-dom";
import { userCart } from "../../context/CartContext";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const { cart } = userCart();

    const handleClick = () => setClick(!click);

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center animate-fade-in-left">
                        <div className="hidden bg-primary text-white px-3 py-1 rounded-lg font-bold text-xl">IS</div>
                        <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-100">Início</Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-100">Produtos</Link>
                        <Link to="/categories" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-100">Categorias</Link>
                        <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-100">Sobre</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-100">Contato</Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/seach" className="text-gray-700 hover:text-primary transition-colors">
                        <FaSearch />
                    </Link>
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
                    <div className="md:hidden">
                        <button onClick={handleClick} className="text-gray-700 hover:text-primary transition-colors">
                            {click ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            {click && (
                <div className="md:hidden bg-white/90 backdrop-blur-md border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Início</Link>
                        <Link to="/products" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Produtos</Link>
                        <Link to="/categories" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Categorias</Link>
                        <Link to="/about" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Sobre</Link>
                        <Link to="/contact" onClick={handleClick} className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium transition-all duration-300">Contato</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
