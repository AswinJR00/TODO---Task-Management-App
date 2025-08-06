import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { User, Bell, Palette, Settings, CircleHelp as HelpCircle, Star, ChevronRight, Award, TrendingUp, Target } from 'lucide-react-native';
import { useTodos } from '@/hooks/useTodos';

interface StatCardProps {
  title: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, color, icon }: StatCardProps) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <View style={styles.statHeader}>
          {icon}
          <Text style={styles.statValue}>{value}</Text>
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

function MenuItem({ icon, title, subtitle, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { todos, getCompletedTodos, getPendingTodos } = useTodos();
  
  const completedTodos = getCompletedTodos();
  const pendingTodos = getPendingTodos();
  const completionRate = todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <User size={24} color="#3B82F6" strokeWidth={2} />
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User size={36} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.sectionHeader}>
            <Target size={20} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Your Stats</Text>
          </View>
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Tasks"
              value={todos.length.toString()}
              color="#3B82F6"
              icon={<Award size={18} color="#3B82F6" strokeWidth={2} />}
            />
            <StatCard
              title="Completed"
              value={completedTodos.length.toString()}
              color="#10B981"
              icon={<Star size={18} color="#10B981" strokeWidth={2} />}
            />
            <StatCard
              title="Pending"
              value={pendingTodos.length.toString()}
              color="#F59E0B"
              icon={<TrendingUp size={18} color="#F59E0B" strokeWidth={2} />}
            />
            <StatCard
              title="Completion Rate"
              value={`${completionRate}%`}
              color="#8B5CF6"
              icon={<Target size={18} color="#8B5CF6" strokeWidth={2} />}
            />
          </View>
        </View>

        <View style={styles.menuSection}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Settings</Text>
          </View>
          
          <MenuItem
            icon={<Bell size={22} color="#6B7280" strokeWidth={2} />}
            title="Notifications"
            subtitle="Manage your reminders"
          />
          
          <MenuItem
            icon={<Palette size={22} color="#6B7280" strokeWidth={2} />}
            title="Appearance"
            subtitle="Theme and display settings"
          />
          
          <MenuItem
            icon={<Target size={22} color="#6B7280" strokeWidth={2} />}
            title="General Settings"
            subtitle="App preferences"
          />
          
          <MenuItem
            icon={<HelpCircle size={22} color="#6B7280" strokeWidth={2} />}
            title="Help & Support"
            subtitle="Get help and send feedback"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>TodoDo v1.0.0</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for productivity</Text>
        </View>
      </ScrollView>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 36,
  },
  avatar: {
    width: 88,
    height: 88,
    backgroundColor: '#3B82F6',
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  userName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statsSection: {
    marginBottom: 36,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    width: '48%',
    borderLeftWidth: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statTitle: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    textAlign: 'center',
  },
  menuSection: {
    marginBottom: 36,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  menuIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    marginRight: 14,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 3,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
    marginBottom: 6,
  },
  footerSubtext: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
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