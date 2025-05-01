import { notFound } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

// You can fetch real data here. For now, let's use mock data:
const mockNews = [
  {
    id: '1',
    title: "L'intelligence artificielle peut révolutionner l'éducation",
    content: "Contenu complet de l'actualité sur l'IA...",
    date: '25 avril 2025',
    category: 'Académique',
    imageUrl: '/images/school_building.jpg'
  },
  // ...autres actualités...
];

export default function ActualiteDetail({ params }: { params: { id: string } }) {
  const news = mockNews.find(n => n.id === params.id);

  if (!news) return notFound();

  return (
    <main>
      <Header />
      <div className="bg-blue-900 py-12">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold mb-2">{news.title}</h1>
          <div className="mb-4 text-sm opacity-80">{news.date} — {news.category}</div>
        </div>
      </div>
      <section className="container mx-auto px-4 py-12">
        <img src={news.imageUrl} alt={news.title} className="w-full max-w-2xl mx-auto rounded-lg mb-8 shadow" />
        <div className="max-w-2xl mx-auto text-lg text-gray-800">
          {news.content}
        </div>
      </section>
      <Footer />
    </main>
  );
}