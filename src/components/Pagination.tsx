import { useState, useEffect } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
  const [pages, setPages] = useState<number[]>([]);
  
  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Logique pour afficher un nombre limité de pages
    let pagesToShow: number[] = [];
    
    if (totalPages <= 7) {
      // Si moins de 7 pages, afficher toutes les pages
      pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Sinon, afficher les pages avec des ellipses
      if (currentPage <= 3) {
        // Près du début
        pagesToShow = [1, 2, 3, 4, 5, -1, totalPages];
      } else if (currentPage >= totalPages - 2) {
        // Près de la fin
        pagesToShow = [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        // Au milieu
        pagesToShow = [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
      }
    }
    
    setPages(pagesToShow);
  }, [totalItems, itemsPerPage, currentPage]);

  return (
    <div className="flex justify-center items-center space-x-1 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>
      
      {pages.map((page, index) => (
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(Math.ceil(totalItems / itemsPerPage), currentPage + 1))}
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        className={`px-3 py-1 rounded-md ${
          currentPage === Math.ceil(totalItems / itemsPerPage)
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </button>
    </div>
  );
}
