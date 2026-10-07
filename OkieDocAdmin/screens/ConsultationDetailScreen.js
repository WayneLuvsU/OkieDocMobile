import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, typography, shadow, statusColor } from '../theme/theme';
import { consultations } from '../services/MockDatabase';

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

export default function ConsultationDetailScreen({ route }) {
  const { id } = route.params;
  const item = consultations.find((c) => c.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={typography.body}>Consultation not found.</Text>
      </View>
    );
  }

  const tint = statusColor(item.status);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg }}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.patient[0]}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={typography.h2}>{item.patient}</Text>
            <Text style={styles.subtle}>{item.age} yrs old · {item.gender}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: `${tint}1A` }]}>
            <Text style={[styles.badgeText, { color: tint }]}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Clinical Summary</Text>
        <Row icon="alert-circle-outline" label="Symptoms" value={item.symptoms} />
        <Row icon="clipboard-pulse-outline" label="Diagnosis" value={item.diagnosis} />
        <Row icon="pill" label="Medicine" value={item.medicine} />
        <Row icon="run" label="Physical Therapy" value={item.ptRequired ? 'Required' : 'Not Required'} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Assigned Staff</Text>
        <Row icon="doctor" label="Doctor" value={item.doctor} />
        <Row icon="account-heart" label="Nurse" value={item.nurse} />
        <Row icon="calendar-clock" label="Date & Time" value={`${item.date} · ${item.time}`} />
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
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 20 },
  subtle: { ...typography.caption, marginTop: 2 },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.pill },
  badgeText: { fontSize: 11, fontWeight: '700' },
  sectionTitle: { ...typography.h3, marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  rowLabel: { ...typography.caption },
  rowValue: { ...typography.body, marginTop: 1 },
});
