import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database'; // adapte le chemin si besoin
import { db } from '@/lib/db-instance';

const database = new DatabaseService(db);

// GET /api/subscriptions/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // const { params } = await context;
  const id = Number(params.id);
  try {
    const subscription = await database.getSubscriptionById(id);

    if (!subscription) {
      return NextResponse.json(
        { error: 'Abonnement non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'abonnement:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération de l\'abonnement' },
      { status: 500 }
    );
  }
}

// DELETE /api/subscriptions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    // Ici, tu dois ajouter la logique pour supprimer ou désactiver l'abonnement dans la base
    // Par exemple :
    // await database.deleteSubscriptionById(id);
    return NextResponse.json({ message: 'Désabonnement effectué avec succès' });
  } catch (error) {
    console.error('Erreur lors du désabonnement:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du désabonnement' },
      { status: 500 }
    );
  }
}

// PATCH /api/subscriptions/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    // Ici, tu dois ajouter la logique pour mettre à jour l'abonnement dans la base
    // Par exemple :
    // await database.updateSubscriptionById(id, body);
    return NextResponse.json({ message: 'Abonnement mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'abonnement:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour de l\'abonnement' },
      { status: 500 }
    );
  }
}
