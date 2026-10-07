import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadow, stockStatusColor } from '../theme/theme';
import { medicines } from '../services/MockDatabase';

function Row({ icon, label, value }) {
  return (
    <View style={styles.row}>
      <MaterialCommunityIcons name={icon} size={18} color={colors.textMuted} style={{ width: 26 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function MedicineDetailScreen({ route }) {
  const { id } = route.params;
  const item = medicines.find((m) => m.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={typography.body}>Medicine not found.</Text>
      </View>
    );
  }

  const tint = stockStatusColor(item.status);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={[styles.iconWrap, { backgroundColor: `${tint}1A` }]}>
            <MaterialCommunityIcons name="pill" size={26} color={tint} />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={typography.h2}>{item.name}</Text>
            <Text style={styles.subtle}>{item.genericName}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: `${tint}1A` }]}>
            <Text style={[styles.badgeText, { color: tint }]}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Medicine Information</Text>
        <Row icon="tag-outline" label="Category" value={item.category} />
        <Row icon="prescription" label="Dosage" value={item.dosage} />
        <Row icon="calendar-alert-outline" label="Expiry Date" value={item.expiryDate} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Stock & Supply</Text>
        <Row icon="cube-outline" label="Current Stock" value={`${item.currentStock} unit(s)`} />
        <Row icon="truck-outline" label="Supplier" value={item.supplier} />
        <Row icon="cash" label="Unit Price" value={`₱${item.unitPrice.toFixed(2)}`} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtle: { ...typography.caption, marginTop: 2 },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.pill },
  badgeText: { fontSize: 11, fontWeight: '700' },
  sectionTitle: { ...typography.h3, marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  rowLabel: { ...typography.caption },
  rowValue: { ...typography.body, marginTop: 1 },
});
