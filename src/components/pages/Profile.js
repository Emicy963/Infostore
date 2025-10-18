import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCamera, FaShieldAlt, FaKey } from "react-icons/fa";
import api from "../../services/api";

const Profile = () => {
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Angola"
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "Angola"
      });
      setProfile(user);
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      const response = await api.put("/auth/profile/", formData);
      setProfile(response.data);
      setIsEditing(false);
      setMessage("Perfil atualizado com sucesso!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Erro ao atualizar perfil. Tente novamente.");
      console.error(err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    try {
      await api.post("/auth/change-password/", {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword
      });
      setMessage("Senha alterada com sucesso!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao alterar senha. Verifique sua senha atual.");
    }
  };

  if (loading) {
    return (
      <div className={`pt-16 pb-12 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Dados Pessoais', icon: FaUser },
    { id: 'security', label: 'Segurança', icon: FaShieldAlt }
  ];

  return (
    <div className={`pt-16 pb-12 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header com Avatar */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden mb-6`}>
          <div className="relative h-32 bg-gradient-to-r from-primary to-blue-600">
            <div className="absolute -bottom-16 left-8 flex items-end space-x-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-blue-600">
                      <span className="text-4xl text-white font-bold">
                        {profile?.name?.charAt(0)?.toUpperCase() || profile?.email?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition-colors shadow-lg">
                  <FaCamera size={16} />
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarChange}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="pt-20 px-8 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {profile?.name || 'Usuário'}
                </h1>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center mt-1`}>
                  <FaEnvelope className="mr-2" size={14} />
                  {profile?.email}
                </p>
              </div>
              {!isEditing && activeTab === 'personal' && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 md:mt-0 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Editar Perfil</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center animate-fade-in-down">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center animate-fade-in-down">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsEditing(false);
                }}
                className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? `${darkMode ? 'text-primary bg-gray-900' : 'text-primary bg-blue-50'} border-b-2 border-primary`
                    : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <>
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium flex items-center`}>
                          <FaUser className="mr-2 text-primary" />
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg transition-all ${
                            darkMode 
                              ? 'bg-gray-900 border-gray-700 text-white focus:border-primary' 
                              : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      
                      <div>
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium flex items-center`}>
                          <FaEnvelope className="mr-2 text-primary" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg transition-all ${
                            darkMode 
                              ? 'bg-gray-900 border-gray-700 text-white focus:border-primary' 
                              : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                          placeholder="seu@email.com"
                        />
                      </div>

                      <div>
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium flex items-center`}>
                          <FaPhone className="mr-2 text-primary" />
                          Telefone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg transition-all ${
                            darkMode 
                              ? 'bg-gray-900 border-gray-700 text-white focus:border-primary' 
                              : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                          placeholder="+244 900 000 000"
                        />
                      </div>

                      <div>
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium flex items-center`}>
                          <FaMapMarkerAlt className="mr-2 text-primary" />
                          Cidade
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg transition-all ${
                            darkMode 
                              ? 'bg-gray-900 border-gray-700 text-white focus:border-primary' 
                              : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                          placeholder="Luanda"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium flex items-center`}>
                          <FaMapMarkerAlt className="mr-2 text-primary" />
                          Endereço
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg transition-all ${
                            darkMode 
                              ? 'bg-gray-900 border-gray-700 text-white focus:border-primary' 
                              : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary'
                          } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                          placeholder="Rua, número, bairro"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-4">
                      <button
                        type="submit"
                        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                      >
                        <FaSave />
                        <span>Salvar Alterações</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2`}
                      >
                        <FaTimes />
                        <span>Cancelar</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { icon: FaUser, label: 'Nome', value: profile?.name || 'Não informado' },
                        { icon: FaEnvelope, label: 'Email', value: profile?.email },
                        { icon: FaPhone, label: 'Telefone', value: profile?.phone || 'Não informado' },
                        { icon: FaMapMarkerAlt, label: 'Cidade', value: profile?.city || 'Não informado' }
                      ].map((item, index) => (
                        <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary/10 p-3 rounded-lg">
                              <item.icon className="text-primary text-lg" />
                            </div>
                            <div>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</p>
                              <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{item.value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <FaMapMarkerAlt className="text-primary text-lg" />
                        </div>
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Endereço Completo</p>
                          <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            {profile?.address || 'Não informado'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="max-w-2xl">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`}>
                  <FaKey className="mr-2 text-primary" />
                  Alterar Senha
                </h3>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 rounded-lg transition-all ${
                        darkMode 
                          ? 'bg-gray-900 border-gray-700 text-white focus:border-primary' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary'
                      } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                      placeholder="Digite sua senha atual"
                      required
                    />
                  </div>

                  <div>
                    <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 rounded-lg transition-all ${
                        darkMode 
                          ? 'bg-gray-900 border-gray-700 text-white focus:border-primary' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary'
                      } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                      placeholder="Digite sua nova senha"
                      required
                    />
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      Mínimo de 8 caracteres
                    </p>
                  </div>

                  <div>
                    <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-medium`}>
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 rounded-lg transition-all ${
                        darkMode 
                          ? 'bg-gray-900 border-gray-700 text-white focus:border-primary' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-primary'
                      } border-2 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                      placeholder="Confirme sua nova senha"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <FaSave />
                    <span>Alterar Senha</span>
                  </button>
                </form>

                <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-blue-50 border-blue-200'} border`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'} mb-2 flex items-center`}>
                    <FaShieldAlt className="mr-2 text-primary" />
                    Dicas de Segurança
                  </h4>
                  <ul className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                    <li>• Use uma senha forte com letras, números e símbolos</li>
                    <li>• Não compartilhe sua senha com ninguém</li>
                    <li>• Altere sua senha regularmente</li>
                    <li>• Use senhas diferentes para cada serviço</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;