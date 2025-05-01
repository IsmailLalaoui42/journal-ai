import Image from 'next/image';
import Link from 'next/link';

interface ActivityCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  location: string;
}

export default function ActivityCard({ id, title, description, date, imageUrl, location }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm">{location}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-600 text-sm font-medium">{date}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <Link 
          href={`/activites/${id}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
}
