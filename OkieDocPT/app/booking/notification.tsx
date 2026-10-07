import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/*
 * TODO (Integration):
 * This screen represents the notification sent to PT staff.
 * If you have a real backend, you might want to trigger a push notification
 * or email to the staff at the same time the booking is confirmed (or let the
 * backend handle it automatically).
 * This screen could also poll the backend for real-time status updates 
 * (e.g., waiting for PT staff to accept the appointment).
 */
export default function NotificationScreen() {
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

      <View style={styles.content}>
        
        {/* Bell Icon */}
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name="bell" size={120} color="#00AEEF" />
          {/* Ringing lines */}
          <View style={[styles.ringLine, { top: -20, left: 10, transform: [{ rotate: '-45deg' }] }]} />
          <View style={[styles.ringLine, { top: -40, left: 40, transform: [{ rotate: '-20deg' }] }]} />
          <View style={[styles.ringLine, { top: -40, right: 40, transform: [{ rotate: '20deg' }] }]} />
        </View>

        <Text style={styles.title}>New Appointment{'\n'}Received</Text>
        <Text style={styles.subtitle}>PT staff will be notified about{'\n'}the new booking.</Text>

        <View style={styles.infoBox}>
          <View style={styles.checkIconContainer}>
            <MaterialCommunityIcons name="check-circle-outline" size={32} color="#28A745" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>Appointment details are{'\n'}sent to the PT Module{'\n'}for confirmation</Text>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80, // Offset a bit to keep it centered visually
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 40,
  },
  ringLine: {
    position: 'absolute',
    width: 4,
    height: 24,
    backgroundColor: '#1C3F95',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3F95',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7FB8',
    textAlign: 'center',
    marginBottom: 40,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F5EB',
    borderWidth: 2,
    borderColor: '#28A745',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: '100%',
  },
  checkIconContainer: {
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C3F95',
    lineHeight: 20,
  },
});
