import { useState } from 'react';
import Image from 'next/image';

interface GalleryProps {
  images: {
    id: string;
    src: string;
    alt: string;
    category: string;
  }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];
  
  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="w-full">
      {/* Filtres de catégorie */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'Toutes les catégories' : category}
          </button>
        ))}
      </div>
      
      {/* Grille d'images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map(image => (
          <div 
            key={image.id}
            className="relative h-64 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedImage(image.id)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p className="text-white p-4">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal pour l'image agrandie */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-white/20 rounded-full p-2 text-white hover:bg-white/40 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
            <div className="relative h-[80vh]">
              <Image
                src={images.find(img => img.id === selectedImage)?.src || ''}
                alt={images.find(img => img.id === selectedImage)?.alt || ''}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
