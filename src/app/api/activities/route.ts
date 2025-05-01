import { NextRequest, NextResponse } from 'next/server';

// Interface pour les activités
interface Activity {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  imageUrl: string;
  location: string;
  category: string;
  organizer: string;
}

// Données simulées pour les activités
const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Journée d\'intégration 2025',
    description: 'Journée d\'accueil et d\'intégration pour les nouveaux étudiants de l\'ENSA Beni Mellal.',
    content: `La journée d'intégration 2025 de l'ENSA Beni Mellal aura lieu le 15 septembre 2025. Cet événement est spécialement conçu pour accueillir les nouveaux étudiants et faciliter leur intégration dans la vie universitaire.

Au programme de cette journée :
- Cérémonie d'accueil par la direction de l'école
- Présentation des différentes filières et du corps enseignant
- Visite guidée du campus et des installations
- Activités de team building et jeux de connaissance
- Déjeuner convivial
- Présentation des clubs et associations étudiantes
- Spectacle culturel

Cette journée est obligatoire pour tous les nouveaux étudiants. Elle représente une excellente opportunité pour faire connaissance avec vos camarades de promotion et vous familiariser avec votre nouvel environnement d'études.`,
    date: '15 septembre 2025',
    imageUrl: '/images/school_building.jpg',
    location: 'Campus ENSA Beni Mellal',
    category: 'Événement',
    organizer: 'Administration ENSA'
  },
  {
    id: '2',
    title: 'Hackathon Innovation',
    description: 'Un marathon de programmation de 48 heures pour développer des solutions innovantes aux défis locaux.',
    content: `L'ENSA Beni Mellal organise son Hackathon Innovation annuel du 10 au 12 mai 2025. Cet événement de 48 heures non-stop rassemblera des étudiants passionnés de programmation et d'innovation pour développer des solutions technologiques répondant à des défis concrets.

Cette année, le thème du hackathon est "Solutions numériques pour le développement durable". Les participants travailleront en équipes de 3 à 5 personnes pour concevoir et prototyper des applications ou services innovants dans les domaines suivants :
- Gestion intelligente des ressources en eau
- Optimisation énergétique
- Agriculture de précision
- Mobilité durable
- Économie circulaire

Des mentors issus du monde académique et professionnel seront présents tout au long de l'événement pour guider et conseiller les équipes. Un jury d'experts évaluera les projets selon leur innovation, leur faisabilité technique et leur impact potentiel.

À la clé pour les gagnants : des prix attractifs, des opportunités de stage et la possibilité de poursuivre le développement de leur projet avec le soutien de l'incubateur de l'école.

L'inscription est ouverte à tous les étudiants de l'ENSA Beni Mellal, quelle que soit leur filière. Les places sont limitées, alors ne tardez pas à former votre équipe et à vous inscrire !`,
    date: '10-12 mai 2025',
    imageUrl: '/images/school_building.jpg',
    location: 'Laboratoire d\'informatique',
    category: 'Académique',
    organizer: 'Club Informatique'
  },
  {
    id: '3',
    title: 'Conférence sur l\'intelligence artificielle',
    description: 'Une série de conférences sur les avancées récentes en intelligence artificielle et leurs applications.',
    content: `L'ENSA Beni Mellal a le plaisir d'accueillir une série de conférences sur l'intelligence artificielle le 5 mai 2025. Ces conférences seront animées par des experts nationaux et internationaux reconnus dans le domaine.

Programme de la journée :
- 9h00 - 10h30 : "L'IA générative : principes, avancées et défis" par Dr. Rachid Benmokhtar (Université Mohammed VI Polytechnique)
- 10h45 - 12h15 : "Applications de l'IA dans l'industrie 4.0" par Prof. Maria Rodriguez (Université de Barcelone)
- 14h00 - 15h30 : "Éthique et IA : enjeux sociétaux et réglementaires" par Me. Karim Benjelloun (Avocat spécialisé en droit numérique)
- 15h45 - 17h15 : Table ronde "L'IA au Maroc : état des lieux et perspectives" avec la participation de représentants du ministère, d'entreprises et d'universités

Ces conférences s'adressent aux étudiants, enseignants-chercheurs et professionnels intéressés par l'intelligence artificielle. Elles offriront un panorama complet des dernières avancées dans ce domaine en pleine expansion et de leurs applications concrètes.

La participation est gratuite mais l'inscription est obligatoire en raison du nombre limité de places disponibles dans l'amphithéâtre.`,
    date: '5 mai 2025',
    imageUrl: '/images/school_building.jpg',
    location: 'Amphithéâtre principal',
    category: 'Académique',
    organizer: 'Département Informatique'
  },
  {
    id: '4',
    title: 'Tournoi sportif inter-filières',
    description: 'Compétition sportive entre les différentes filières de l\'ENSA Beni Mellal.',
    content: `Le tournoi sportif inter-filières de l'ENSA Beni Mellal se déroulera le 20 avril 2025. Cet événement annuel très attendu met en compétition les équipes représentant chaque filière de l'école dans différentes disciplines sportives.

Sports au programme :
- Football (équipes de 7 joueurs)
- Basketball (équipes de 5 joueurs)
- Volleyball (équipes mixtes de 6 joueurs)
- Tennis de table (tournoi individuel)
- Course de relais (équipes de 4 coureurs)

Chaque filière est encouragée à former ses équipes et à désigner un capitaine qui coordonnera la participation aux différentes épreuves. Des points seront attribués pour chaque compétition, et la filière totalisant le plus grand nombre de points sera déclarée championne du tournoi 2025.

Au-delà de l'aspect compétitif, cet événement vise à renforcer la cohésion entre les étudiants et à promouvoir les valeurs du sport : esprit d'équipe, fair-play et dépassement de soi.

La journée se clôturera par une cérémonie de remise des trophées suivie d'un barbecue convivial. Venez nombreux participer ou encourager vos équipes !`,
    date: '20 avril 2025',
    imageUrl: '/images/school_building.jpg',
    location: 'Terrain de sport',
    category: 'Sportif',
    organizer: 'Club Sportif'
  },
  {
    id: '5',
    title: 'Forum des entreprises',
    description: 'Rencontre entre étudiants et entreprises pour des opportunités de stages et d\'emploi.',
    content: `L'ENSA Beni Mellal organise son Forum des Entreprises annuel le 15 avril 2025. Cet événement majeur constitue une plateforme d'échange privilégiée entre les étudiants et les entreprises de la région et du pays.

Plus de 30 entreprises de différents secteurs (informatique, télécommunications, énergie, BTP, conseil, etc.) seront présentes pour :
- Présenter leurs activités et leurs besoins en compétences
- Proposer des offres de stages et d'emploi
- Échanger avec les étudiants sur les perspectives de carrière
- Recueillir des candidatures

Pour les étudiants, c'est une opportunité unique de :
- Découvrir le tissu économique régional et national
- Rencontrer directement des recruteurs potentiels
- Mieux comprendre les attentes du marché du travail
- Décrocher un stage ou un premier emploi

Des ateliers de préparation (rédaction de CV, techniques d'entretien) seront organisés la semaine précédant le forum pour aider les étudiants à maximiser leurs chances.

Nous recommandons à tous les participants de venir avec plusieurs exemplaires de leur CV et de se renseigner au préalable sur les entreprises présentes.`,
    date: '15 avril 2025',
    imageUrl: '/images/school_building.jpg',
    location: 'Hall principal',
    category: 'Professionnel',
    organizer: 'Service des Relations Entreprises'
  },
  {
    id: '6',
    title: 'Atelier de développement durable',
    description: 'Sensibilisation et formation aux enjeux du développement durable dans l\'ingénierie.',
    content: `L'ENSA Beni Mellal organise un atelier de développement durable le 10 avril 2025. Cet atelier vise à sensibiliser les futurs ingénieurs aux enjeux environnementaux et à les former aux pratiques d'ingénierie responsable.

Programme de l'atelier :
- Introduction aux principes du développement durable
- Impact environnemental des projets d'ingénierie
- Méthodes d'évaluation du cycle de vie des produits
- Éco-conception et innovation responsable
- Études de cas et retours d'expérience
- Travaux pratiques en groupes

L'atelier sera animé par Prof. Nadia Lahlou, experte en génie environnemental, et M. Youssef Alami, ingénieur en développement durable chez EcoSolutions Maroc.

Cette formation s'inscrit dans la volonté de l'ENSA Beni Mellal d'intégrer les principes du développement durable dans tous ses cursus. Les compétences acquises lors de cet atelier seront de plus en plus valorisées sur le marché du travail, où la transition écologique devient un enjeu majeur pour toutes les entreprises.

L'atelier est ouvert à tous les étudiants de l'école, quelle que soit leur filière. Une attestation de participation sera délivrée à l'issue de la formation.`,
    date: '10 avril 2025',
    imageUrl: '/images/school_building.jpg',
    location: 'Salle de conférence',
    category: 'Formation',
    organizer: 'Club Environnement'
  }
];

// GET /api/activities - Récupérer toutes les activités ou filtrer par catégorie
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filteredActivities = [...mockActivities];
    
    // Filtrer par catégorie si spécifiée
    if (category && category !== 'all') {
      filteredActivities = filteredActivities.filter(activity => activity.category === category);
    }
    
    // Filtrer par recherche si spécifiée
    if (search) {
      const searchLower = search.toLowerCase();
      filteredActivities = filteredActivities.filter(activity => 
        activity.title.toLowerCase().includes(searchLower) || 
        activity.description.toLowerCase().includes(searchLower) ||
        activity.content.toLowerCase().includes(searchLower) ||
        activity.location.toLowerCase().includes(searchLower)
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedActivities = filteredActivities.slice(startIndex, endIndex);
    
    // Préparer la réponse avec pagination
    const response = {
      activities: paginatedActivities.map(activity => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        date: activity.date,
        imageUrl: activity.imageUrl,
        location: activity.location,
        category: activity.category,
        organizer: activity.organizer
      })),
      pagination: {
        total: filteredActivities.length,
        page,
        limit,
        totalPages: Math.ceil(filteredActivities.length / limit)
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Erreur lors de la récupération des activités:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des activités' },
      { status: 500 }
    );
  }
}

// Fonction pour récupérer une activité par son ID
export async function getActivityById(id: string) {
  const activity = mockActivities.find(item => item.id === id);
  
  if (!activity) {
    return null;
  }
  
  return activity;
}
