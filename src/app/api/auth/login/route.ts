import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Interface pour les utilisateurs
interface User {
  id: string;
  apogeeNumber: string;
  password: string; // Dans une application réelle, ce serait un hash
  nom: string;
  prenom: string;
  email: string;
  role: 'etudiant' | 'professeur' | 'admin';
}

// Données simulées pour les utilisateurs
const mockUsers: User[] = [
  {
    id: '1',
    apogeeNumber: '12345',
    password: 'password123',
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    role: 'etudiant'
  },
  {
    id: '2',
    apogeeNumber: '67890',
    password: 'password123',
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@example.com',
    role: 'professeur'
  },
  {
    id: '3',
    apogeeNumber: 'admin',
    password: 'admin123',
    nom: 'Admin',
    prenom: 'Admin',
    email: 'admin@ensabm.ma',
    role: 'admin'
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apogeeNumber, password } = body;

    // Vérifier si les champs requis sont présents
    if (!apogeeNumber || !password) {
      return NextResponse.json(
        { error: 'Numéro d\'apogée et mot de passe requis' },
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur
    const user = mockUsers.find(u => u.apogeeNumber === apogeeNumber);

    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Numéro d\'apogée ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Créer un objet utilisateur sans le mot de passe pour la réponse
    const userResponse = {
      id: user.id,
      apogeeNumber: user.apogeeNumber,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role
    };

    // Définir un cookie de session (dans une application réelle, utiliser un JWT ou une session sécurisée)
    cookies().set('auth_token', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 jour
      path: '/'
    });

    return NextResponse.json({ user: userResponse, message: 'Connexion réussie' });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la connexion' },
      { status: 500 }
    );
  }
}
