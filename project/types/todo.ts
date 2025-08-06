export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  createdAt: Date;
  completedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Priority {
  id: string;
  name: string;
  color: string;
  level: number;
}

export const defaultCategories: Category[] = [
  { id: '1', name: 'Personal', color: '#3B82F6', icon: 'User' },
  { id: '2', name: 'Work', color: '#8B5CF6', icon: 'Briefcase' },
  { id: '3', name: 'Shopping', color: '#10B981', icon: 'ShoppingCart' },
  { id: '4', name: 'Health', color: '#F59E0B', icon: 'Heart' },
];

export const defaultPriorities: Priority[] = [
  { id: '1', name: 'Low', color: '#6B7280', level: 1 },
  { id: '2', name: 'Medium', color: '#F59E0B', level: 2 },
  { id: '3', name: 'High', color: '#EF4444', level: 3 },
];