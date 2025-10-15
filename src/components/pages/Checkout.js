import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaMoneyBillWave, FaLock, FaCheckCircle, FaArrowLeft, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import api from "../../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = useCart();
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Luanda',
    province: 'Luanda',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
    fetchCart();
  }, [user, navigate, fetchCart]);

  const calculateTotal = () => {
    if (!cart || !cart.cartitems) return 0;
    return cart.cartitems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (!paymentMethod) {
      setErrors({ paymentMethod: 'Selecione um método de pagamento' });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmitOrder = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    try {
      const orderData = {
        shipping_address: {
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          province: formData.province
        },
        payment_method: paymentMethod,
        notes: formData.notes
      };

      const response = await api.post('/orders/create/', orderData);
      setOrderId(response.data.id);
      setOrderSuccess(true);
      
      // Limpar carrinho local
      fetchCart();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      setErrors({ submit: 'Erro ao processar pedido. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: 'multicaixa',
      name: 'Multicaixa Express',
      icon: FaCreditCard,
      description: 'Pagamento via Multicaixa Express'
    },
    {
      id: 'transferencia',
      name: 'Transferência Bancária',
      icon: FaMoneyBillWave,
      description: 'Enviaremos os dados bancários por email'
    },
    {
      id: 'dinheiro',
      name: 'Dinheiro na Entrega',
      icon: FaMoneyBillWave,
      description: 'Pague em dinheiro ao receber'
    }
  ];

  if (!cart || !cart.cartitems || cart.cartitems.length === 0) {
    return (
      <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Carrinho Vazio
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Adicione produtos ao carrinho para continuar com o pagamento.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all"
            >
              Ver Produtos
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-6">
                <FaCheckCircle className="text-6xl text-green-500" />
              </div>
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Pedido Realizado com Sucesso!
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Seu pedido <span className="font-bold text-primary">#{orderId}</span> foi recebido e está sendo processado.
            </p>
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg p-6 mb-6`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Próximos Passos:
              </h3>
              <ul className={`text-left ${darkMode ? 'text-gray-400' : 'text-gray-600'} space-y-2`}>
                <li>✓ Você receberá um email com os detalhes do pedido</li>
                {paymentMethod === 'transferencia' && (
                  <li>✓ Enviaremos os dados bancários para transferência</li>
                )}
                {paymentMethod === 'dinheiro' && (
                  <li>✓ Prepare o valor exato para pagamento na entrega</li>
                )}
                <li>✓ Entraremos em contato para confirmar a entrega</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/orders')}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all"
              >
                Ver Meus Pedidos
              </button>
              <button
                onClick={() => navigate('/products')}
                className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-6 py-3 rounded-lg font-semibold transition-all`}
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/cart')}
            className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-primary'} transition-colors`}
          >
            <FaArrowLeft className="mr-2" />
            Voltar ao Carrinho
          </button>
        </div>

        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
          Finalizar Compra
        </h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((s, index) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? 'bg-primary text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-gray-200 text-gray-500'
                  } transition-all`}>
                    {s}
                  </div>
                  <span className={`text-xs mt-2 ${
                    step >= s
                      ? 'text-primary font-semibold'
                      : darkMode
                      ? 'text-gray-500'
                      : 'text-gray-400'
                  }`}>
                    {s === 1 ? 'Endereço' : s === 2 ? 'Pagamento' : 'Revisão'}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`w-20 h-1 mx-4 ${
                    step > s
                      ? 'bg-primary'
                      : darkMode
                      ? 'bg-gray-700'
                      : 'bg-gray-200'
                  } transition-all`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              {/* Step 1: Shipping Info */}
              {step === 1 && (
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                    Informações de Entrega
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg ${
                          darkMode
                            ? 'bg-gray-900 border-gray-700 text-white'
                            : 'bg-gray-50 border-gray-300'
                        } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                          errors.fullName ? 'border-red-500' : ''
                        }`}
                        placeholder="João Silva"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg ${
                            darkMode
                              ? 'bg-gray-900 border-gray-700 text-white'
                              : 'bg-gray-50 border-gray-300'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                          placeholder="joao@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium flex items-center`}>
                          <FaPhone className="mr-2 text-primary" />
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg ${
                            darkMode
                              ? 'bg-gray-900 border-gray-700 text-white'
                              : 'bg-gray-50 border-gray-300'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                            errors.phone ? 'border-red-500' : ''
                          }`}
                          placeholder="+244 900 000 000"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium flex items-center`}>
                        <FaMapMarkerAlt className="mr-2 text-primary" />
                        Endereço Completo *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg ${
                          darkMode
                            ? 'bg-gray-900 border-gray-700 text-white'
                            : 'bg-gray-50 border-gray-300'
                        } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                          errors.address ? 'border-red-500' : ''
                        }`}
                        placeholder="Rua, número, bairro"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>
                          Cidade *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg ${
                            darkMode
                              ? 'bg-gray-900 border-gray-700 text-white'
                              : 'bg-gray-50 border-gray-300'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                            errors.city ? 'border-red-500' : ''
                          }`}
                          placeholder="Luanda"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>
                          Província
                        </label>
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg ${
                            darkMode
                              ? 'bg-gray-900 border-gray-700 text-white'
                              : 'bg-gray-50 border-gray-300'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                        >
                          <option>Luanda</option>
                          <option>Bengo</option>
                          <option>Benguela</option>
                          <option>Huambo</option>
                          <option>Huíla</option>
                          <option>Cabinda</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>
                        Observações (opcional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full px-4 py-3 rounded-lg ${
                          darkMode
                            ? 'bg-gray-900 border-gray-700 text-white'
                            : 'bg-gray-50 border-gray-300'
                        } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                        placeholder="Informações adicionais sobre a entrega..."
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                  >
                    Continuar para Pagamento
                  </button>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                    Método de Pagamento
                  </h2>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : darkMode
                            ? 'border-gray-700 hover:border-gray-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                            paymentMethod === method.id
                              ? 'border-primary'
                              : darkMode
                              ? 'border-gray-600'
                              : 'border-gray-300'
                          }`}>
                            {paymentMethod === method.id && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <method.icon className={`mr-2 ${paymentMethod === method.id ? 'text-primary' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {method.name}
                              </h3>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} py-3 rounded-lg font-semibold transition-all`}
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                    >
                      Revisar Pedido
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                    Revisar Pedido
                  </h2>

                  {/* Shipping Info Review */}
                  <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Endereço de Entrega
                      </h3>
                      <button
                        onClick={() => setStep(1)}
                        className="text-primary hover:underline text-sm"
                      >
                        Editar
                      </button>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <p className="font-medium">{formData.fullName}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.province}</p>
                      <p>{formData.email}</p>
                    </div>
                  </div>

                  {/* Payment Method Review */}
                  <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Método de Pagamento
                      </h3>
                      <button
                        onClick={() => setStep(2)}
                        className="text-primary hover:underline text-sm"
                      >
                        Editar
                      </button>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {paymentMethods.find(m => m.id === paymentMethod)?.name}
                    </p>
                  </div>

                  {/* Items Review */}
                  <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Produtos ({cart.cartitems.length})
                    </h3>
                    <div className="space-y-3">
                      {cart.cartitems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {item.product.name}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Qtd: {item.quantity}
                            </p>
                          </div>
                          <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            {(item.product.price * item.quantity).toLocaleString()} Kz
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                      {errors.submit}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} py-3 rounded-lg font-semibold transition-all`}
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleSubmitOrder}
                      disabled={loading}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Processando...</span>
                        </>
                      ) : (
                        <>
                          <FaLock />
                          <span>Confirmar Pedido</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 sticky top-20`}>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Resumo do Pedido
              </h3>
              
              <div className={`space-y-3 mb-4 pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                  <span className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
                    {calculateTotal().toLocaleString()} Kz
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Entrega</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Total
                </span>
                <span className="text-2xl font-bold text-primary">
                  {calculateTotal().toLocaleString()} Kz
                </span>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
                <div className="flex items-start text-sm">
                  <FaLock className="text-primary mr-2 mt-0.5" />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Suas informações estão seguras e protegidas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;