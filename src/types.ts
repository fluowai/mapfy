export interface Agency {
  id: string;
  name: string;
  logo?: string;
  colors?: {
    primary: string;
    secondary: string;
  };
  createdAt: string;
}

export interface User {
  id: string;
  agencyId: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Client {
  id: string;
  agencyId: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'lead' | 'proposal' | 'active';
  createdAt: string;
}

export interface Location {
  id: string;
  clientId: string;
  agencyId: string;
  name: string;
  address: string;
  placeId?: string;
  status: 'active' | 'inactive';
  score?: number;
  lastAuditAt?: string;
  createdAt: string;
}

export interface Audit {
  id: string;
  locationId: string;
  agencyId: string;
  score: number;
  items: AuditItem[];
  opportunities: string[];
  createdAt: string;
}

export interface AuditItem {
  title: string;
  status: 'success' | 'warning' | 'error';
  description: string;
}

export interface Review {
  id: string;
  locationId: string;
  authorName: string;
  rating: number;
  comment: string;
  replied: boolean;
  reply?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  locationId: string;
  content: string;
  status: 'scheduled' | 'published';
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  agencyId: string;
  locationId?: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
  createdAt: string;
}

export type AlertType = 'keyword' | 'disabled' | 'hours' | 'rating_drop';
export type NotificationChannel = 'dashboard' | 'email' | 'whatsapp';

export interface AlertConfig {
  id: string;
  agencyId: string;
  locationId?: string;
  name: string;
  type: AlertType;
  active: boolean;
  channels: NotificationChannel[];
  conditions: {
    keywords?: string[];
    dropPercentage?: number;
    daysRange?: number;
  };
  createdAt: string;
}

export interface Notification {
  id: string;
  agencyId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

