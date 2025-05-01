import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Middleware pour envoyer des notifications aux abonnés
export async function sendNotificationsForNewContent(
  contentType: 'news' | 'activity' | 'announcement',
  contentId: string,
  title: string,
  category: string
) {
  try {
    // Dans une application réelle, nous récupérerions les abonnés depuis la base de données
    // qui sont abonnés à cette catégorie et à ce type de contenu
    
    // Exemple de requête SQL (pseudo-code):
    // SELECT s.id, s.email, s.phone, snt.notification_type
    // FROM subscriptions s
    // JOIN subscription_notification_types snt ON s.id = snt.subscription_id
    // JOIN subscription_categories sc ON s.id = sc.subscription_id
    // JOIN categories c ON sc.category_id = c.id
    // WHERE s.status = 'active' AND c.name = ?
    
    // Simulation de données pour l'exemple
    const subscribers = [
      { id: '1', email: 'user1@example.com', notificationType: 'email' },
      { id: '2', phone: '+212612345678', notificationType: 'sms' },
      { id: '3', email: 'user3@example.com', phone: '+212698765432', notificationType: 'email' }
    ];
    
    // Préparer les notifications
    const notifications = [];
    
    for (const subscriber of subscribers) {
      // Construire le contenu de la notification
      let subject = '';
      let content = '';
      
      switch (contentType) {
        case 'news':
          subject = `Nouvelle actualité: ${title}`;
          content = `Une nouvelle actualité a été publiée dans la catégorie ${category}. Consultez-la sur notre site.`;
          break;
        case 'activity':
          subject = `Nouvel événement: ${title}`;
          content = `Un nouvel événement a été ajouté dans la catégorie ${category}. Consultez-le sur notre site.`;
          break;
        case 'announcement':
          subject = `Nouvelle annonce: ${title}`;
          content = `Une nouvelle annonce a été publiée par ${category}. Consultez-la sur notre site.`;
          break;
      }
      
      // Ajouter l'URL du contenu
      content += `\n\nLien: https://ensa-journal.example.com/${contentType}/${contentId}`;
      
      // Créer la notification selon le type préféré
      if (subscriber.notificationType === 'email' && subscriber.email) {
        notifications.push({
          type: 'email',
          recipient: subscriber.email,
          subject,
          content
        });
      } else if (subscriber.notificationType === 'sms' && subscriber.phone) {
        // Pour les SMS, on raccourcit le contenu
        const smsContent = `${subject}: ${content.split('\n')[0]}`;
        notifications.push({
          type: 'sms',
          recipient: subscriber.phone,
          subject: '',
          content: smsContent
        });
      }
    }
    
    // Envoyer les notifications en masse
    if (notifications.length > 0) {
      const response = await fetch('/api/notifications/bulk', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notifications }),
      });
      
      const result = await response.json();
      
      console.log(`Notifications envoyées: ${result.details.success} succès, ${result.details.failed} échecs`);
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des notifications:', error);
    return false;
  }
}

// POST /api/admin/publish - Publier du contenu et envoyer des notifications
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification (admin uniquement)
    const authToken = cookies().get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }
    
    // Dans une application réelle, nous vérifierions si l'utilisateur est un admin
    
    const body = await request.json();
    const { contentType, contentId, title, category, sendNotifications } = body;
    
    // Validation des données
    if (!contentType || !contentId || !title || !category) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis (contentType, contentId, title, category)' },
        { status: 400 }
      );
    }
    
    if (!['news', 'activity', 'announcement'].includes(contentType)) {
      return NextResponse.json(
        { error: 'Le type de contenu doit être "news", "activity" ou "announcement"' },
        { status: 400 }
      );
    }
    
    // Dans une application réelle, nous mettrions à jour le statut du contenu dans la base de données
    // pour le marquer comme publié
    
    // Envoyer des notifications si demandé
    if (sendNotifications) {
      await sendNotificationsForNewContent(
        contentType as 'news' | 'activity' | 'announcement',
        contentId,
        title,
        category
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contenu publié avec succès',
      notificationsSent: sendNotifications
    });
  } catch (error) {
    console.error('Erreur lors de la publication du contenu:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la publication du contenu' },
      { status: 500 }
    );
  }
}
