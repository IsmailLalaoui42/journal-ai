# Journal en ligne pour l'ENSA de Béni Mellal

- Le projet a pour ambition de concevoir et de développer une plateforme web innovante pour l'ENSA Béni Mellal, dédiée à la centralisation et à la diffusion des actualités, événements et activités de l'école.

- L'objectif principal est d'améliorer la communication interne et externe en offrant un espace unique, organisé et accessible.

## Fonctionnalités :

- Page d'accueil avec les dernières actualités et événements.
- Option d'abonnement pour recevoir des notifications par e-mail ou SMS.
- Espace pour les annonces officielles de l'administration.
- Fonction de recherche pour trouver des articles ou événements spécifiques.
- Catégories pour organiser les informations (ex : académique, culturel, sportif).

## Tech Stack

- *Framework* : Next.js 15
- *Langage* : TypeScript
- *Styling* : Tailwind CSS
- *Authentification* : Clerk
- *Base de données* : MongoDB
- *Déploiement* : Cloudflare Workers via Wrangler

## Installation :

#### Prérequis

- Node.js ≥ 18
- [pnpm](https://pnpm.io) ≥ v10
- Un compte [Clerk.dev](https://clerk.dev/) pour la gestion des utilisateurs
- Une base de données MongoDB (par exemple, MongoDB Atlas)
- (Optionnel) Un compte Cloudflare et [Wrangler](https://developers.cloudflare.com/workers/wrangler/) pour le déploiement

#### Étapes

1. *Cloner le dépôt :*

   ```bash
   git clone https://github.com/IsmailLalaoui42/journal-ai.git
   cd journal-ai
   cd .\ensa_journal_export\
   npm run dev
