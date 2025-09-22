import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary text-white px-3 py-1 rounded-lg font-bold text-xl mr-2">IS</div>
              <span className="text-2xl font-bold text-white">Infostore</span>
            </div>
            <p className="text-gray-400 mb-4">📲 Vendas e Soluções Tecnológicas</p>
            <p className="text-gray-400 text-sm">Democratizando o acesso à tecnologia em Angola com qualidade e preços acessíveis.</p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Produtos</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Categorias</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Sobre</Link></li>
            </ul>
          </div>
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Venda de Computadores</span></li>
              <li><span className="text-gray-400">Suporte Técnico</span></li>
              <li><span className="text-gray-400">Instalação de Software</span></li>
              <li><span className="text-gray-400">Entrega Rápida</span></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-2">
              <p className="text-gray-400 flex items-center">
                <i className="fas fa-phone mr-2"></i>
                +244 926 625 296
              </p>
              <p className="text-gray-400 flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                info@infostore.ao
              </p>
              <p className="text-gray-400 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Luanda, Angola
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; 2025 Infostore. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://www.facebook.com/profile.php?id=100088151083799" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/infostore_tecnology/" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/244926625296" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;