import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ConsultationCard from '../components/ConsultationCard';
import { colors, spacing, typography } from '../theme/theme';
import { consultations } from '../services/MockDatabase';

export default function ArchiveScreen({ navigation }) {
  const completed = consultations.filter((c) => c.status === 'Completed');

  return (
    <View style={styles.container}>
      <Header title="Archive" subtitle={`${completed.length} completed consultation(s)`} />
      <FlatList
        data={completed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ConsultationCard
            item={item}
            onPress={() => navigation.navigate('ConsultationDetail', { id: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No completed consultations yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
