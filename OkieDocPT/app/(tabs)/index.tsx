// Force reload
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';

export default function ReferralsScreen() {
  const router = useRouter();
  const { referrals } = useApp();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Logo */}
        <View style={styles.headerLogoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>O<Text style={styles.logoPlus}>+</Text></Text>
          </View>
          <View style={styles.brandTextContainer}>
            <Text style={styles.brandName}>OkieDoc+</Text>
            <Text style={styles.brandSubtitle}>PT</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.pageTitle}>Referral Queue</Text>

        {/* Referral List */}
        <View style={styles.listContainer}>
          {referrals.length === 0 ? (
            <Text style={styles.emptyText}>No pending referrals.</Text>
          ) : (
            referrals.map((referral) => (
              <TouchableOpacity 
                key={referral.id} 
                style={styles.card} 
                activeOpacity={0.7}
                onPress={() => router.push(`/referral/${referral.id}`)}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.patientName}>{referral.patientName}</Text>
                  <Text style={styles.patientIssue}>{referral.issue}</Text>
                  
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateTimeText}>{referral.age} yrs • {referral.gender}</Text>
                  </View>
                </View>

                <View style={styles.cardRight}>
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                  <View style={styles.chevronContainer}>
                    <Feather name="chevron-right" size={32} color="#000" />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBox: {
    width: 48,
    height: 48,
    backgroundColor: '#20B2AA', // Teal-ish color for O+ box
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '400',
  },
  logoPlus: {
    fontSize: 16,
    lineHeight: 20,
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#000000',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C3F95', // Deep blue
    marginBottom: 24,
  },
  listContainer: {
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#F4FAFF', // Light blue background
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0E4F5', // Slightly darker blue border
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 8,
  },
  patientIssue: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 8,
  },
  dateContainer: {
    marginTop: 'auto',
  },
  dateTimeText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 60,
  },
  newBadge: {
    backgroundColor: '#FFF8DC', // Light yellow
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  newBadgeText: {
    color: '#D49600', // Deep yellow/orange text
    fontSize: 12,
    fontWeight: 'bold',
  },
  chevronContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
});
