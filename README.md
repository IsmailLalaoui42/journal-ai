
📰 ENSA Journal – Plateforme d'Actualités pour l'ENSA Béni Mellal

Une plateforme web moderne pour centraliser et diffuser les actualités, événements et annonces officielles de l’ENSA Béni Mellal. Le projet met l’accent sur l’amélioration de la communication interne et externe à travers une interface intuitive, réactive et organisée.

------------------------------------------------------------
🚀 Fonctionnalités

- Page d’accueil dynamique avec les dernières actualités et événements
- Système d’abonnement aux notifications (email / SMS via Clerk)
- Annonces officielles accessibles aux étudiants & personnels
- Recherche avancée d’articles ou événements
- Catégorisation des contenus : académique, culturel, sportif
- Thème clair/sombre avec next-themes
- Graphiques interactifs avec recharts
- Calendrier d’événements (react-day-picker)

------------------------------------------------------------
🧪 Stack Technique

- Next.js 15 : Framework React moderne fullstack
- TypeScript : Typage statique pour robustesse et lisibilité
- Tailwind CSS : Styling rapide et responsive
- Clerk : Authentification, gestion des utilisateurs
- MongoDB : Base de données NoSQL
- Cloudflare Workers : Déploiement serverless
- Zod : Validation des schémas
- Radix UI : Composants UI accessibles
- Lucide-react : Icônes modernes
- Wrangler : Déploiement Cloudflare
- cmdk : UX fluide (palette de commandes)
- react-hook-form : Gestion de formulaires
- Sonner : Notifications toast
- embla-carousel-react : Carrousel performant

------------------------------------------------------------
📦 Installation

⚙️ Prérequis

- Node.js ≥ 18
- npm
- Un compte Clerk.dev
- Une base MongoDB (ex : MongoDB Atlas)
- (Optionnel) Un compte Cloudflare + Wrangler CLI

🔧 Étapes de développement local

git clone https://github.com/IsmailLalaoui42/journal-ai.git
cd journal-ai/ensa_journal_export
npm install
npm run dev

------------------------------------------------------------
🧪 Scripts Utiles

- npm run dev : Lancer le serveur Next.js en développement
- npm run build : Construire l’application pour la prod
- npm start : Démarrer en production
- npm run lint : Linter le code
- npm run build:worker : Build pour Cloudflare Worker
- npm run preview : Tester localement via Wrangler
- npm run cf-typegen : Générer types TypeScript pour Cloudflare Workers

------------------------------------------------------------
🌍 Déploiement

1. Créer un projet sur Cloudflare
2. Lier à Wrangler avec wrangler init
3. Configurer wrangler.toml si besoin
4. Déploiement :

npm run build:worker
npm run preview        # Tester localement
npx wrangler publish   # Déploiement Cloudflare

------------------------------------------------------------
📁 Structure du Projet

ensa_journal_export/
├── app/               # Pages Next.js
├── components/        # UI Radix & composants custom
├── lib/               # Utils, validation, config
├── styles/            # Styles Tailwind
├── worker/            # Code déployé sur Cloudflare Workers
└── public/            # Fichiers statiques

------------------------------------------------------------
🧑‍💻 Contribuer

1. Fork le repo
2. Créer une branche : git checkout -b feature/ma-fonctionnalite
3. Commit : git commit -m "Ajout d'une nouvelle fonctionnalité"
4. Push : git push origin feature/ma-fonctionnalite
5. Ouvre une Pull Request

------------------------------------------------------------
📜 Licence

Ce projet est open-source sous licence MIT.

------------------------------------------------------------
✨ Auteur

Développé par Ismail Lalaoui Rachidi : https://github.com/IsmailLalaoui42

------------------------------------------------------------
📸 Captures d’écran (à venir)

Ajoute des images de l’interface pour une meilleure présentation sur GitHub
