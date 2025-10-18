import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaTruck, FaClock, FaArrowUp } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gradient-to-b from-gray-900 to-gray-950 text-white'}`}>
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
      <div className={`py-12 border-b ${darkMode ? 'border-gray-800' : 'border-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 flex items-center justify-center mr-3">
                    <img 
                        src="/logo.png" 
                        alt="Infostore" 
                        className="w-12 h-12 object-contain"
                    />
                </div>
                <div className="flex flex-col">
                    <img 
                        src="/infostore-text.png" 
                        alt="Infostore" 
                        className="h-7 object-contain"
                    />
                    <span className="text-xs text-blue-400 font-medium">Tech & Solutions</span>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-400'} mb-4 text-sm leading-relaxed`}>
                Vendas e Soluções Tecnológicas em Angola. Democratizando o acesso à tecnologia com qualidade e preços acessíveis.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/profile.php?id=100088151083799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${darkMode ? 'bg-gray-800 hover:bg-blue-600' : 'bg-gray-800 hover:bg-blue-600'} text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110`}
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a 
                  href="https://www.instagram.com/infostore_tecnology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${darkMode ? 'bg-gray-800 hover:bg-pink-600' : 'bg-gray-800 hover:bg-pink-600'} text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110`}
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://wa.me/244926625296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${darkMode ? 'bg-gray-800 hover:bg-green-600' : 'bg-gray-800 hover:bg-green-600'} text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110`}
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
                {[
                  { to: "/", label: "Início" },
                  { to: "/products", label: "Produtos" },
                  { to: "/categories", label: "Categorias" },
                  { to: "/about", label: "Sobre Nós" },
                  { to: "/contact", label: "Contacto" }
                ].map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors flex items-center group`}
                      onClick={scrollToTop}
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all mr-2"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Nossos Serviços</h3>
              <ul className="space-y-3">
                {[
                  "Venda de Computadores",
                  "Suporte Técnico Especializado",
                  "Instalação de Software",
                  "Entrega Rápida em Luanda",
                  "Garantia em Todos os Produtos"
                ].map((service, index) => (
                  <li key={index} className={`flex items-start ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                    <span className="text-primary mr-2 mt-1">✓</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
              <div className="space-y-4">
                <a 
                  href="tel:+244926625296"
                  className={`flex items-start ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors group`}
                >
                  <FaPhone className="mr-3 mt-1 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium text-white">Telefone</p>
                    <p className="text-sm">+244 926 625 296</p>
                  </div>
                </a>
                <a 
                  href="mailto:info@infostore.ao"
                  className={`flex items-start ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors group`}
                >
                  <FaEnvelope className="mr-3 mt-1 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-sm">info@infostore.ao</p>
                  </div>
                </a>
                <div className={`flex items-start ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  <FaMapMarkerAlt className="mr-3 mt-1 text-primary" />
                  <div>
                    <p className="font-medium text-white">Localização</p>
                    <p className="text-sm">Luanda, Angola</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className={`py-8 border-b ${darkMode ? 'border-gray-800' : 'border-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FaShieldAlt, title: "Compra Segura", desc: "Garantia em todos produtos" },
              { icon: FaTruck, title: "Entrega Rápida", desc: "Em toda região de Luanda" },
              { icon: FaClock, title: "Suporte 24/7", desc: "Atendimento sempre disponível" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <feature.icon className="text-primary text-2xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-sm text-center md:text-left`}>
              &copy; {new Date().getFullYear()} Infostore. Todos os direitos reservados.
            </p>
            <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
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

      {/* Back to Top Button
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:bg-primary-dark transition-all hover:scale-110 z-40"
        aria-label="Voltar ao topo"
      >
        <FaArrowUp />
      </button> */}
    </footer>
  );
};

export default Footer;