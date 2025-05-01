// Interface definitions remain the same
export interface User {
  id: number;
  apogee_number: string;
  password: string; // In a real application, this would be a hash
  nom: string;
  prenom: string;
  email: string;
  role: 'etudiant' | 'professeur' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  category: string;
  author_id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  // Virtual properties for joins
  category_name?: string;
  author_name?: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  location: string;
  start_date: string;
  end_date: string | null;
  category_id: number;
  organizer_id: number;
  created_at: string;
  updated_at: string;
  // Virtual properties for joins
  category_name?: string;
  organizer_name?: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  is_important: boolean;
  department_id: number;
  author_id: number;
  published_at: string;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
  // Virtual properties for joins
  department_name?: string;
  author_name?: string;
}

export interface Subscription {
  id: number;
  email: string | null;
  phone: string | null;
  status: 'active' | 'pending' | 'unsubscribed';
  created_at: string;
  updated_at: string;
  // Virtual properties for joins
  notification_types?: string[];
  categories?: string[];
}

export interface GalleryImage {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category_id: number;
  uploaded_by: number;
  created_at: string;
  // Virtual properties for joins
  category_name?: string;
  uploader_name?: string;
}

// Import MongoDB dependencies
import { MongoClient, Collection, Db, ObjectId } from 'mongodb';

// Class to handle database operations
export class DatabaseService {
  private client: MongoClient;
  private db: Db;
  private collections: {
    users: Collection;
    categories: Collection;
    news: Collection;
    activities: Collection;
    departments: Collection;
    announcements: Collection;
    subscriptions: Collection;
    subscription_notification_types: Collection;
    subscription_categories: Collection;
    gallery_images: Collection;
  };

  constructor(connectionString: string, dbName: string) {
    this.client = new MongoClient(connectionString);
    this.db = this.client.db(dbName);
    
    // Initialize collections
    this.collections = {
      users: this.db.collection('users'),
      categories: this.db.collection('categories'),
      news: this.db.collection('news'),
      activities: this.db.collection('activities'),
      departments: this.db.collection('departments'),
      announcements: this.db.collection('announcements'),
      subscriptions: this.db.collection('subscriptions'),
      subscription_notification_types: this.db.collection('subscription_notification_types'),
      subscription_categories: this.db.collection('subscription_categories'),
      gallery_images: this.db.collection('gallery_images')
    };
  }

  // Connect to the database
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }

  // Close the connection
  async close(): Promise<void> {
    await this.client.close();
    console.log('MongoDB connection closed');
  }

  // Methods for users
  async getUserByApogee(apogeeNumber: string): Promise<User | null> {
    const user = await this.collections.users.findOne({ apogee_number: apogeeNumber });
    return user as User | null;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.collections.users.findOne({ id });
    return user as User | null;
  }

  // Methods for news
  async getNews(page: number = 1, limit: number = 10, categoryId?: number, search?: string): Promise<{ news: News[], total: number }> {
    const filter: any = {};
    
    if (categoryId) {
      filter.category_id = categoryId;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Count total documents
    const total = await this.collections.news.countDocuments(filter);
    
    // Get news with pagination
    const newsItems = await this.collections.news
      .find(filter)
      .sort({ published_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    // Fetch related data
    const newsWithDetails = await Promise.all(
      newsItems.map(async (item: any) => {
        const category = await this.collections.categories.findOne({ id: item.category_id });
        const author = await this.collections.users.findOne({ id: item.author_id });
        
        return {
          ...item,
          category_name: category ? category.name : null,
          author_name: author ? `${author.nom} ${author.prenom}` : null
        };
      })
    );
    
    return {
      news: newsWithDetails as News[],
      total
    };
  }

  async getNewsById(id: number): Promise<News | null> {
    const news = await this.collections.news.findOne({ id });
    
    if (!news) {
      return null;
    }
    
    // Get related data
    const category = await this.collections.categories.findOne({ id: news.category_id });
    const author = await this.collections.users.findOne({ id: news.author_id });
    
    return {
      ...news,
      category_name: category ? category.name : null,
      author_name: author ? `${author.nom} ${author.prenom}` : null
    } as any;
  }

  // Methods for activities
  async getActivities(page: number = 1, limit: number = 10, categoryId?: number, search?: string): Promise<{ activities: Activity[], total: number }> {
    const filter: any = {};
    
    if (categoryId) {
      filter.category_id = categoryId;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Count total documents
    const total = await this.collections.activities.countDocuments(filter);
    
    // Get activities with pagination
    const activitiesItems = await this.collections.activities
      .find(filter)
      .sort({ start_date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    // Fetch related data
    const activitiesWithDetails = await Promise.all(
      activitiesItems.map(async (item: any) => {
        const category = await this.collections.categories.findOne({ id: item.category_id });
        const organizer = await this.collections.users.findOne({ id: item.organizer_id });
        
        return {
          ...item,
          category_name: category ? category.name : null,
          organizer_name: organizer ? `${organizer.nom} ${organizer.prenom}` : null
        };
      })
    );
    
    return {
      activities: activitiesWithDetails as Activity[],
      total
    };
  }

  async getActivityById(id: number): Promise<Activity | null> {
    const activity = await this.collections.activities.findOne({ id });
    
    if (!activity) {
      return null;
    }
    
    // Get related data
    const category = await this.collections.categories.findOne({ id: activity.category_id });
    const organizer = await this.collections.users.findOne({ id: activity.organizer_id });
    
    return {
      ...activity,
      category_name: category ? category.name : null,
      organizer_name: organizer ? `${organizer.nom} ${organizer.prenom}` : null
    } as any;
  }

  // Methods for announcements
  async getAnnouncements(page: number = 1, limit: number = 10, departmentId?: number, important?: boolean): Promise<{ announcements: Announcement[], total: number }> {
    const filter: any = {};
    
    if (departmentId) {
      filter.department_id = departmentId;
    }
    
    if (important !== undefined) {
      filter.is_important = important;
    }
    
    // Count total documents
    const total = await this.collections.announcements.countDocuments(filter);
    
    // Get announcements with pagination
    const announcementsItems = await this.collections.announcements
      .find(filter)
      .sort({ is_important: -1, published_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    // Fetch related data
    const announcementsWithDetails = await Promise.all(
      announcementsItems.map(async (item: any) => {
        const department = await this.collections.departments.findOne({ id: item.department_id });
        const author = await this.collections.users.findOne({ id: item.author_id });
        
        return {
          ...item,
          department_name: department ? department.name : null,
          author_name: author ? `${author.nom} ${author.prenom}` : null
        };
      })
    );
    
    return {
      announcements: announcementsWithDetails as Announcement[],
      total
    };
  }

  async getAnnouncementById(id: number): Promise<Announcement | null> {
    const announcement = await this.collections.announcements.findOne({ id });
    
    if (!announcement) {
      return null;
    }
    
    // Get related data
    const department = await this.collections.departments.findOne({ id: announcement.department_id });
    const author = await this.collections.users.findOne({ id: announcement.author_id });
    
    return {
      ...announcement,
      department_name: department ? department.name : null,
      author_name: author ? `${author.nom} ${author.prenom}` : null
    } as any;
  }

  // Methods for subscriptions
  async createSubscription(data: { email?: string, phone?: string, notificationTypes: string[], categories: number[] }): Promise<number> {
    const { email, phone, notificationTypes, categories } = data;
    
    // Check if subscription already exists
    const existingSubscription = await this.collections.subscriptions.findOne({
      $or: [
        { email: email || null },
        { phone: phone || null }
      ]
    });
    
    if (existingSubscription) {
      throw new Error('Un abonnement avec cet email ou ce numéro de téléphone existe déjà');
    }
    
    // Get the next ID
    const maxIdSubscription = await this.collections.subscriptions
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    
    const nextId = maxIdSubscription.length > 0 ? maxIdSubscription[0].id + 1 : 1;
    
    // Create subscription
    const now = new Date().toISOString();
    const subscriptionData = {
      id: nextId,
      email: email || null,
      phone: phone || null,
      status: 'active',
      created_at: now,
      updated_at: now
    };
    
    await this.collections.subscriptions.insertOne(subscriptionData);
    
    // Add notification types
    for (const type of notificationTypes) {
      await this.collections.subscription_notification_types.insertOne({
        subscription_id: nextId,
        notification_type: type
      });
    }
    
    // Add categories
    for (const categoryId of categories) {
      await this.collections.subscription_categories.insertOne({
        subscription_id: nextId,
        category_id: categoryId
      });
    }
    
    return nextId;
  }

  async getSubscriptionById(id: number): Promise<Subscription | null> {
    // Get subscription
    const subscription = await this.collections.subscriptions.findOne({ id });
    
    if (!subscription) {
      return null;
    }
    
    // Get notification types
    const notificationTypes = await this.collections.subscription_notification_types
      .find({ subscription_id: id })
      .toArray();
    
    // Get categories
    const subscriptionCategories = await this.collections.subscription_categories
      .find({ subscription_id: id })
      .toArray();
    
    const categoryIds = subscriptionCategories.map(sc => sc.category_id);
    const categories = await this.collections.categories
      .find({ id: { $in: categoryIds } })
      .toArray();
    
    return {
      ...subscription,
      notification_types: notificationTypes.map(nt => nt.notification_type),
      categories: categories.map(c => c.name)
    } as any;
  }

  async updateSubscription(id: number, data: { email?: string, phone?: string, notificationTypes?: string[], categories?: number[], status?: 'active' | 'pending' | 'unsubscribed' }): Promise<void> {
    const { email, phone, notificationTypes, categories, status } = data;
    
    // Update subscription
    const updateData: any = {
      updated_at: new Date().toISOString()
    };
    
    if (email !== undefined) {
      updateData.email = email;
    }
    
    if (phone !== undefined) {
      updateData.phone = phone;
    }
    
    if (status !== undefined) {
      updateData.status = status;
    }
    
    if (Object.keys(updateData).length > 1) { // More than just updated_at
      await this.collections.subscriptions.updateOne(
        { id },
        { $set: updateData }
      );
    }
    
    // Update notification types
    if (notificationTypes !== undefined) {
      // Delete old types
      await this.collections.subscription_notification_types.deleteMany({
        subscription_id: id
      });
      
      // Add new types
      for (const type of notificationTypes) {
        await this.collections.subscription_notification_types.insertOne({
          subscription_id: id,
          notification_type: type
        });
      }
    }
    
    // Update categories
    if (categories !== undefined) {
      // Delete old categories
      await this.collections.subscription_categories.deleteMany({
        subscription_id: id
      });
      
      // Add new categories
      for (const categoryId of categories) {
        await this.collections.subscription_categories.insertOne({
          subscription_id: id,
          category_id: categoryId
        });
      }
    }
  }

  // Methods for categories
  async getCategories(): Promise<Category[]> {
    const categories = await this.collections.categories
      .find()
      .toArray();
    
    return categories as any[];
  }

  // Methods for departments
  async getDepartments(): Promise<Department[]> {
    const departments = await this.collections.departments
      .find()
      .toArray();
    
    return departments as any[];
  }

  // Methods for gallery images
  async getGalleryImages(categoryId?: number): Promise<GalleryImage[]> {
    const filter: any = {};
    
    if (categoryId) {
      filter.category_id = categoryId;
    }
    
    const images = await this.collections.gallery_images
      .find(filter)
      .sort({ created_at: -1 })
      .toArray();
    
    // Fetch related data
    const imagesWithDetails = await Promise.all(
      images.map(async (item: any) => {
        const category = await this.collections.categories.findOne({ id: item.category_id });
        const uploader = await this.collections.users.findOne({ id: item.uploaded_by });
        
        return {
          ...item,
          category_name: category ? category.name : null,
          uploader_name: uploader ? `${uploader.nom} ${uploader.prenom}` : null
        };
      })
    );
    
    return imagesWithDetails as GalleryImage[];
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    const subscriptions = await this.collections.subscriptions
      .find()
      .toArray();
    
    // Get details for each subscription
    const subscriptionsWithDetails = await Promise.all(
      subscriptions.map(async (subscription: any) => {
        // Get notification types
        const notificationTypes = await this.collections.subscription_notification_types
          .find({ subscription_id: subscription.id })
          .toArray();
        
        // Get categories
        const subscriptionCategories = await this.collections.subscription_categories
          .find({ subscription_id: subscription.id })
          .toArray();
        
        const categoryIds = subscriptionCategories.map(sc => sc.category_id);
        const categories = await this.collections.categories
          .find({ id: { $in: categoryIds } })
          .toArray();
        
        return {
          ...subscription,
          notification_types: notificationTypes.map(nt => nt.notification_type),
          categories: categories.map(c => c.name)
        };
      })
    );
    
    return subscriptionsWithDetails as Subscription[];
  }
}