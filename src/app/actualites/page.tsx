"use client";

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import NewsCard from '../../components/NewsCard';
import CategoryFilter from '../../components/CategoryFilter';
import Pagination from '../../components/Pagination';

// Données simulées pour la page d'actualités
const mockNews = [
  {
    id: '1',
    title: 'L\'intelligence artificielle peut révolutionner l\'éducation',
    excerpt: 'Découvrez comment l\'IA transforme les méthodes d\'enseignement et d\'apprentissage à l\'ENSA Beni Mellal.',
    date: '25 avril 2025',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '2',
    title: 'Conférence sur le droit du numérique',
    excerpt: 'Une conférence animée par des experts juridiques pour comprendre les enjeux légaux du numérique.',
    date: '20 avril 2025',
    category: 'Culturel',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '3',
    title: 'Challenge de cybersécurité',
    excerpt: 'Les étudiants de l\'ENSA Beni Mellal ont brillé lors du dernier challenge national de cybersécurité.',
    date: '15 avril 2025',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '4',
    title: 'Tournoi sportif inter-écoles d\'ingénieurs',
    excerpt: 'L\'équipe de football de l\'ENSA Beni Mellal remporte le tournoi régional des écoles d\'ingénieurs.',
    date: '10 avril 2025',
    category: 'Sportif',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '5',
    title: 'Journée portes ouvertes 2025',
    excerpt: 'L\'ENSA Beni Mellal ouvre ses portes aux lycéens et futurs étudiants le 5 mai 2025.',
    date: '5 avril 2025',
    category: 'Événement',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '6',
    title: 'Nouveau partenariat avec l\'industrie locale',
    excerpt: 'L\'ENSA Beni Mellal signe une convention avec les entreprises locales pour faciliter l\'insertion professionnelle.',
    date: '1 avril 2025',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg'
  }
];
// get from localhost:3000/api/news using fetch
// const fetchNews = async () => {
//   const response = await fetch('http://localhost:3001/api/news');  
//   if (!response.ok) {
//     throw new Error('Failed to fetch news data');
//   }
//   return response.json();
// };


export default function Actualites() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  // const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 3;
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('http://localhost:3001/api/news');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch news data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setNews(data as any);
      } catch (error) {
        console.error('Error fetching news:', error);
        // setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  // const news = fetchNews();
  console.log(news);
  
  // Extraire les catégories uniques
  const categories = Array.from(new Set(mockNews.map(news => news.category)));
  
  // Filtrer les actualités par catégorie et recherche
  const filteredNews = mockNews.filter(news => {
    const matchesCategory = activeCategory === 'all' || news.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Paginer les résultats
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Réinitialiser à la première page lors d'une nouvelle recherche
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Réinitialiser à la première page lors d'un changement de catégorie
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Faire défiler vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <Header />
      
      <div className="bg-blue-900 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Actualités</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Restez informé des dernières nouvelles et événements de l'ENSA Beni Mellal
          </p>
        </div>
      </div>
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {news && (
              <>
              {news?.map((item: any , key) => (
                <NewsCard 
                key={key}
                title={item?.title}
                description={item?.description}
              />
              ))}
              </>
            )}
            
          </div>
        </div>
      </div>
      
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
            
            {filteredNews.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">Aucun résultat trouvé</h3>
                <p className="mt-2 text-gray-500">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              <>
                <div className="space-y-8 mb-8">
                  {currentItems.map(news => (
                    <NewsCard 
                      key={news.id}
                      // id={news.id}
                      title={news.title}
                      excerpt={news.excerpt}
                      date={news.date}
                      category={news.category}
                      imageUrl={news.imageUrl}
                    />
                  ))}
                </div>
                
                <Pagination 
                  totalItems={filteredNews.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </section> */}
      
      <Footer />
    </main>
  );
}
