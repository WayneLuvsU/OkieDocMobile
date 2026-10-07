import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ConsultationCard from '../components/ConsultationCard';
import { colors, spacing, typography } from '../theme/theme';
import { consultations, getStats, admin } from '../services/MockDatabase';

export default function DashboardScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const stats = getStats();
  const recent = consultations.slice(0, 3);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800); // mock network delay
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Header title={`Good Morning, ${admin.name.split(' ')[0]}`} subtitle="Today's Overview" />

      <View style={styles.grid}>
        <StatCard icon="account-group" label="Patients" value={stats.totalPatients} tint={colors.primary} />
        <StatCard icon="stethoscope" label="Consultations" value={stats.todaysConsultations} tint={colors.secondary} />
        <StatCard icon="clock-outline" label="Pending" value={stats.pending} tint={colors.warning} />
        <StatCard icon="check-circle-outline" label="Approved" value={stats.approved} tint={colors.secondary} />
        <StatCard icon="check-decagram" label="Completed" value={stats.completed} tint={colors.success} />
        <StatCard icon="pill" label="Pharmacy Releases" value={stats.pharmacyReleases} tint={colors.danger} />
      </View>

      <Text style={styles.sectionTitle}>Recent Consultations</Text>
      {recent.map((item) => (
        <ConsultationCard
          key={item.id}
          item={item}
          onPress={() => navigation.navigate('ConsultationDetail', { id: item.id })}
        />
      ))}

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    fontSize: 17,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
});
