"use client";

import { useState } from 'react';

interface LoginFormProps {
  onLogin: (apogeeNumber: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function LoginForm({ onLogin, isLoading = false, error = null }: LoginFormProps) {
  const [apogeeNumber, setApogeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{
    apogeeNumber?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const errors: {
      apogeeNumber?: string;
      password?: string;
    } = {};

    if (!apogeeNumber.trim()) {
      errors.apogeeNumber = 'Le numéro d\'apogée est requis';
    }

    if (!password.trim()) {
      errors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin(apogeeNumber, password);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="apogeeNumber" className="block text-gray-700 font-medium mb-2">
            Numéro d'apogée
          </label>
          <input
            type="text"
            id="apogeeNumber"
            value={apogeeNumber}
            onChange={(e) => setApogeeNumber(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.apogeeNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Entrez votre numéro d'apogée"
            disabled={isLoading}
          />
          {formErrors.apogeeNumber && (
            <p className="mt-1 text-sm text-red-600">{formErrors.apogeeNumber}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Entrez votre mot de passe"
            disabled={isLoading}
          />
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>
          
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Mot de passe oublié?
          </a>
        </div>
        
        <button
          type="submit"
          className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg transition ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Vous n'avez pas de compte? Contactez l'administration.
        </p>
      </div>
    </div>
  );
}
