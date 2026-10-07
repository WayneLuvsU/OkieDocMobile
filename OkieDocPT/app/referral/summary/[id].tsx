import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useApp } from '@/context/AppContext';

export default function AppointmentSummaryScreen() {
  const { id, date, time, therapistName, therapistTitle, notes } = useLocalSearchParams();
  const router = useRouter();
  const { referrals } = useApp();

  const data = referrals.find((r) => r.id === id) || referrals[0];

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
        
        <Text style={styles.pageTitle}>Schedule Appointment</Text>

        {/* Form Container */}
        <View style={styles.formContainer}>
          
          {/* Patient Section */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Patient</Text>
            <View style={styles.cardBox}>
              <View style={styles.avatarContainer}>
                {data.gender === 'Female' ? (
                  <MaterialCommunityIcons name="face-woman-profile" size={50} color="#E83E8C" />
                ) : (
                  <MaterialCommunityIcons name="face-man-profile" size={50} color="#007BFF" />
                )}
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{data.patientName}</Text>
                <Text style={styles.cardSubtext}>{data.age} • {data.gender}</Text>
                <Text style={styles.cardTextLight}>{data.issue}</Text>
              </View>
            </View>
          </View>

          {/* Therapy Type Section */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Therapy Type</Text>
            <View style={styles.cardBoxCentered}>
              <MaterialCommunityIcons name="human-handsup" size={32} color="#000" style={styles.iconMargin} />
              <Text style={styles.cardTitle}>{data.therapyType}</Text>
            </View>
          </View>

          {/* Therapist Section */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Therapist</Text>
            <View style={styles.cardBoxCentered}>
              <MaterialCommunityIcons name="doctor" size={40} color="#007BFF" style={styles.iconMargin} />
              <View style={styles.therapistInfoCentered}>
                <Text style={styles.cardTitle}>{therapistName || 'Johnson, PT'}</Text>
                <Text style={styles.cardTextLight}>{therapistTitle || 'Physical Therapist'}</Text>
              </View>
            </View>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Date Row */}
          <View style={styles.row}>
            <Text style={styles.fieldLabel}>Date</Text>
            <Text style={styles.rowValue}>{date || 'May 23, 2026'}</Text>
          </View>

          {/* Time Row */}
          <View style={styles.row}>
            <Text style={styles.fieldLabel}>Time</Text>
            <Text style={styles.rowValue}>{time || '10:00 AM'}</Text>
          </View>

          {/* Notes */}
          <View style={styles.notesSection}>
            <Text style={styles.fieldLabel}>Notes</Text>
            <Text style={styles.notesValue}>
              {notes || 'Patient needs core strengthening and posture training'}
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* Sticky Bottom Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push({
            pathname: `/referral/success/${id}`,
            params: { 
              patientName: data.patientName,
              date,
              time,
              therapistName,
              therapistTitle,
              notes
            }
          })}
        >
          <Text style={styles.primaryButtonText}>Confirm Appointment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 24,
  },
  formContainer: {
    gap: 16,
  },
  fieldSection: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7FB8',
  },
  cardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  cardBoxCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
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
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  cardSubtext: {
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 2,
  },
  cardTextLight: {
    fontSize: 15,
    color: '#B0B0B0',
    marginTop: 2,
  },
  iconMargin: {
    marginRight: 12,
  },
  therapistInfoCentered: {
    alignItems: 'center',
  },
  spacer: {
    height: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  notesSection: {
    marginTop: 8,
    gap: 4,
  },
  notesValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C3F95',
    lineHeight: 22,
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
    gap: 16,
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
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#286EF0',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
