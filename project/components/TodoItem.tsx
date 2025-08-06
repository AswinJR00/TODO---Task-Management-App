import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check, X, Clock } from 'lucide-react-native';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress?: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onPress }: TodoItemProps) {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handlePress = () => {
    if (onPress) {
      onPress(todo);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.todoItem, todo.completed && styles.completedItem]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <TouchableOpacity
          style={[styles.checkbox, todo.completed && styles.checkedBox]}
          onPress={handleToggle}
          activeOpacity={0.8}
        >
          {todo.completed && <Check size={16} color="#FFFFFF" strokeWidth={2.5} />}
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={[styles.title, todo.completed && styles.completedTitle]}>
            {todo.title}
          </Text>
          {todo.description && (
            <Text style={[styles.description, todo.completed && styles.completedDescription]}>
              {todo.description}
            </Text>
          )}
          
          <View style={styles.metadata}>
            <View style={[styles.category, { backgroundColor: todo.category.color + '20' }]}>
              <Text style={[styles.categoryText, { color: todo.category.color }]}>
                {todo.category.name}
              </Text>
            </View>
            
            <View style={[styles.priority, { backgroundColor: todo.priority.color + '20' }]}>
              <Text style={[styles.priorityText, { color: todo.priority.color }]}>
                {todo.priority.name}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <X size={20} color="#EF4444" strokeWidth={2} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  completedItem: {
    opacity: 0.75,
    backgroundColor: '#F9FAFB',
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  checkedBox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    lineHeight: 24,
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  metadata: {
    flexDirection: 'row',
    gap: 10,
  },
  category: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  priority: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  deleteButton: {
    marginLeft: 12,
    marginTop: 2,
    padding: 4,
  },
});