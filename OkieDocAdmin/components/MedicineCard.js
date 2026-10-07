import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadow, typography, stockStatusColor } from '../theme/theme';

export default function MedicineCard({ item, onPress }) {
  const tint = stockStatusColor(item.status);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.iconWrap, { backgroundColor: `${tint}1A` }]}>
        <MaterialCommunityIcons name="pill" size={20} color={tint} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>{item.category}</Text>
        <Text style={styles.stock}>Stock: {item.currentStock}</Text>
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
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  name: { ...typography.h3 },
  meta: { ...typography.caption, marginTop: 2 },
  stock: { ...typography.caption, marginTop: 2, color: colors.textMuted },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeText: { fontSize: 11, fontWeight: '700' },
});
