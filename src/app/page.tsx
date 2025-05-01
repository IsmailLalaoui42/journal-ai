"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import NewsCard from '../components/NewsCard';
import ActivityCard from '../components/ActivityCard';
import AnnouncementCard from '../components/AnnouncementCard';
import FadeInSection from '../components/FadeInSection';
import Button from '../components/Button';
import Link from 'next/link';

// Données simulées pour la page d'accueil
const mockNews = [
  {
    id: '1',
    title: 'L\'intelligence artificielle peut révolutionner l\'éducation',
    excerpt: 'Découvrez comment l\'IA transforme les méthodes d\'enseignement et d\'apprentissage à l\'ENSA Beni Mellal.',
    date: '25 avril 2025',
    category: 'Académique',
    imageUrl: '/images/ai.jpg'
  },
  {
    id: '2',
    title: 'Conférence sur le droit du numérique',
    excerpt: 'Une conférence animée par des experts juridiques pour comprendre les enjeux légaux du numérique.',
    date: '20 avril 2025',
    category: 'Culturel',
    imageUrl: '/images/labor-law.jpg'
  },
  {
    id: '3',
    title: 'Challenge de cybersécurité',
    excerpt: 'Les étudiants de l\'ENSA Beni Mellal ont brillé lors du dernier challenge national de cybersécurité.',
    date: '15 avril 2025',
    category: 'Académique',
    imageUrl: '/images/cipher-challenge.jpg'
  }
];

const mockActivities = [
  {
    id: '1',
    title: 'Microsoft TechDay',
    description: 'Journée de découverte des technologies Microsoft pour les étudiants.',
    date: '15 mai 2025',
    location: 'Amphithéâtre principal',
    category: 'Académique',
    imageUrl: '/images/microsoft-tech.jpg'
  },
  {
    id: '2',
    title: 'Conférence sur le droit du numérique',
    description: 'Comprendre les enjeux juridiques du numérique avec des experts.',
    date: '20 mai 2025',
    location: 'Salle de conférence B',
    category: 'Culturel',
    imageUrl: '/images/labor-law.jpg'
  },
  {
    id: '3',
    title: 'Cipher Challenge',
    description: 'Compétition de cryptographie et sécurité informatique.',
    date: '25 mai 2025',
    location: 'Laboratoire d\'informatique',
    category: 'Académique',
    imageUrl: '/images/cipher-challenge.jpg'
  }
];

const mockAnnouncements = [
  {
    id: '1',
    title: 'Calendrier des examens finaux',
    content: 'Le calendrier des examens finaux du semestre de printemps est maintenant disponible. Veuillez consulter votre espace étudiant pour plus de détails.',
    department: 'Scolarité',
    date: '22 avril 2025',
    isImportant: true
  },
  {
    id: '2',
    title: 'Maintenance du système informatique',
    content: 'Une maintenance du système informatique est prévue ce weekend. Certains services pourraient être temporairement indisponibles.',
    department: 'Service Informatique',
    date: '21 avril 2025',
    isImportant: false
  }
];

export default function Home() {
  return (
    <main>
      <Header />
      
      <HeroSection 
        title="Bienvenue au Journal en ligne de l'ENSA Beni Mellal"
        subtitle="Restez informé des dernières actualités, événements et activités de l'école"
        imageUrl="/images/school_building.jpg"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Dernières actualités</h2>
              <Link href="/actualites">
                <Button variant="outline">
                  Voir toutes les actualités
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </FadeInSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockNews.map((news, index) => (
              <FadeInSection key={news.id} delay={index * 0.2}>
                <NewsCard 
                  id={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  date={news.date}
                  category={news.category}
                  imageUrl={news.imageUrl}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Activités à venir</h2>
              <Link href="/activites">
                <Button variant="outline">
                  Voir toutes les activités
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </FadeInSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockActivities.map((activity, index) => (
              <FadeInSection key={activity.id} delay={index * 0.2}>
                <ActivityCard 
                  id={activity.id}
                  title={activity.title}
                  description={activity.description}
                  date={activity.date}
                  location={activity.location}
                  category={activity.category}
                  imageUrl={activity.imageUrl}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Annonces officielles</h2>
          </FadeInSection>
          
          <div className="grid md:grid-cols-2 gap-8">
            {mockAnnouncements.map((announcement, index) => (
              <FadeInSection key={announcement.id} delay={index * 0.2}>
                <AnnouncementCard 
                  id={announcement.id}
                  title={announcement.title}
                  content={announcement.content}
                  department={announcement.department}
                  date={announcement.date}
                  isImportant={announcement.isImportant}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-6">Restez informé</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Abonnez-vous pour recevoir les dernières actualités et événements de l'ENSA Beni Mellal directement dans votre boîte mail ou par SMS.
            </p>
            <Link href="/abonnement">
              <Button size="lg" animateOnHover={true} className="bg-white text-blue-900 hover:bg-gray-100">
                S'abonner aux notifications
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
