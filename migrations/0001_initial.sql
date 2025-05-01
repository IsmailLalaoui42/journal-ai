-- Initialisation de la base de données pour le journal en ligne ENSA Beni Mellal
-- Ce script crée les tables nécessaires pour stocker les données du site

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  apogee_number TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('etudiant', 'professeur', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des actualités
CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image_url TEXT,
  category_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories (id),
  FOREIGN KEY (author_id) REFERENCES users (id)
);

-- Table des activités
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  location TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  category_id INTEGER NOT NULL,
  organizer_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories (id),
  FOREIGN KEY (organizer_id) REFERENCES users (id)
);

-- Table des départements
CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des annonces
CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_important BOOLEAN DEFAULT FALSE,
  department_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiry_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments (id),
  FOREIGN KEY (author_id) REFERENCES users (id)
);

-- Table des abonnements
CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'pending', 'unsubscribed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

-- Table des types de notification par abonnement
CREATE TABLE IF NOT EXISTS subscription_notification_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_id INTEGER NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('email', 'sms')),
  FOREIGN KEY (subscription_id) REFERENCES subscriptions (id) ON DELETE CASCADE
);

-- Table des catégories par abonnement
CREATE TABLE IF NOT EXISTS subscription_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions (id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- Table des images de la galerie
CREATE TABLE IF NOT EXISTS gallery_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  uploaded_by INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories (id),
  FOREIGN KEY (uploaded_by) REFERENCES users (id)
);

-- Insertion des données initiales pour les catégories
INSERT INTO categories (name, description) VALUES
  ('Académique', 'Actualités et événements liés aux études et à la recherche'),
  ('Culturel', 'Activités et événements culturels'),
  ('Sportif', 'Compétitions et activités sportives'),
  ('Événement', 'Événements spéciaux organisés par l''école'),
  ('Annonces', 'Annonces officielles de l''administration');

-- Insertion des données initiales pour les départements
INSERT INTO departments (name, description) VALUES
  ('Administration', 'Direction et services administratifs'),
  ('Scolarité', 'Service de gestion des études'),
  ('Bibliothèque', 'Centre de documentation et bibliothèque'),
  ('Informatique', 'Service informatique'),
  ('Recherche', 'Laboratoires et centres de recherche');

-- Insertion d'un utilisateur administrateur par défaut
INSERT INTO users (apogee_number, password, nom, prenom, email, role) VALUES
  ('admin', 'admin123', 'Admin', 'Admin', 'admin@ensabm.ma', 'admin');
