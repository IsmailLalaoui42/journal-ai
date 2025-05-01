import React, { useState } from 'react';
import BlogPostForm from './FormActualite';
import { z } from 'zod';

// Définition du schéma Zod pour un blog post
const blogPostSchema = z.object({
  id: z.string().min(1, "ID est requis"),
  title: z.string().min(1, "Titre est requis"),
  excerpt: z.string().min(1, "Extrait est requis"),
  date: z.string().min(1, "Date est requise"),
  category: z.string().min(1, "Catégorie est requise"),
  imageUrl: z.string()
    .min(1, "URL de l'image est requise")
    .startsWith("/images/", "L'URL de l'image doit commencer par /images/")
});

// Type inféré depuis le schéma
export type BlogPost = z.infer<typeof blogPostSchema>;

const BlogPostManager: React.FC = () => {
  // Données initiales
  const initialPosts: BlogPost[] = [
    {
      id: '1',
      title: 'L\'intelligence artificielle peut révolutionner l\'éducation',
      excerpt: 'Découvrez comment l\'IA transforme les méthodes d\'enseignement et d\'apprentissage à l\'ENSA Beni Mellal.',
      date: '2025-04-25',
      category: 'Académique',
      imageUrl: '/images/school_building.jpg'
    }
  ];

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleAddPost = (newPost: BlogPost) => {
    setPosts([...posts, newPost]);
    setShowForm(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const formatDate = (dateString: string): string => {
    if (dateString.includes(' ')) return dateString;

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestionnaire de Posts</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Masquer le formulaire' : 'Ajouter un nouveau post'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <BlogPostForm onSubmit={handleAddPost} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-300 relative">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                {post.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostManager;
