import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import MedicineCard from '../components/MedicineCard';
import { colors, radius, spacing, typography } from '../theme/theme';
import { medicines, getInventoryStats } from '../services/MockDatabase';

const FILTERS = ['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Expired'];

export default function InventoryScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const stats = getInventoryStats();

  const data = useMemo(() => {
    return medicines.filter((m) => {
      const matchesFilter = filter === 'All' || m.status === filter;
      const matchesQuery =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.genericName.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Header title="Inventory Check" subtitle="Pharmacy medicine monitoring" />

            <View style={styles.grid}>
              <StatCard icon="clipboard-list-outline" label="Total" value={stats.total} tint={colors.primary} />
              <StatCard icon="check-circle-outline" label="In Stock" value={stats.inStock} tint={colors.success} />
              <StatCard icon="alert-outline" label="Low Stock" value={stats.lowStock} tint={colors.warning} />
              <StatCard icon="close-circle-outline" label="Out of Stock" value={stats.outOfStock} tint={colors.danger} />
              <StatCard icon="calendar-remove-outline" label="Expired" value={stats.expired} tint={colors.primaryDark} />
            </View>

            <View style={styles.searchWrap}>
              <MaterialCommunityIcons name="magnify" size={18} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search medicine or generic name"
                placeholderTextColor={colors.textMuted}
                value={query}
                onChangeText={setQuery}
              />
            </View>

            <View style={styles.filterRow}>
              {FILTERS.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.chip, filter === f && styles.chipActive]}
                  onPress={() => setFilter(f)}
                >
                  <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>{data.length} medicine(s)</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <MedicineCard
              item={item}
              onPress={() => navigation.navigate('MedicineDetail', { id: item.id })}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No medicines match your search.</Text>}
      />
    </View>
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
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    height: 42,
    marginTop: spacing.xs,
  },
  searchInput: { flex: 1, marginLeft: spacing.sm, color: colors.text },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.caption, color: colors.text },
  chipTextActive: { color: '#fff' },
  sectionTitle: {
    ...typography.h3,
    fontSize: 14,
    color: colors.textMuted,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  list: { paddingBottom: spacing.xl },
  cardWrap: { paddingHorizontal: spacing.lg },
  empty: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
});
