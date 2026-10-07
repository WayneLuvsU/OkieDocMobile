import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';

export default function AppointmentsScreen() {
  const { appointments, patients } = useApp();
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
        <Text style={styles.pageTitle}>Appointments</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={20} color="#1C3F95" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search by patient or date"
          placeholderTextColor="#8E8E93"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {appointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No appointments scheduled yet.</Text>
          </View>
        ) : (
          appointments.map((apt) => (
            <View key={apt.id} style={styles.cardBox}>
              <View style={styles.cardHeader}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateBadgeMonth}>{apt.date.split(' ')[0]}</Text>
                  <Text style={styles.dateBadgeDay}>{apt.date.split(' ')[1]?.replace(',', '')}</Text>
                </View>
                <View style={styles.cardHeaderRight}>
                  <View style={[
                    styles.statusBadge, 
                    apt.status.toLowerCase() === 'booked' ? styles.statusBooked : 
                    apt.status.toLowerCase() === 'pending' ? styles.statusPending : styles.statusSession
                  ]}>
                    <Text style={[
                      styles.statusText,
                      apt.status.toLowerCase() === 'booked' ? styles.statusTextBooked : 
                      apt.status.toLowerCase() === 'pending' ? styles.statusTextPending : styles.statusTextSession
                    ]}>{apt.status}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.avatarContainer}>
                  {apt.gender === 'Female' ? (
                    <MaterialCommunityIcons name="face-woman-profile" size={40} color="#E83E8C" />
                  ) : (
                    <MaterialCommunityIcons name="face-man-profile" size={40} color="#007BFF" />
                  )}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{apt.patientName}</Text>
                  <Text style={styles.cardSubtext}>{apt.therapyType}</Text>
                  <Text style={styles.cardTextLight}>{apt.issue}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.footerItem}>
                  <Feather name="clock" size={16} color="#4A7FB8" />
                  <Text style={styles.footerText}>{apt.time}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => {
                    const patient = patients.find(p => p.patientName === apt.patientName);
                    if (patient) {
                      router.push(`/patient/${patient.id}`);
                    }
                  }}
                >
                  <Text style={styles.actionButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
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
  filterButton: {
    padding: 8,
    backgroundColor: '#F4FAFF',
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
    paddingBottom: 12,
  },
  dateBadge: {
    backgroundColor: '#F4FAFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateBadgeMonth: {
    fontSize: 12,
    color: '#4A7FB8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  dateBadgeDay: {
    fontSize: 20,
    color: '#1C3F95',
    fontWeight: 'bold',
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBooked: {
    backgroundColor: '#E8F5E9',
  },
  statusTextBooked: {
    color: '#28A745',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusTextPending: {
    color: '#FF9800',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusSession: {
    backgroundColor: '#E3F2FD',
  },
  statusTextSession: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    fontSize: 15,
    color: '#4A7FB8',
    marginTop: 2,
    fontWeight: '600',
  },
  cardTextLight: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginLeft: 6,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    color: '#286EF0',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
