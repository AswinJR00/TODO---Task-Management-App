import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, Plus } from 'lucide-react-native';
import { defaultCategories, defaultPriorities } from '@/types/todo';

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string, categoryId: string, priorityId: string) => void;
}

const { width } = Dimensions.get('window');

export function AddTodoModal({ visible, onClose, onAdd }: AddTodoModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(defaultCategories[0].id);
  const [selectedPriorityId, setSelectedPriorityId] = useState(defaultPriorities[1].id);

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title.trim(), description.trim(), selectedCategoryId, selectedPriorityId);
      setTitle('');
      setDescription('');
      setSelectedCategoryId(defaultCategories[0].id);
      setSelectedPriorityId(defaultPriorities[1].id);
      onClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSelectedCategoryId(defaultCategories[0].id);
    setSelectedPriorityId(defaultPriorities[1].id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Task</Text>
          <TouchableOpacity
            onPress={handleAdd}
            style={[styles.addButton, !title.trim() && styles.addButtonDisabled]}
            disabled={!title.trim()}
            activeOpacity={0.8}
          >
            <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="What needs to be done?"
              placeholderTextColor="#9CA3AF"
              autoFocus
              returnKeyType="next"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Add more details..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              returnKeyType="done"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.optionsGrid}>
              {defaultCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.optionButton,
                    selectedCategoryId === category.id && [
                      styles.selectedOption,
                      { borderColor: category.color }
                    ]
                  ]}
                  onPress={() => setSelectedCategoryId(category.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.optionColor, { backgroundColor: category.color }]} />
                  <Text style={[
                    styles.optionText,
                    selectedCategoryId === category.id && { color: category.color }
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.optionsGrid}>
              {defaultPriorities.map((priority) => (
                <TouchableOpacity
                  key={priority.id}
                  style={[
                    styles.optionButton,
                    selectedPriorityId === priority.id && [
                      styles.selectedOption,
                      { borderColor: priority.color }
                    ]
                  ]}
                  onPress={() => setSelectedPriorityId(priority.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.optionColor, { backgroundColor: priority.color }]} />
                  <Text style={[
                    styles.optionText,
                    selectedPriorityId === priority.id && { color: priority.color }
                  ]}>
                    {priority.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#3B82F6',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    marginBottom: 28,
  },
  label: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: (width - 68) / 2,
  },
  selectedOption: {
    borderWidth: 2,
    backgroundColor: '#F8FAFC',
  },
  optionColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
});