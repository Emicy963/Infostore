import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaTruck, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Fique por Dentro das Novidades!
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Receba ofertas exclusivas e lançamentos diretamente no WhatsApp
            </p>
            <a 
              href="https://wa.me/244926625296?text=Olá! Quero receber as novidades da Infostore."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FaWhatsapp size={20} />
              Receber Novidades
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-3 py-1 rounded-lg font-bold text-xl mr-2">
                  IS
                </div>
                <span className="text-2xl font-bold text-white">Infostore</span>
              </div>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Vendas e Soluções Tecnológicas em Angola. Democratizando o acesso à tecnologia com qualidade e preços acessíveis.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/profile.php?id=100088151083799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a 
                  href="https://www.instagram.com/infostore_tecnology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-pink-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://wa.me/244926625296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-green-600 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all mr-2"></span>
                    Início
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/products" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all mr-2"></span>
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/categories" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all mr-2"></span>
                    Categorias
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all mr-2"></span>
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all mr-2"></span>
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Nossos Serviços</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  Venda de Computadores
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  Suporte Técnico Especializado
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  Instalação de Software
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  Entrega Rápida em Luanda
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  Garantia em Todos os Produtos
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
              <div className="space-y-4">
                <a 
                  href="tel:+244926625296"
                  className="flex items-start text-gray-400 hover:text-white transition-colors group"
                >
                  <FaPhone className="mr-3 mt-1 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-sm">+244 926 625 296</p>
                  </div>
                </a>
                <a 
                  href="mailto:info@infostore.ao"
                  className="flex items-start text-gray-400 hover:text-white transition-colors group"
                >
                  <FaEnvelope className="mr-3 mt-1 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm">info@infostore.ao</p>
                  </div>
                </a>
                <div className="flex items-start text-gray-400">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">Localização</p>
                    <p className="text-sm">Luanda, Angola</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FaShieldAlt className="text-primary text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Compra Segura</h4>
                <p className="text-sm text-gray-400">Garantia em todos produtos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FaTruck className="text-primary text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Entrega Rápida</h4>
                <p className="text-sm text-gray-400">Em toda região de Luanda</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FaClock className="text-primary text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Suporte 24/7</h4>
                <p className="text-sm text-gray-400">Atendimento sempre disponível</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Infostore. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;