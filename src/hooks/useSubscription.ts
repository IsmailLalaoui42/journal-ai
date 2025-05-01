import { useState, useEffect } from 'react';

// Hook personnalisé pour gérer les abonnements
export function useSubscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fonction pour s'abonner
  const subscribe = async (data: {
    email?: string;
    phone?: string;
    notificationTypes: string[];
    categories: string[];
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue lors de l\'abonnement');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour se désabonner
  const unsubscribe = async (subscriptionId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue lors du désabonnement');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour mettre à jour un abonnement
  const updateSubscription = async (
    subscriptionId: string,
    data: {
      email?: string;
      phone?: string;
      notificationTypes?: string[];
      categories?: string[];
    }
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue lors de la mise à jour de l\'abonnement');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    subscribe,
    unsubscribe,
    updateSubscription,
  };
}

// Hook pour récupérer les catégories disponibles
export function useCategories() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Dans une application réelle, nous ferions un appel API
        // Simulation de données pour l'exemple
        setCategories([
          { id: '1', name: 'Académique' },
          { id: '2', name: 'Culturel' },
          { id: '3', name: 'Sportif' },
          { id: '4', name: 'Annonces' },
        ]);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Hook pour valider les entrées du formulaire d'abonnement
export function useSubscriptionValidation() {
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

  return { validateSubscription };
}
