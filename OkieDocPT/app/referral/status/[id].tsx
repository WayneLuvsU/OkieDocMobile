import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useApp } from '@/context/AppContext';

const STATUS_OPTIONS = [
  { id: 'pending', label: 'Pending' },
  { id: 'booked', label: 'Booked' },
  { id: 'in_session', label: 'In Session' },
  { id: 'completed', label: 'Completed' },
  { id: 'discharged', label: 'Discharged' },
];

export default function UpdateStatusScreen() {
  const params = useLocalSearchParams();
  const { id, date, time } = params;
  const router = useRouter();
  const { referrals, processReferral } = useApp();
  
  // Default selected status is 'booked' based on the screenshot
  const [selectedStatus, setSelectedStatus] = useState('booked');

  const data = referrals.find((r) => r.id === id) || referrals[0];

  const handleSave = () => {
    /*
     * TODO (Integration):
     * Currently, `processReferral` just updates the local React context to simulate
     * the referral being processed and moved to the appointments/patients list.
     * In a real application:
     * 1. You should make a POST or PUT request to your API to update the referral status
     *    and officially schedule the appointment (e.g., `POST /api/appointments`).
     * 2. Handle loading states and errors while the request is in-flight.
     * 3. Only call `processReferral(referral, dateStr, timeStr)` and `router.navigate` 
     *    if the backend request succeeds.
     */
    if (data) {
      processReferral(
        id as string, 
        {
          date: date || 'May 25, 2026',
          time: time || '10:00 AM',
          status: selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1).replace('_', ' ')
        }, 
        {
          phone: '+63 912 345 6789',
          totalSessions: 10
        }
      );
      router.push('/(tabs)/appointments');
    } else {
      router.push('/(tabs)/appointments');
    }
  };

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
        
        <Text style={styles.pageTitle}>Update Therapy Status</Text>

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

          {/* Current Status Timeline */}
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Current Status</Text>
            
            <View style={styles.timelineContainer}>
              {/* Vertical Line spanning the items */}
              <View style={styles.timelineLine} />

              {STATUS_OPTIONS.map((status) => {
                const isSelected = selectedStatus === status.id;
                return (
                  <TouchableOpacity 
                    key={status.id} 
                    style={styles.timelineItem}
                    activeOpacity={0.7}
                    onPress={() => setSelectedStatus(status.id)}
                  >
                    <View style={styles.timelineIconContainer}>
                      <View style={[styles.timelineCircle, isSelected && styles.timelineCircleSelected]} />
                    </View>
                    <Text style={[styles.timelineLabel, isSelected && styles.timelineLabelSelected]}>
                      {status.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

          </View>

        </View>
      </ScrollView>

      {/* Sticky Bottom Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleSave}
        >
          <Text style={styles.primaryButtonText}>Save Status</Text>
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
    gap: 12,
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
  timelineContainer: {
    position: 'relative',
    marginTop: 8,
    paddingLeft: 4,
  },
  timelineLine: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 17, // center of the circle
    width: 2,
    backgroundColor: '#9E9E9E',
    zIndex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    zIndex: 2,
  },
  timelineIconContainer: {
    width: 28,
    alignItems: 'center',
    marginRight: 16,
  },
  timelineCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    backgroundColor: '#FFFFFF',
  },
  timelineCircleSelected: {
    borderWidth: 4,
    borderColor: '#28A745',
  },
  timelineLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  timelineLabelSelected: {
    color: '#28A745',
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
