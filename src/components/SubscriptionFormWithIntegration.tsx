"use client";

import { useState } from 'react';

interface SubscriptionFormWithIntegrationProps {
  // Props can be added here if needed
}

export default function SubscriptionFormWithIntegration() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notificationType, setNotificationType] = useState<string[]>(['email']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Simulated categories data
  const categories = [
    { id: '1', name: 'Académique' },
    { id: '2', name: 'Culturel' },
    { id: '3', name: 'Sportif' },
    { id: '4', name: 'Annonces' },
  ];

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleNotificationTypeChange = (type: string) => {
    if (notificationType.includes(type)) {
      setNotificationType(notificationType.filter(t => t !== type));
    } else {
      setNotificationType([...notificationType, type]);
    }
  };

  const validateSubscription = (data: {
    email?: string;
    phone?: string;
    notificationTypes: string[];
    categories: string[];
  }) => {
    const errors: Record<string, string> = {};

    // Valider les types de notification
    if (!data.notificationTypes || data.notificationTypes.length === 0) {
      errors.notificationTypes = 'Veuillez sélectionner au moins un type de notification';
    }

    // Valider l'email si notification par email
    if (data.notificationTypes?.includes('email')) {
      if (!data.email) {
        errors.email = 'L\'email est requis pour les notifications par email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Veuillez entrer une adresse email valide';
      }
    }

    // Valider le téléphone si notification par SMS
    if (data.notificationTypes?.includes('sms')) {
      if (!data.phone) {
        errors.phone = 'Le numéro de téléphone est requis pour les notifications par SMS';
      } else if (!/^\+?[0-9]{10,15}$/.test(data.phone.replace(/\s/g, ''))) {
        errors.phone = 'Veuillez entrer un numéro de téléphone valide';
      }
    }

    // Valider les catégories
    if (!data.categories || data.categories.length === 0) {
      errors.categories = 'Veuillez sélectionner au moins une catégorie';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation du formulaire
    const data = {
      email: email.trim(),
      phone: phone.trim(),
      notificationTypes: notificationType,
      categories: selectedCategories
    };
    
    const { isValid, errors } = validateSubscription(data);
    
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    setLoading(true);
    setError(null);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulation d'une réponse réussie
      setSuccess(true);
      
      // Réinitialiser le formulaire
      setEmail('');
      setPhone('');
      setSelectedCategories([]);
      setNotificationType(['email']);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'abonnement. Veuillez réessayer.');
      console.error('Erreur d\'abonnement:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Abonnez-vous aux notifications</h2>
      
      {error && (
        <div className="p-4 mb-6 rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-4 mb-6 rounded bg-green-100 text-green-700">
          Abonnement réussi ! Vous recevrez désormais des notifications pour les catégories sélectionnées.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Type de notifications</h3>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationType.includes('email')}
                onChange={() => handleNotificationTypeChange('email')}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">Email</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationType.includes('sms')}
                onChange={() => handleNotificationTypeChange('sms')}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">SMS</span>
            </label>
          </div>
          {formErrors.notificationTypes && (
            <p className="mt-1 text-sm text-red-600">{formErrors.notificationTypes}</p>
          )}
        </div>
        
        {notificationType.includes('email') && (
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="votre.email@exemple.com"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>
        )}
        
        {notificationType.includes('sms') && (
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+212 6XX XX XX XX"
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
            )}
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Catégories d'intérêt</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map(category => (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <span className="ml-2 text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
          {formErrors.categories && (
            <p className="mt-1 text-sm text-red-600">{formErrors.categories}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {loading ? 'Traitement en cours...' : 'S\'abonner'}
        </button>
      </form>
    </div>
  );
}
