import Image from 'next/image';
import Link from 'next/link';
import imageUrl from '../../public/images/microsoft-tech.jpg';

interface NewsCardProps {
  title: string;
  description: string;
}

export default function NewsCard({  title, description }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
        {/* <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
          {category}
        </div> */}
      </div>
      <div className="p-4">
        {/* <span className="text-gray-500 text-sm">{date}</span> */}
        <h3 className="font-bold text-lg mt-1 mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link 
          href={`/actualites/${1}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
        >
          Lire la suite
          <svg 
            className="w-4 h-4 ml-1" 
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
        </Link>
      </div>
    </div>
  );
}
