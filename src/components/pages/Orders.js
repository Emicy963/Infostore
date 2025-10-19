import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useTheme } from "../../contexts/ThemeContext";
import { FaBox } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar pedidos. Tente novamente.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carregando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          <div className="bg-primary text-white p-6">
            <h1 className="text-2xl font-bold">Meus Pedidos</h1>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Pedido #{order.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status === 'completed' ? 'Concluído' :
                         order.status === 'processing' ? 'Processando' :
                         order.status === 'cancelled' ? 'Cancelado' :
                         'Pendente'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Data do Pedido</p>
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {order.total} Kz
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Método de Pagamento</p>
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {order.payment_method}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Itens do Pedido:
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-12 h-12 object-cover rounded mr-3" 
                            />
                            <div className="flex-1">
                              <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {item.product.name}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Quantidade: {item.quantity}
                              </p>
                            </div>
                            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {item.price * item.quantity} Kz
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className={`mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  <FaBox className="mx-auto h-16 w-16" />
                </div>
                <h3 className={`text-lg font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Nenhum pedido encontrado
                </h3>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Você ainda não fez nenhum pedido.
                </p>
                <Link 
                  to="/products" 
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block"
                >
                  Explorar Produtos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;