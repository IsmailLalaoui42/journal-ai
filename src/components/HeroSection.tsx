import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function HeroSection({ title, subtitle, imageUrl }: HeroSectionProps) {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {/* Image d'arrière-plan */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="ENSA Beni Mellal"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>
      </div>
      
      {/* Contenu */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-delay">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
            <Link 
              href="/actualites" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Découvrir les actualités
            </Link>
            <Link 
              href="/abonnement" 
              className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg transition-colors"
            >
              S'abonner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
