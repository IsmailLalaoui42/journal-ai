import { NextRequest, NextResponse } from 'next/server';
import { getAnnouncementById } from '../route';

// GET /api/announcements/[id] - Récupérer une annonce par son ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const announcement = await getAnnouncementById(id);
    
    if (!announcement) {
      return NextResponse.json(
        { error: 'Annonce non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(announcement);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'annonce:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération de l\'annonce' },
      { status: 500 }
    );
  }
}
