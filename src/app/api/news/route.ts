import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, News } from '@/lib/database'
// import { db } from '@/lib/db-instance'
// const database = new DatabaseService(db);

// Interface pour les actualités
// interface News {
//   id: string;
//   title: string;
//   content: string;
//   excerpt: string;
//   date: string;
//   category: string;
//   imageUrl: string;
//   author: string;
// }

// Données simulées pour les actualités
const mockNews: News[] = [
  {
    id: '1',
    title: 'L\'intelligence artificielle peut révolutionner l\'éducation',
    content: `L'intelligence artificielle (IA) transforme rapidement les méthodes d'enseignement et d'apprentissage à l'ENSA Beni Mellal. Grâce à des systèmes d'apprentissage adaptatifs, les étudiants peuvent désormais bénéficier d'un parcours personnalisé qui s'adapte à leur rythme et à leurs besoins spécifiques.

Les professeurs de l'ENSA Beni Mellal utilisent déjà des outils d'IA pour analyser les performances des étudiants et identifier les domaines nécessitant une attention particulière. Cette approche permet d'optimiser le temps d'enseignement et d'améliorer les résultats académiques.

De plus, l'école a récemment lancé un laboratoire dédié à l'IA où les étudiants peuvent développer leurs propres projets innovants. Plusieurs applications prometteuses ont déjà vu le jour, notamment dans les domaines de la reconnaissance d'images et du traitement du langage naturel.`,
    excerpt: 'Découvrez comment l\'IA transforme les méthodes d\'enseignement et d\'apprentissage à l\'ENSA Beni Mellal.',
    date: '25 avril 2025',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg',
    author: 'Prof. Ahmed Benali'
  },
  {
    id: '2',
    title: 'Conférence sur le droit du numérique',
    content: `L'ENSA Beni Mellal a accueilli une conférence majeure sur le droit du numérique le 20 avril 2025. Cet événement a réuni des experts juridiques nationaux et internationaux pour discuter des enjeux légaux liés à la transformation numérique.

Les thèmes abordés incluaient la protection des données personnelles, la propriété intellectuelle dans l'ère numérique, et les implications juridiques de l'intelligence artificielle. Les étudiants ont pu participer activement aux discussions et poser des questions pertinentes aux intervenants.

Cette conférence s'inscrit dans la volonté de l'école de sensibiliser les futurs ingénieurs aux aspects juridiques et éthiques de leur profession. Comprendre le cadre légal est essentiel pour développer des solutions technologiques responsables et conformes aux réglementations en vigueur.`,
    excerpt: 'Une conférence animée par des experts juridiques pour comprendre les enjeux légaux du numérique.',
    date: '20 avril 2025',
    category: 'Culturel',
    imageUrl: '/images/school_building.jpg',
    author: 'Dr. Karim Tazi'
  },
  {
    id: '3',
    title: 'Challenge de cybersécurité',
    content: `Les étudiants de l'ENSA Beni Mellal ont brillé lors du dernier challenge national de cybersécurité qui s'est tenu à Rabat. L'équipe "SecurENSA", composée de cinq étudiants de la filière informatique, a remporté le premier prix dans la catégorie "Détection et réponse aux incidents".

Le challenge, organisé par l'Agence Nationale de la Sécurité des Systèmes d'Information (ANSSI), a réuni plus de 20 équipes représentant différentes écoles d'ingénieurs du Maroc. Les participants ont dû faire face à des scénarios réalistes d'attaques informatiques et démontrer leurs compétences en matière de protection des systèmes.

Cette victoire témoigne de l'excellence de la formation en cybersécurité dispensée à l'ENSA Beni Mellal et de l'engagement des étudiants dans ce domaine crucial. L'école continue d'investir dans des laboratoires spécialisés et des partenariats avec des entreprises du secteur pour renforcer cette expertise.`,
    excerpt: 'Les étudiants de l\'ENSA Beni Mellal ont brillé lors du dernier challenge national de cybersécurité.',
    date: '15 avril 2025',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg',
    author: 'Prof. Samira Alaoui'
  },
  {
    id: '4',
    title: 'Tournoi sportif inter-écoles d\'ingénieurs',
    content: `L'équipe de football de l'ENSA Beni Mellal a remporté le tournoi régional des écoles d'ingénieurs qui s'est déroulé le week-end dernier. Après une compétition intense, nos joueurs ont battu l'équipe de l'ENSAM Meknès en finale avec un score de 3-1.

Le tournoi a rassemblé huit écoles d'ingénieurs de la région et s'est déroulé dans une ambiance festive et sportive. Outre le football, des compétitions de basketball, volleyball et athlétisme étaient également au programme.

Cette victoire renforce l'esprit d'équipe et la fierté d'appartenance à l'ENSA Beni Mellal. Le directeur de l'école a félicité les joueurs lors d'une cérémonie spéciale et a souligné l'importance du sport dans le développement personnel et professionnel des futurs ingénieurs.`,
    excerpt: 'L\'équipe de football de l\'ENSA Beni Mellal remporte le tournoi régional des écoles d\'ingénieurs.',
    date: '10 avril 2025',
    category: 'Sportif',
    imageUrl: '/images/school_building.jpg',
    author: 'Mohammed Chaoui'
  },
  {
    id: '5',
    title: 'Journée portes ouvertes 2025',
    content: `L'ENSA Beni Mellal organise sa journée portes ouvertes annuelle le 5 mai 2025. Cet événement est une occasion unique pour les lycéens et futurs étudiants de découvrir l'école, ses filières de formation et ses installations.

Au programme : présentations des différentes spécialités, visites guidées des laboratoires et des salles de cours, démonstrations de projets étudiants, et sessions d'information sur les procédures d'admission.

Les visiteurs pourront également échanger directement avec les professeurs et les étudiants actuels pour obtenir des réponses à leurs questions sur la vie à l'ENSA Beni Mellal. Des ateliers pratiques seront organisés pour donner un aperçu concret des compétences développées dans chaque filière.

L'inscription à cette journée est gratuite mais obligatoire via le site web de l'école. Ne manquez pas cette opportunité de découvrir l'une des écoles d'ingénieurs les plus dynamiques du Maroc !`,
    excerpt: 'L\'ENSA Beni Mellal ouvre ses portes aux lycéens et futurs étudiants le 5 mai 2025.',
    date: '5 avril 2025',
    category: 'Événement',
    imageUrl: '/images/school_building.jpg',
    author: 'Service Communication'
  },
  {
    id: '6',
    title: 'Nouveau partenariat avec l\'industrie locale',
    content: `L'ENSA Beni Mellal a signé une convention de partenariat avec plusieurs entreprises de la région pour faciliter l'insertion professionnelle de ses diplômés. Ce partenariat stratégique vise à renforcer les liens entre la formation académique et les besoins du marché du travail.

Concrètement, l'accord prévoit l'organisation de stages, de projets de fin d'études en entreprise, et de formations complémentaires adaptées aux exigences du secteur industriel. Les entreprises partenaires s'engagent également à participer activement à l'évolution des programmes d'enseignement pour garantir leur pertinence.

Ce partenariat représente une avancée significative pour l'employabilité des étudiants de l'ENSA Beni Mellal. Il témoigne de la reconnaissance de la qualité de la formation dispensée par l'école et de sa capacité à répondre aux défis technologiques actuels.`,
    excerpt: 'L\'ENSA Beni Mellal signe une convention avec les entreprises locales pour faciliter l\'insertion professionnelle.',
    date: '1 avril 2025',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg',
    author: 'Direction des Relations Entreprises'
  }
];

// GET /api/news - Récupérer toutes les actualités ou filtrer par catégorie
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filteredNews = [...mockNews];
    
    // Filtrer par catégorie si spécifiée
    if (category && category !== 'all') {
      filteredNews = filteredNews.filter(news => news.category === category);
    }
    
    // Filtrer par recherche si spécifiée
    if (search) {
      const searchLower = search.toLowerCase();
      filteredNews = filteredNews.filter(news => 
        news.title.toLowerCase().includes(searchLower) || 
        news.content.toLowerCase().includes(searchLower) ||
        news.excerpt.toLowerCase().includes(searchLower)
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);
    
    // Préparer la réponse avec pagination
    const response = {
      news: paginatedNews.map(news => ({
        id: news.id,
        title: news.title,
        excerpt: news.excerpt,
        date: news.published_at,
        // category: news.category_id,
        // imageUrl: news.imageUrl,
        // author: news.author
      })),
      pagination: {
        total: filteredNews.length,
        page,
        limit,
        totalPages: Math.ceil(filteredNews.length / limit)
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des actualités' },
      { status: 500 }
    );
  }
}

// GET /api/news/[id] - Récupérer une actualité par son ID
export async function getNewsById(id: string) {
  const news = mockNews.find(item => item.id === id);
  
  if (!news) {
    return null;
  }
  
  return news;
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, imageUrl, category, author } = await request.json();

    // Ici tu dois enregistrer dans la base de données réelle.
    // Exemple avec DatabaseService :
    const news = await database.createNews({ title, content, imageUrl, category, author });
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de l’ajout d’une actualité:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l’ajout.' },
      { status: 500 }
    );
  }
}
