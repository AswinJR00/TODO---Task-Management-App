import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ChevronRight, FolderOpen, Plus } from 'lucide-react-native';
import { TodoItem } from '@/components/TodoItem';
import { AddTodoModal } from '@/components/AddTodoModal';
import { defaultCategories } from '@/types/todo';
import { useTodos } from '@/hooks/useTodos';

export default function CategoriesScreen() {
  const { todos, addTodo, toggleTodo, deleteTodo, getTodosByCategory } = useTodos();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const selectedCategory = defaultCategories.find(c => c.id === selectedCategoryId);
  const categoryTodos = selectedCategoryId ? getTodosByCategory(selectedCategoryId) : [];

  const renderCategoryList = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeader}>
        <FolderOpen size={24} color="#3B82F6" strokeWidth={2} />
        <Text style={styles.sectionTitle}>Your Categories</Text>
      </View>
      
      {defaultCategories.map((category) => {
        const categoryTodos = getTodosByCategory(category.id);
        const completedCount = categoryTodos.filter(todo => todo.completed).length;
        const totalCount = categoryTodos.length;

        return (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => setSelectedCategoryId(category.id)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryHeader}>
              <View style={styles.categoryInfo}>
                <View style={[styles.categoryColor, { backgroundColor: category.color }]} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
            </View>
            
            <View style={styles.categoryStats}>
              <Text style={styles.statsText}>
                {totalCount} task{totalCount !== 1 ? 's' : ''}
              </Text>
              {totalCount > 0 && (
                <Text style={styles.completedText}>
                  {completedCount} completed
                </Text>
              )}
            </View>

            {totalCount > 0 && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                        backgroundColor: category.color 
                      }
                    ]} 
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderCategoryDetail = () => (
    <View style={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <TouchableOpacity
          onPress={() => setSelectedCategoryId(null)}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Categories</Text>
        </TouchableOpacity>
        
        <View style={styles.categoryDetailTitle}>
          <View style={[styles.categoryColor, { backgroundColor: selectedCategory?.color }]} />
          <Text style={styles.detailTitle}>{selectedCategory?.name}</Text>
        </View>

        <TouchableOpacity
          style={[styles.addCategoryButton, { backgroundColor: selectedCategory?.color }]}
          onPress={() => setShowAddModal(true)}
          activeOpacity={0.8}
        >
          <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.categoryTodos}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.todoListContent}
      >
        {categoryTodos.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No tasks in this category</Text>
            <Text style={styles.emptyDescription}>
              Add your first task to get started
            </Text>
          </View>
        ) : (
          categoryTodos.map((todo) => (
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedCategory ? selectedCategory.name : 'Categories'}
        </Text>
      </View>

      {selectedCategoryId ? renderCategoryDetail() : renderCategoryList()}

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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 10,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 14,
  },
  categoryName: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  categoryStats: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 14,
  },
  statsText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  completedText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
  categoryDetailTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  detailTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  categoryTodos: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  todoListContent: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});