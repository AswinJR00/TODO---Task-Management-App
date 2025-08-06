import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Plus, Calendar } from 'lucide-react-native';
import { TodoItem } from '@/components/TodoItem';
import { AddTodoModal } from '@/components/AddTodoModal';
import { ProgressBar } from '@/components/ProgressBar';
import { SearchBar } from '@/components/SearchBar';
import { useTodos } from '@/hooks/useTodos';

export default function HomeScreen() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodos = useMemo(() => {
    if (!searchQuery.trim()) return todos;
    
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todos, searchQuery]);

  const completedCount = filteredTodos.filter(todo => todo.completed).length;
  const totalCount = filteredTodos.length;

  const formatDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.dateSection}>
            <Calendar size={24} color="#3B82F6" strokeWidth={2} />
            <View style={styles.dateText}>
              <Text style={styles.greeting}>Today</Text>
              <Text style={styles.date}>{formatDate()}</Text>
            </View>
          </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <ProgressBar
          completed={completedCount}
          total={totalCount}
          label="Today's Progress"
        />

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search your tasks..."
        />

        <ScrollView 
          style={styles.todoList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.todoListContent}
        >
          {filteredTodos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                {searchQuery ? 'No tasks found' : 'No tasks yet'}
              </Text>
              <Text style={styles.emptyDescription}>
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Tap the + button to add your first task'
                }
              </Text>
            </View>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </ScrollView>
      </View>

      <AddTodoModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    lineHeight: 28,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  addButton: {
    width: 52,
    height: 52,
    backgroundColor: '#3B82F6',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  todoList: {
    flex: 1,
  },
  todoListContent: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});