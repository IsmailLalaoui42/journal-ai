import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Vérifier si l'utilisateur est authentifié
export async function GET(request: NextRequest) {
  try {
    const authToken = cookies().get('auth_token')?.value;

    if (!authToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Dans une application réelle, vous vérifieriez la validité du token
    // et récupéreriez les informations de l'utilisateur depuis la base de données
    
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Erreur de vérification d\'authentification:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la vérification d\'authentification' },
      { status: 500 }
    );
  }
}

// Déconnexion
export async function POST(request: NextRequest) {
  try {
    // Supprimer le cookie d'authentification
    cookies().delete('auth_token');
    
    return NextResponse.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la déconnexion' },
      { status: 500 }
    );
  }
}
