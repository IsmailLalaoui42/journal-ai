import { NextRequest, NextResponse } from 'next/server';
import { getActivityById } from '../route';

// GET /api/activities/[id] - Récupérer une activité par son ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const activity = await getActivityById(id);
    
    if (!activity) {
      return NextResponse.json(
        { error: 'Activité non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(activity);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'activité:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération de l\'activité' },
      { status: 500 }
    );
  }
}
