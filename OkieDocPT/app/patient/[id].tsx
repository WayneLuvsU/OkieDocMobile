import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useApp } from '@/context/AppContext';

export default function PatientProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { patients } = useApp();

  const patient = patients.find((p) => p.id === id) || patients[0];

  if (!patient) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Patient not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isCompleted = patient.sessionsCompleted === patient.totalSessions;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
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

        {/* Back Button & Title */}
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.pageTitle}>Patient Profile</Text>

        <View style={styles.cardBox}>
          
          <View style={styles.cardHeader}>
            <View style={styles.avatarContainer}>
              {patient.gender === 'Female' ? (
                <MaterialCommunityIcons name="face-woman-profile" size={70} color="#E83E8C" />
              ) : (
                <MaterialCommunityIcons name="face-man-profile" size={70} color="#007BFF" />
              )}
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{patient.patientName}</Text>
              <Text style={styles.cardSubtext}>{patient.age} yrs • {patient.gender}</Text>
              <View style={styles.phoneRow}>
                <Feather name="phone" size={14} color="#8E8E93" />
                <Text style={styles.phoneText}>{patient.phone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Active Therapy</Text>
              <Text style={styles.statValue}>{patient.activeTherapy}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Recent Issue</Text>
              <Text style={styles.statValue}>{patient.recentIssue}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Sessions Progress</Text>
              <Text style={styles.progressText}>
                {patient.sessionsCompleted} / {patient.totalSessions}
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${(patient.sessionsCompleted / patient.totalSessions) * 100}%` },
                  isCompleted && styles.progressBarFillComplete
                ]} 
              />
            </View>
          </View>
        </View>

      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.primaryButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  logoBox: {
    width: 48,
    height: 48,
    backgroundColor: '#20B2AA',
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 24,
  },
  cardBox: {
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  cardSubtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  phoneText: {
    fontSize: 15,
    color: '#8E8E93',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F4F8',
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statItem: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E9ECEF',
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E93',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  progressSection: {
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A7FB8',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#286EF0',
    borderRadius: 4,
  },
  progressBarFillComplete: {
    backgroundColor: '#28A745',
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#286EF0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    fontStyle: 'italic',
  }
});
