import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors, radius, spacing, typography, shadow } from '../theme/theme';
import { admin } from '../services/MockDatabase';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Profile" />

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{admin.name[0]}</Text>
        </View>
        <Text style={styles.name}>{admin.name}</Text>
        <Text style={styles.department}>{admin.department}</Text>
        <Text style={styles.email}>{admin.email}</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.85}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
      >
        <MaterialCommunityIcons name="logout" size={18} color={colors.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadow,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 26 },
  name: { ...typography.h2 },
  department: { ...typography.body, color: colors.textMuted, marginTop: 2 },
  email: { ...typography.caption, marginTop: 4 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    borderRadius: radius.sm,
    height: 46,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutText: { color: colors.danger, fontWeight: '700', marginLeft: spacing.sm },
});
