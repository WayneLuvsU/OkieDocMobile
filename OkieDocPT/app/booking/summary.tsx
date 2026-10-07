import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/*
 * TODO (Integration):
 * This summary screen currently uses hardcoded text to display the appointment details.
 * In a real application, you should:
 * 1. Retrieve the booked details (Therapy Type, Therapist Name, Date, Time, Notes)
 *    from a global state (e.g. AppContext), a Redux store, or via URL parameters.
 * 2. When the user taps "Confirm Booking", you should submit a POST request to your
 *    backend API (e.g., `/api/appointments`) to officially save the booking in the database.
 *    Only navigate to the Success screen if the API returns a 200 OK.
 */
export default function BookingSummaryScreen() {
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Choose Date & Time</Text>
        <Text style={styles.pageSubtitle}>Please review your appointment details before confirming</Text>

        <View style={styles.cardBox}>
          
          {/* Therapy Type */}
          <View style={styles.summaryItem}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="human-handsup" size={32} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Therapy Type</Text>
              <Text style={styles.itemSubtitle}>Physical Therapy</Text>
            </View>
          </View>

          {/* Therapist */}
          <View style={styles.summaryItem}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="face-woman-profile" size={36} color="#E83E8C" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Therapist</Text>
              <Text style={styles.itemSubtitle}>Johnson, PT</Text>
            </View>
          </View>

          {/* Date */}
          <View style={styles.summaryItem}>
            <View style={styles.iconContainer}>
              <Feather name="calendar" size={30} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Date</Text>
              <Text style={styles.itemSubtitle}>May 23, 2026</Text>
            </View>
          </View>

          {/* Time */}
          <View style={styles.summaryItemNoBorder}>
            <View style={styles.iconContainer}>
              <Feather name="clock" size={30} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Time</Text>
              <Text style={styles.itemSubtitle}>10:00 AM</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/booking/success')}
        >
          <Text style={styles.primaryButtonText}>Confirm Booking</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7FB8',
    marginBottom: 32,
  },
  cardBox: {
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 16,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#4A7FB8',
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D0E4F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#286EF0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryButton: {
    flex: 1,
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
});
