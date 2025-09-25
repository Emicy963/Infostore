import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

const Profile = () => {
    const { user, loading } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
        setFormData({
            name: user.name || "",
            email: user.email || ""
        });
        setProfile(user);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        
        try {
        const response = await api.put("/api/profile/", formData);
        setProfile(response.data);
        setIsEditing(false);
        setMessage("Perfil atualizado com sucesso!");
        } catch (err) {
        setError("Erro ao atualizar perfil. Tente novamente.");
        console.error(err);
        }
    };

    if (loading) {
        return (
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando perfil...</p>
            </div>
        </div>
        );
    }

    return (
        <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-primary text-white p-6">
                <h1 className="text-2xl font-bold">Meu Perfil</h1>
            </div>
            
            <div className="p-6">
                {message && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                    {message}
                </div>
                )}
                
                {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                    {error}
                </div>
                )}
                
                {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Nome</label>
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-4">
                    <button
                        type="submit"
                        className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300"
                    >
                        Salvar Alterações
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                    >
                        Cancelar
                    </button>
                    </div>
                </form>
                ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nome</h3>
                        <p className="text-gray-600">{profile?.name || 'Não informado'}</p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                        <p className="text-gray-600">{profile?.email}</p>
                    </div>
                    </div>
                    
                    <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300"
                    >
                    Editar Perfil
                    </button>
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;