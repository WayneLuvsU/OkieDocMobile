import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';

export default function SuccessScreen() {
  const params = useLocalSearchParams();
  const { id, patientName } = params;
  const router = useRouter();

  const name = patientName || 'Maria Santos';

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
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

      {/* Back Button */}
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        
        {/* Success Icon */}
        <View style={styles.iconWrapper}>
          {/* Sparkles (simplified layout using absolute positioning) */}
          <MaterialCommunityIcons name="star-four-points-outline" size={16} color="#A3D4B6" style={[styles.sparkle, { top: 20, left: 20 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={12} color="#A3D4B6" style={[styles.sparkle, { top: 60, left: 0 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={18} color="#A3D4B6" style={[styles.sparkle, { bottom: 30, left: 10 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={14} color="#A3D4B6" style={[styles.sparkle, { bottom: -10, left: 50 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={16} color="#A3D4B6" style={[styles.sparkle, { bottom: -10, right: 50 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={14} color="#A3D4B6" style={[styles.sparkle, { bottom: 30, right: 10 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={16} color="#A3D4B6" style={[styles.sparkle, { top: 60, right: 0 }]} />
          <MaterialCommunityIcons name="star-four-points-outline" size={12} color="#A3D4B6" style={[styles.sparkle, { top: 20, right: 20 }]} />
          
          <View style={styles.successCircle}>
            <MaterialCommunityIcons name="check" size={120} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>Patient Notified!</Text>
        <Text style={styles.subtitle}>
          {name} has been{'\n'}notified about the{'\n'}appointment.
        </Text>

        {/* Notification Type Card */}
        <View style={styles.cardBox}>
          <Text style={styles.cardTitle}>Notification Type</Text>
          <Text style={styles.cardSubtext}>SMS • In-App</Text>
        </View>
      </View>

      {/* Sticky Bottom Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => {
            if (id) {
              router.push({
                pathname: `/referral/status/${id}`,
                params
              });
            } else {
              router.push('/referral/status/1');
            }
          }}
        >
          <Text style={styles.primaryButtonText}>Send Notification</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/')}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 20,
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#28A745', // Green color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  sparkle: {
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C3F95',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  cardBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  cardSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#286EF0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#286EF0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
