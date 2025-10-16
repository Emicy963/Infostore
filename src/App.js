import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Lazy loading dos componentes para melhor performance
const Home = lazy(() => import('./components/pages/Home'));
const ProductList = lazy(() => import('./components/pages/ProductList'));
const ProductDetail = lazy(() => import('./components/pages/ProductDetail'));
const CategoryList = lazy(() => import('./components/pages/CategoryList'));
const CategoryDetail = lazy(() => import('./components/pages/CategoryDetail'));
const Cart = lazy(() => import('./components/pages/Cart'));
const Checkout = lazy(() => import('./components/pages/Checkout'));
const Wishlist = lazy(() => import('./components/pages/Wishlist'));
const Profile = lazy(() => import('./components/pages/Profile'));
const Orders = lazy(() => import('./components/pages/Orders'));
const Search = lazy(() => import('./components/pages/Search'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Navbar />
              <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categories/:slug" element={<CategoryDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;