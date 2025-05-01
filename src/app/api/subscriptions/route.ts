import { DatabaseService } from '@/lib/database';
import { db } from '@/lib/db-instance';

const database = new DatabaseService(db);
// Route pour gérer les abonnements
export const dynamic = 'force-dynamic'; // Force le rendu dynamique pour cette route
export const revalidate = 0; // Désactive la mise en cache pour cette route
export const config = {
  runtime: 'edge', // Utiliser le runtime Edge pour cette route
  regions: ['iad1'], // Spécifiez la région de votre choix
};
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, notificationTypes, categories } = body;

    // Validation des données
    if (!notificationTypes || !Array.isArray(notificationTypes) || notificationTypes.length === 0) {
      return NextResponse.json(
        { error: 'Au moins un type de notification doit être sélectionné' },
        { status: 400 }
      );
    }

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json(
        { error: 'Au moins une catégorie doit être sélectionnée' },
        { status: 400 }
      );
    }

    if (notificationTypes.includes('email') && !email) {
      return NextResponse.json(
        { error: 'Email requis pour les notifications par email' },
        { status: 400 }
      );
    }

    if (notificationTypes.includes('sms') && !phone) {
      return NextResponse.json(
        { error: 'Numéro de téléphone requis pour les notifications par SMS' },
        { status: 400 }
      );
    }

    // Vérifier si l'abonnement existe déjà
    const existing = await database.findSubscriptionByEmailOrPhone(email, phone);
    if (existing) {
      return NextResponse.json(
        { error: 'Un abonnement avec cet email ou ce numéro de téléphone existe déjà' },
        { status: 409 }
      );
    }

    // Créer un nouvel abonnement
    const id = await database.createSubscription({
      email,
      phone,
      notificationTypes,
      categories,
    });

    return NextResponse.json({
      message: 'Abonnement créé avec succès',
      subscription: { id, email, phone, notificationTypes, categories, status: 'active' }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de l\'abonnement' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const subscriptions = await database.getAllSubscriptions();
  return NextResponse.json({ subscriptions });
}


