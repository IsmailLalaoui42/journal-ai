import { useState } from 'react';

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notificationType, setNotificationType] = useState<string[]>(['email']);
  const [categories, setCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleCategoryChange = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleNotificationTypeChange = (type: string) => {
    if (notificationType.includes(type)) {
      setNotificationType(notificationType.filter(t => t !== type));
    } else {
      setNotificationType([...notificationType, type]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (notificationType.includes('email') && !email) {
      setMessage({ text: 'Veuillez fournir une adresse email pour les notifications par email.', type: 'error' });
      return;
    }
    
    if (notificationType.includes('sms') && !phone) {
      setMessage({ text: 'Veuillez fournir un numéro de téléphone pour les notifications par SMS.', type: 'error' });
      return;
    }
    
    if (categories.length === 0) {
      setMessage({ text: 'Veuillez sélectionner au moins une catégorie.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulation d'une requête API (à remplacer par une vraie requête)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ text: 'Abonnement réussi ! Vous recevrez désormais des notifications pour les catégories sélectionnées.', type: 'success' });
      // Réinitialiser le formulaire après soumission réussie
      setEmail('');
      setPhone('');
      setCategories([]);
      setNotificationType(['email']);
    } catch (error) {
      setMessage({ text: 'Une erreur est survenue. Veuillez réessayer plus tard.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Abonnez-vous aux notifications</h2>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="votre.email@exemple.com"
            />
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+212 6XX XX XX XX"
            />
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Catégories d'intérêt</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={categories.includes('academique')}
                onChange={() => handleCategoryChange('academique')}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">Académique</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={categories.includes('culturel')}
                onChange={() => handleCategoryChange('culturel')}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">Culturel</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={categories.includes('sportif')}
                onChange={() => handleCategoryChange('sportif')}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">Sportif</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={categories.includes('annonces')}
                onChange={() => handleCategoryChange('annonces')}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <span className="ml-2 text-gray-700">Annonces Officielles</span>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg transition ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Traitement en cours...' : 'S\'abonner'}
        </button>
      </form>
    </div>
  );
}
