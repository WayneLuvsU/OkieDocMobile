import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';

export default function PatientsScreen() {
  const { patients } = useApp();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.contentHeader}>
        <Text style={styles.pageTitle}>My Patients</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search patients by name..."
          placeholderTextColor="#8E8E93"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {patients.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No patients recorded yet.</Text>
          </View>
        ) : (
          patients.map((patient) => {
            const isCompleted = patient.sessionsCompleted === patient.totalSessions;
            return (
              <View key={patient.id} style={styles.cardBox}>
                
                <View style={styles.cardHeader}>
                  <View style={styles.avatarContainer}>
                    {patient.gender === 'Female' ? (
                      <MaterialCommunityIcons name="face-woman-profile" size={50} color="#E83E8C" />
                    ) : (
                      <MaterialCommunityIcons name="face-man-profile" size={50} color="#007BFF" />
                    )}
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{patient.patientName}</Text>
                    <Text style={styles.cardSubtext}>{patient.age} • {patient.gender}</Text>
                    <View style={styles.phoneRow}>
                      <Feather name="phone" size={12} color="#8E8E93" />
                      <Text style={styles.phoneText}>{patient.phone}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.menuButton}>
                    <Feather name="more-vertical" size={20} color="#8E8E93" />
                  </TouchableOpacity>
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
                    <Text style={styles.statValue} numberOfLines={1}>{patient.recentIssue}</Text>
                  </View>
                </View>

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

                <View style={styles.cardFooter}>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity 
                    style={styles.primaryAction}
                    onPress={() => router.push(`/patient/${patient.id}`)}
                  >
                    <Text style={styles.primaryActionText}>View Profile</Text>
                  </TouchableOpacity>
                </View>

              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
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
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  addButton: {
    padding: 8,
    backgroundColor: '#286EF0',
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  cardBox: {
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  cardSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  phoneText: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 4,
  },
  menuButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F4F8',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4A7FB8',
  },
  progressText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E9ECEF',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#286EF0',
    borderRadius: 3,
  },
  progressBarFillComplete: {
    backgroundColor: '#28A745',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F4FAFF',
    borderRadius: 8,
  },
  actionIcon: {
    marginRight: 6,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A7FB8',
  },
  primaryAction: {
    backgroundColor: '#286EF0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primaryActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
