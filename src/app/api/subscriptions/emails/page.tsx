// src/app/subscription/emails/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function SubscriptionEmailsPage() {
  const [subs, setSubs] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(async res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => setSubs(data.subscriptions || []))
      .catch(() => setError('Erreur lors du chargement des emails'));
  }, []);

  return (
    <div>
      <h1>Emails des abonnés</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <ul>
        {subs.map((sub: any) => <li key={sub.id}>{sub.email}</li>)}
      </ul>
    </div>
  );
}