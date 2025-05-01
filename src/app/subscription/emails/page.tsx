// src/app/subscription/emails/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function SubscriptionEmailsPage() {
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => setSubs(data.subscriptions));
  }, []);
  return (
    <div>
      <h1>Emails des abonnés</h1>
      <ul>
        {subs.map(sub => <li key={sub.id}>{sub.email}</li>)}
      </ul>
    </div>
  );
}