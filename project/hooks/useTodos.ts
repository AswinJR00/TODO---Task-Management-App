import { useState, useEffect } from 'react';
import { Todo, defaultCategories, defaultPriorities } from '@/types/todo';

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete project presentation',
    description: 'Prepare slides for the quarterly review meeting',
    completed: false,
    category: defaultCategories[1], // Work
    priority: defaultPriorities[2], // High
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, and vegetables',
    completed: false,
    category: defaultCategories[2], // Shopping
    priority: defaultPriorities[1], // Medium
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Morning workout',
    description: '30 minutes cardio and strength training',
    completed: true,
    category: defaultCategories[3], // Health
    priority: defaultPriorities[0], // Low
    createdAt: new Date(),
    completedAt: new Date(),
  },
  {
    id: '4',
    title: 'Call mom',
    description: 'Weekly check-in call',
    completed: false,
    category: defaultCategories[0], // Personal
    priority: defaultPriorities[1], // Medium
    createdAt: new Date(),
  },
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);

  const addTodo = (title: string, description: string, categoryId: string, priorityId: string) => {
    const category = defaultCategories.find(c => c.id === categoryId) || defaultCategories[0];
    const priority = defaultPriorities.find(p => p.id === priorityId) || defaultPriorities[0];
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      category,
      priority,
      createdAt: new Date(),
    };

    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date() : undefined
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const getTodosByCategory = (categoryId: string) => {
    return todos.filter(todo => todo.category.id === categoryId);
  };

  const getCompletedTodos = () => {
    return todos.filter(todo => todo.completed);
  };

  const getPendingTodos = () => {
    return todos.filter(todo => !todo.completed);
  };

  const getTodaysTodos = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return todos.filter(todo => {
      const todoDate = new Date(todo.createdAt);
      todoDate.setHours(0, 0, 0, 0);
      return todoDate.getTime() === today.getTime();
    });
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    getTodosByCategory,
    getCompletedTodos,
    getPendingTodos,
    getTodaysTodos,
  };
}