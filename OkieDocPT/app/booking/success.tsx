import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/*
 * TODO (Integration):
 * The booking success screen is currently displaying hardcoded data ("May 23, 2026", "10:00 AM", etc.).
 * After successfully posting the appointment to your backend:
 * 1. Pass the confirmed appointment details back to this screen (via context, Redux, or params).
 * 2. Display the actual booked Date, Time, and Therapist Name from the backend response.
 * 3. Ensure the newly booked appointment is pushed into your global "Appointments" array
 *    (e.g., in AppContext) so it shows up in the Appointments tab.
 */
export default function BookingSuccessScreen() {
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

      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContent}>
        
        {/* Success Icon */}
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name="star-four-points-outline" size={16} color="#A3D4B6" style={[styles.sparkle, { top: 20, left: 40 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={12} color="#A3D4B6" style={[styles.sparkle, { top: 60, left: 10 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={18} color="#A3D4B6" style={[styles.sparkle, { bottom: 30, left: 20 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={16} color="#A3D4B6" style={[styles.sparkle, { bottom: 10, right: 30 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={14} color="#A3D4B6" style={[styles.sparkle, { bottom: 50, right: 10 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={16} color="#A3D4B6" style={[styles.sparkle, { top: 30, right: 20 }]} />
          
          <View style={styles.successCircle}>
            <MaterialCommunityIcons name="check" size={100} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your appointment has been{'\n'}successfully booked.</Text>

        <View style={styles.cardBox}>
          
          {/* Date */}
          <View style={styles.summaryItem}>
            <View style={styles.iconContainer}>
              <Feather name="calendar" size={28} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>May 23, 2026</Text>
            </View>
          </View>

          {/* Time */}
          <View style={styles.summaryItem}>
            <View style={styles.iconContainer}>
              <Feather name="clock" size={28} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>10:00 AM</Text>
            </View>
          </View>

          {/* Therapist */}
          <View style={styles.summaryItemNoBorder}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="face-woman-profile" size={34} color="#E83E8C" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Johnson, PT</Text>
            </View>
          </View>

        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/booking/notification')}
          >
            <Text style={styles.primaryButtonText}>View My Appointment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.secondaryButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
        
      </View>

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
    marginBottom: 16,
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
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingBottom: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'relative',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#28A745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkle: {
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A7FB8',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardBox: {
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginBottom: 24,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryItemNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  actionButtonsContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#286EF0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D0E4F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  secondaryButtonText: {
    color: '#286EF0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
