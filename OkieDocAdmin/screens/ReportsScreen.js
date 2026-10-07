import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors, radius, spacing, typography, shadow } from '../theme/theme';
import { getStats } from '../services/MockDatabase';

function Bar({ label, value, max, tint }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: tint }]} />
      </View>
      <Text style={styles.barValue}>{value}</Text>
    </View>
  );
}

export default function ReportsScreen() {
  const stats = getStats();
  const max = stats.totalPatients || 1;

  return (
    <ScrollView style={styles.container}>
      <Header title="Reports" subtitle="Daily Summary" />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Consultation Breakdown</Text>
        <Bar label="Total" value={stats.totalPatients} max={max} tint={colors.primary} />
        <Bar label="Pending" value={stats.pending} max={max} tint={colors.warning} />
        <Bar label="Approved" value={stats.approved} max={max} tint={colors.secondary} />
        <Bar label="Completed" value={stats.completed} max={max} tint={colors.success} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Other Activity</Text>
        <Bar label="Pharmacy Releases" value={stats.pharmacyReleases} max={max} tint={colors.danger} />
        <Bar label="PT Referrals" value={stats.ptReferrals} max={max} tint={colors.secondary} />
      </View>

      <TouchableOpacity
        style={styles.exportButton}
        activeOpacity={0.85}
        onPress={() => Alert.alert('Export', 'PDF export will be wired up once the reporting module is finalized.')}
      >
        <MaterialCommunityIcons name="file-export-outline" size={18} color="#fff" />
        <Text style={styles.exportText}>Export PDF</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    ...shadow,
  },
  sectionTitle: { ...typography.h3, marginBottom: spacing.md },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  barLabel: { width: 100, ...typography.caption },
  barTrack: {
    flex: 1,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: radius.pill },
  barValue: { width: 24, textAlign: 'right', ...typography.caption },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    borderRadius: radius.sm,
    height: 46,
  },
  exportText: { color: '#fff', fontWeight: '700', marginLeft: spacing.sm },
});
