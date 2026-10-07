import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadow, typography, statusColor } from '../theme/theme';

export default function ConsultationCard({ item, onPress }) {
  const tint = statusColor(item.status);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.patient?.[0] ?? '?'}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.patient}</Text>
        <Text style={styles.meta}>
          <MaterialCommunityIcons name="doctor" size={12} color={colors.textMuted} /> {item.doctor}
          {'   '}
          <MaterialCommunityIcons name="account-heart" size={12} color={colors.textMuted} /> {item.nurse}
        </Text>
        <Text style={styles.time}>{item.date} · {item.time}</Text>
      </View>

      <View style={[styles.badge, { backgroundColor: `${tint}1A` }]}>
        <Text style={[styles.badgeText, { color: tint }]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  name: { ...typography.h3 },
  meta: { ...typography.caption, marginTop: 2 },
  time: { ...typography.caption, marginTop: 2, color: colors.textMuted },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeText: { fontSize: 11, fontWeight: '700' },
});
