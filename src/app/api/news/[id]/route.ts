import { NextRequest, NextResponse } from 'next/server';
import { getNewsById } from '../route';

// GET /api/news/[id] - Récupérer une actualité par son ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const news = await getNewsById(id);
    
    if (!news) {
      return NextResponse.json(
        { error: 'Actualité non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'actualité:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération de l\'actualité' },
      { status: 500 }
    );
  }
}
