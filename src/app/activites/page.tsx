"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import ActivityCard from '../../components/ActivityCard';
import Gallery from '../../components/Gallery';
import CategoryFilter from '../../components/CategoryFilter';
import Pagination from '../../components/Pagination';

// Données simulées pour la page d'activités
const mockActivities = [
  {
    id: '1',
    title: 'Microsoft TechDay',
    description: 'Journée de découverte des technologies Microsoft pour les étudiants.',
    date: '15 mai 2025',
    location: 'Amphithéâtre principal',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '2',
    title: 'Conférence sur le droit du numérique',
    description: 'Comprendre les enjeux juridiques du numérique avec des experts.',
    date: '20 mai 2025',
    location: 'Salle de conférence B',
    category: 'Culturel',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '3',
    title: 'Cipher Challenge',
    description: 'Compétition de cryptographie et sécurité informatique.',
    date: '25 mai 2025',
    location: 'Laboratoire d\'informatique',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '4',
    title: 'Tournoi sportif inter-filières',
    description: 'Compétitions sportives entre les différentes filières de l\'école.',
    date: '1 juin 2025',
    location: 'Terrain de sport',
    category: 'Sportif',
    imageUrl: '/images/school_building.jpg'
  },
  {
    id: '5',
    title: 'Journée culturelle',
    description: 'Célébration de la diversité culturelle à l\'ENSA Beni Mellal.',
    date: '10 juin 2025',
    location: 'Espace culturel',
    category: 'Culturel',
    imageUrl: '/images/school_building.jpg'
  }
];

// Données simulées pour la galerie
const mockGalleryImages = [
  { id: '1', title: 'Laboratoires', imageUrl: '/images/school_building.jpg', category: 'Infrastructure' },
  { id: '2', title: 'Bibliothèque', imageUrl: '/images/school_building.jpg', category: 'Infrastructure' },
  { id: '3', title: 'Espace détente', imageUrl: '/images/school_building.jpg', category: 'Infrastructure' },
  { id: '4', title: 'Amphithéâtre', imageUrl: '/images/school_building.jpg', category: 'Infrastructure' },
  { id: '5', title: 'Salle informatique', imageUrl: '/images/school_building.jpg', category: 'Infrastructure' },
  { id: '6', title: 'Terrain de sport', imageUrl: '/images/school_building.jpg', category: 'Infrastructure' }
];

export default function Activites() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemsPerPage = 3;
  
  // Extraire les catégories uniques
  const categories = Array.from(new Set(mockActivities.map(activity => activity.category)));
  
  // Filtrer les activités par catégorie et recherche
  const filteredActivities = mockActivities.filter(activity => {
    const matchesCategory = activeCategory === 'all' || activity.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Paginer les résultats
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
  
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
          <h1 className="text-4xl font-bold mb-4">Activités et Événements</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Découvrez les activités et événements à venir à l'ENSA Beni Mellal
          </p>
        </div>
      </div>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
            
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">Aucun résultat trouvé</h3>
                <p className="mt-2 text-gray-500">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              <>
                <div className="space-y-8 mb-8">
                  {currentItems.map(activity => (
                    <ActivityCard 
                      key={activity.id}
                      id={activity.id}
                      title={activity.title}
                      description={activity.description}
                      date={activity.date}
                      location={activity.location}
                      category={activity.category}
                      imageUrl={activity.imageUrl}
                    />
                  ))}
                </div>
                
                <Pagination 
                  totalItems={filteredActivities.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Galerie</h2>
          <Gallery images={mockGalleryImages} />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
