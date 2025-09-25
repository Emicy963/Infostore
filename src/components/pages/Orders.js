import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import api from "../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response = await api.get('/api/orders/');
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
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando pedidos...</p>
            </div>
        </div>
        );
    }

    return (
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
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
                            <p className="text-sm text-gray-600">Data do Pedido</p>
                            <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="font-medium">{order.total} Kz</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Método de Pagamento</p>
                            <p className="font-medium">{order.payment_method}</p>
                        </div>
                        </div>
                        
                        <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Itens do Pedido:</h4>
                        <div className="space-y-2">
                            {order.items.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded mr-3" />
                                <div className="flex-1">
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                                </div>
                                <p className="font-medium">{item.price * item.quantity} Kz</p>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum pedido encontrado</h3>
                    <p className="text-gray-500 mb-6">Você ainda não fez nenhum pedido.</p>
                    <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 inline-block">
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