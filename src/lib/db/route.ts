import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'StrongPassword123!',
  database: 'buildora',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Type definitions based on the actual schema
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  twitter?: string;
  github?: string;
  avatar?: string;
  is_verified: boolean;

  role: string;
  email_notifications: boolean;
  auto_save: boolean;
  public_profile: boolean;
  data_collection: boolean;
  subscription_plan: string;
  subscription_status: string;
  subscription_end_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: number;
  user_id: number;
  folder_name: string;
  title: string;
  description: string;
  logo: string;
  status: 'draft' | 'completed' | 'generating';
  created_at: Date;
  updated_at: Date;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration_days: number;
  features: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: number;
  payments_user_id: number;
  plan_name: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | '';
  transaction_id: string;
  paid_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Subscription {
  id: number;
  subscriptions_user_id: number;
  plan_id: number;
  payment_id: number;
  status: 'active' | 'expired' | 'canceled' | 'trial';
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
}

// Test database connection
export async function testConnection() {
  try {
    console.log('🔌 Attempting database connection...');
    console.log('📋 Connection config:', {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      database: dbConfig.database
    });
    
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.error('🔍 Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return false;
  }
}

// Initialize database tables
export async function initDatabase() {
  try {
    console.log('🏗️ Starting database initialization...');
    const connection = await pool.getConnection();
    
    // Create users table
    console.log('📝 Creating users table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user','admin') NOT NULL DEFAULT 'user',
        is_verified TINYINT(1) NOT NULL DEFAULT 0,

        email_notifications TINYINT(1) NOT NULL DEFAULT 1,
        auto_save TINYINT(1) NOT NULL DEFAULT 1,
        public_profile TINYINT(1) NOT NULL DEFAULT 0,
        data_collection TINYINT(1) NOT NULL DEFAULT 1,
        subscription_plan ENUM('trial','basic','premium') NOT NULL DEFAULT 'trial',
        subscription_status ENUM('trial','active','cancelled','expired') NOT NULL DEFAULT 'trial',
        subscription_end_date TIMESTAMP NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
        PRIMARY KEY (id),
        UNIQUE KEY username (username,email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('✅ Users table created/verified');

    // Create plans table
    console.log('📝 Creating plans table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS plans (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,0) NOT NULL DEFAULT 0,
        currency VARCHAR(255) NOT NULL DEFAULT 'USD',
        duration_days INT(11) NOT NULL DEFAULT 30,
        features TEXT NOT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
        PRIMARY KEY (id),
        UNIQUE KEY name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('✅ Plans table created/verified');

    // Create projects table
    console.log('📝 Creating projects table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT(11) NOT NULL AUTO_INCREMENT,
        user_id INT(11) NOT NULL,
        folder_name VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        logo VARCHAR(255) NOT NULL,
        status ENUM('draft','completed','generating') NOT NULL DEFAULT 'draft',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
        PRIMARY KEY (id),
        UNIQUE KEY folder_name (folder_name),
        KEY user_id (user_id),
        CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('✅ Projects table created/verified');

    // Create payments table
    console.log('📝 Creating payments table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT(11) NOT NULL AUTO_INCREMENT,
        payments_user_id INT(11) NOT NULL,
        plan_name VARCHAR(100) NOT NULL,
        amount DECIMAL(10,0) NOT NULL,
        currency VARCHAR(255) NOT NULL DEFAULT 'USD',
        status ENUM('pending','paid','failed','') NOT NULL DEFAULT 'pending',
        transaction_id VARCHAR(255) NOT NULL,
        paid_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
        PRIMARY KEY (id),
        KEY payments_user_id (payments_user_id),
        CONSTRAINT payments_user_id FOREIGN KEY (payments_user_id) REFERENCES users (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('✅ Payments table created/verified');

    // Create subscriptions table
    console.log('📝 Creating subscriptions table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INT(11) NOT NULL AUTO_INCREMENT,
        subscriptions_user_id INT(11) NOT NULL,
        plan_id INT(11) NOT NULL,
        payment_id INT(11) NOT NULL,
        status ENUM('active','expired','canceled','trial') NOT NULL DEFAULT 'active',
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
        PRIMARY KEY (id),
        KEY subscriptions_user_id (subscriptions_user_id),
        KEY plan_id (plan_id),
        KEY payment_id (payment_id),
        CONSTRAINT payment_id FOREIGN KEY (payment_id) REFERENCES payments (id) ON DELETE CASCADE,
        CONSTRAINT plan_id FOREIGN KEY (plan_id) REFERENCES plans (id) ON DELETE CASCADE,
        CONSTRAINT subscriptions_user_id FOREIGN KEY (subscriptions_user_id) REFERENCES users (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log('✅ Subscriptions table created/verified');

    connection.release();
    console.log('✅ Database tables created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    console.error('🔍 Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return false;
  }
}

// User operations
export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  is_verified?: boolean;
}) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?)',
      [userData.username, userData.email, userData.password, userData.role || 'user', userData.is_verified || false]
    );
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return Array.isArray(rows) && rows.length > 0 ? rows[0] as User : null;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

export async function findUserById(id: number): Promise<User | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return Array.isArray(rows) && rows.length > 0 ? rows[0] as User : null;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

export async function updateUserLastLogin(id: number) {
  try {
    await pool.execute(
      'UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
  } catch (error) {
    console.error('Error updating user last login:', error);
    throw error;
  }
}

export async function updateUser(email: string, userData: {
  username: string;
  email: string;
}) {
  try {
    const [result] = await pool.execute(
      `UPDATE users SET 
        username = ?, 
        email = ?,
        updated_at = CURRENT_TIMESTAMP 
       WHERE email = ?`,
      [
        userData.username,
        userData.email,
        email
      ]
    );
    
    // Return the updated user data
    return await findUserByEmail(userData.email);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function updateUserSettings(email: string, settings: {
  email_notifications: boolean;
  auto_save: boolean;
  public_profile: boolean;
  data_collection: boolean;
}) {
  try {
    const [result] = await pool.execute(
      `UPDATE users SET 
        email_notifications = ?, 
        auto_save = ?,
        public_profile = ?,
        data_collection = ?,
        updated_at = CURRENT_TIMESTAMP 
       WHERE email = ?`,
      [
        settings.email_notifications,
        settings.auto_save,
        settings.public_profile,
        settings.data_collection,
        email
      ]
    );
    
    // Return the updated user data
    return await findUserByEmail(email);
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
}

// Add email verification token functions
export const verifyEmail = async (email: string) => {
  await pool.execute(
    'UPDATE users SET is_verified = true WHERE email = ?',
    [email]
  );
};



// Project operations
export async function createProject(projectData: {
  user_id: number;
  folder_name: string;
  title: string;
  description: string;
  logo: string;
}) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO projects (user_id, folder_name, title, description, logo) VALUES (?, ?, ?, ?, ?)',
      [projectData.user_id, projectData.folder_name, projectData.title, projectData.description, projectData.logo]
    );
    return result;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function getUserProjects(userId: number): Promise<Project[]> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows as Project[];
  } catch (error) {
    console.error('Error getting user projects:', error);
    throw error;
  }
}

// Plan operations
export async function createPlan(planData: {
  name: string;
  description: string;
  price: number;
  currency?: string;
  duration_days?: number;
  features: string;
  is_active?: boolean;
}) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO plans (name, description, price, currency, duration_days, features, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        planData.name,
        planData.description,
        planData.price,
        planData.currency || 'USD',
        planData.duration_days || 30,
        planData.features,
        planData.is_active !== undefined ? planData.is_active : true
      ]
    );
    return result;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
}

export async function getAllPlans(): Promise<Plan[]> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM plans WHERE is_active = 1 ORDER BY price ASC'
    );
    return rows as Plan[];
  } catch (error) {
    console.error('Error getting plans:', error);
    throw error;
  }
}

// Payment operations
export async function createPayment(paymentData: {
  payments_user_id: number;
  plan_name: string;
  amount: number;
  currency?: string;
  status?: 'pending' | 'paid' | 'failed' | '';
  transaction_id: string;
}) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO payments (payments_user_id, plan_name, amount, currency, status, transaction_id) VALUES (?, ?, ?, ?, ?, ?)',
      [
        paymentData.payments_user_id,
        paymentData.plan_name,
        paymentData.amount,
        paymentData.currency || 'USD',
        paymentData.status || 'pending',
        paymentData.transaction_id
      ]
    );
    return result;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

export async function updatePaymentStatus(paymentId: number, status: 'pending' | 'paid' | 'failed' | '', paidAt?: Date) {
  try {
    const [result] = await pool.execute(
      'UPDATE payments SET status = ?, paid_at = ? WHERE id = ?',
      [status, paidAt || null, paymentId]
    );
    return result;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
}

// Subscription operations
export async function createSubscription(subscriptionData: {
  subscriptions_user_id: number;
  plan_id: number;
  payment_id: number;
  status?: 'active' | 'expired' | 'canceled' | 'trial';
  start_date: Date;
  end_date: Date;
}) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO subscriptions (subscriptions_user_id, plan_id, payment_id, status, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
      [
        subscriptionData.subscriptions_user_id,
        subscriptionData.plan_id,
        subscriptionData.payment_id,
        subscriptionData.status || 'active',
        subscriptionData.start_date,
        subscriptionData.end_date
      ]
    );
    return result;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function getUserSubscription(userId: number): Promise<Subscription | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM subscriptions WHERE subscriptions_user_id = ? AND status = "active" ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    return Array.isArray(rows) && rows.length > 0 ? rows[0] as Subscription : null;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    throw error;
  }
} 