import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./components/pages/Home";
import ProductList from "./components/pages/ProductList";
import ProductDetail from "./components/pages/ProductDetail";
import CategoryList from "./components/pages/CategoryList";
import CategoryDetail from "./components/pages/CategoryDetail";
import Cart from "./components/pages/Cart";
import Wishlist from "./components/pages/Wishlist";
import Search from "./components/pages/Search";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/products" element={<ProductList />} />
                                <Route path="/products/:slug" element={<ProductDetail />} />
                                <Route path="/categories" element={<CategoryList />} />
                                <Route path="/categories/:slug" element={<CategoryDetail />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/wishlist" element={<Wishlist />} />
                                <Route path="/search" element={<Search />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
