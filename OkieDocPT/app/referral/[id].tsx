import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

// MOCK DATA for placeholders
const REFERRALS_DATA: Record<string, any> = {
  '1': {
    patientName: 'Maria Santos',
    age: 35,
    gender: 'Female',
    phone: '0912 345 6789',
    issue: 'Lower back pain',
    doctorName: 'Dr. James Lee',
    dateReferred: 'May 21, 2026',
    notes: 'Patient needs core strengthening and posture training',
    recommendedTherapy: 'Physical Therapy',
  },
  '2': {
    patientName: 'Juan Dela Cruz',
    age: 42,
    gender: 'Male',
    phone: '0912 987 6543',
    issue: 'Knee injury',
    doctorName: 'Dr. Ana Reyes',
    dateReferred: 'May 22, 2026',
    notes: 'Patient requires post-op rehabilitation for ACL reconstruction',
    recommendedTherapy: 'Physical Therapy',
  },
  '3': {
    patientName: 'Pedro Reyes',
    age: 55,
    gender: 'Male',
    phone: '0919 123 4567',
    issue: 'Post surgery rehab',
    doctorName: 'Dr. Micheal Brown',
    dateReferred: 'May 23, 2026',
    notes: 'Gentle mobility exercises recommended',
    recommendedTherapy: 'Occupational Therapy',
  },
};

export default function ReferralDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Fallback to first item if not found
  const data = REFERRALS_DATA[id as string] || REFERRALS_DATA['1'];

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.pageTitle}>Referral Details</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {data.gender === 'Female' ? (
              <MaterialCommunityIcons name="face-woman-profile" size={70} color="#E83E8C" />
            ) : (
              <MaterialCommunityIcons name="face-man-profile" size={70} color="#007BFF" />
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{data.patientName}</Text>
            <Text style={styles.profileSubtext}>{data.age} • {data.gender}</Text>
            <Text style={styles.profilePhone}>{data.phone}</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailTitle}>{data.patientName}</Text>
            <Text style={styles.detailText}>{data.issue}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailTitle}>Referred By</Text>
            <Text style={styles.detailSubtitle}>{data.doctorName}</Text>
            <Text style={styles.detailText}>Date Referred: {data.dateReferred}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailTitle}>Doctor's Notes</Text>
            <Text style={styles.detailText}>{data.notes}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailTitle}>Recommended Therapy</Text>
            <Text style={styles.detailText}>{data.recommendedTherapy}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push(`/referral/therapy-type/${id}`)}
        >
          <Text style={styles.primaryButtonText}>Select Therapy Type</Text>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C3F95', // Deep blue
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0E4F5',
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 8,
  },
  profileSubtext: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  profilePhone: {
    fontSize: 16,
    color: '#8E8E93',
  },
  detailsContainer: {
    gap: 24,
  },
  detailBlock: {},
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 6,
  },
  detailSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 22,
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#286EF0', // Bright blue
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
