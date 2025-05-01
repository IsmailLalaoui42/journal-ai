import { NextRequest, NextResponse } from 'next/server';

// Interface pour les annonces
interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  department: string;
  isImportant: boolean;
  expiryDate?: string;
}

// Données simulées pour les annonces
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Calendrier des examens finaux',
    content: 'Les examens finaux du semestre de printemps auront lieu du 15 au 30 juin 2025. Consultez le planning détaillé sur votre espace étudiant. Assurez-vous de vérifier régulièrement les mises à jour car des modifications peuvent survenir. Pour toute question concernant les examens, veuillez contacter le service de scolarité.',
    date: '26 avril 2025',
    department: 'Administration',
    isImportant: true,
    expiryDate: '30 juin 2025'
  },
  {
    id: '2',
    title: 'Fermeture exceptionnelle de la bibliothèque',
    content: 'La bibliothèque sera fermée le 2 mai 2025 pour inventaire annuel. Nous nous excusons pour la gêne occasionnée. Les emprunts qui devaient être rendus ce jour-là bénéficieront automatiquement d\'une prolongation jusqu\'au 3 mai 2025. La bibliothèque numérique restera accessible pendant cette période.',
    date: '24 avril 2025',
    department: 'Bibliothèque',
    isImportant: false,
    expiryDate: '3 mai 2025'
  },
  {
    id: '3',
    title: 'Bourses d\'excellence pour l\'année 2025-2026',
    content: 'Les candidatures pour les bourses d\'excellence de l\'ENSA Beni Mellal pour l\'année académique 2025-2026 sont ouvertes. Ces bourses récompensent les étudiants ayant obtenu d\'excellents résultats académiques. Le dossier de candidature doit être déposé au service des affaires estudiantines avant le 15 mai 2025. Pour plus d\'informations sur les critères d\'éligibilité et les documents requis, consultez le site web de l\'école.',
    date: '20 avril 2025',
    department: 'Affaires Estudiantines',
    isImportant: true,
    expiryDate: '15 mai 2025'
  },
  {
    id: '4',
    title: 'Maintenance du réseau informatique',
    content: 'Une maintenance du réseau informatique de l\'école est prévue le samedi 3 mai 2025 de 8h à 14h. Pendant cette période, l\'accès à internet et aux services intranet sera perturbé. Nous vous recommandons de planifier vos travaux en conséquence. Les services critiques comme la messagerie électronique resteront accessibles via le réseau de secours.',
    date: '18 avril 2025',
    department: 'Service Informatique',
    isImportant: false,
    expiryDate: '3 mai 2025'
  },
  {
    id: '5',
    title: 'Recrutement d\'assistants de recherche',
    content: 'Le laboratoire de recherche en intelligence artificielle recrute des assistants de recherche pour un projet financé par le Ministère de l\'Enseignement Supérieur. Les candidats doivent être en dernière année d\'études ou en master et avoir de solides compétences en programmation et en mathématiques. Les candidatures (CV et lettre de motivation) doivent être envoyées par email à lab.ia@ensabm.ma avant le 10 mai 2025.',
    date: '15 avril 2025',
    department: 'Recherche',
    isImportant: false,
    expiryDate: '10 mai 2025'
  },
  {
    id: '6',
    title: 'Changement d\'horaires des services administratifs',
    content: 'À partir du 1er mai 2025, les horaires d\'ouverture des services administratifs seront modifiés comme suit : du lundi au vendredi de 9h à 16h (au lieu de 8h30 à 15h30). Cette modification vise à mieux répondre aux besoins des étudiants et du personnel. Pour les cas urgents en dehors de ces horaires, veuillez contacter le numéro d\'urgence au +212 523 48 02 19.',
    date: '10 avril 2025',
    department: 'Administration',
    isImportant: false
  }
];

// GET /api/announcements - Récupérer toutes les annonces ou filtrer par département
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const important = searchParams.get('important');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filteredAnnouncements = [...mockAnnouncements];
    
    // Filtrer par département si spécifié
    if (department && department !== 'all') {
      filteredAnnouncements = filteredAnnouncements.filter(announcement => 
        announcement.department === department
      );
    }
    
    // Filtrer par importance si spécifié
    if (important === 'true') {
      filteredAnnouncements = filteredAnnouncements.filter(announcement => 
        announcement.isImportant === true
      );
    }
    
    // Trier par date (plus récent en premier) et importance
    filteredAnnouncements.sort((a, b) => {
      // D'abord trier par importance
      if (a.isImportant && !b.isImportant) return -1;
      if (!a.isImportant && b.isImportant) return 1;
      
      // Ensuite par date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedAnnouncements = filteredAnnouncements.slice(startIndex, endIndex);
    
    // Préparer la réponse avec pagination
    const response = {
      announcements: paginatedAnnouncements,
      pagination: {
        total: filteredAnnouncements.length,
        page,
        limit,
        totalPages: Math.ceil(filteredAnnouncements.length / limit)
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des annonces' },
      { status: 500 }
    );
  }
}

// Fonction pour récupérer une annonce par son ID
export async function getAnnouncementById(id: string) {
  const announcement = mockAnnouncements.find(item => item.id === id);
  
  if (!announcement) {
    return null;
  }
  
  return announcement;
}
