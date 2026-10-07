import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/*
 * TODO (Integration):
 * The `THERAPISTS` array below contains static placeholder data.
 * In a fully integrated application:
 * 1. You should fetch the list of therapists from your backend API.
 * 2. The fetch request should ideally be filtered based on the `therapyType`
 *    selected in the previous screen. (You can pass this selection via 
 *    URL parameters using `expo-router`'s `useLocalSearchParams`, or store
 *    it in a global state context like `AppContext`).
 */
const THERAPISTS = [
  { id: 'johnson', name: 'Johnson, PT', role: 'Physical Therapist', gender: 'Female' },
  { id: 'michael', name: 'Michael Brown, PT', role: 'Physical Therapist', gender: 'Male' },
  { id: 'jennifer', name: 'Jennifer Lee, PT', role: 'Physical Therapist', gender: 'Female' },
];

export default function ChooseTherapistScreen() {
  const [selectedTherapist, setSelectedTherapist] = useState('johnson');
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
        <Text style={styles.pageTitle}>Choose Therapist</Text>
        <Text style={styles.pageSubtitle}>Select your preffered therapist</Text>

        <View style={styles.optionsContainer}>
          {THERAPISTS.map((therapist) => {
            const isSelected = selectedTherapist === therapist.id;
            return (
              <TouchableOpacity 
                key={therapist.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => setSelectedTherapist(therapist.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionLeft}>
                  <View style={styles.avatarContainer}>
                    {therapist.gender === 'Female' ? (
                      <MaterialCommunityIcons name="face-woman-profile" size={40} color="#E83E8C" />
                    ) : (
                      <MaterialCommunityIcons name="face-man-profile" size={40} color="#007BFF" />
                    )}
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionLabel}>{therapist.name}</Text>
                    <Text style={styles.optionRole}>{therapist.role}</Text>
                  </View>
                </View>
                <View style={styles.radioContainer}>
                  {isSelected ? (
                    <MaterialCommunityIcons name="check-circle" size={24} color="#286EF0" />
                  ) : (
                    <View style={styles.radioEmpty} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
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
          onPress={() => router.push('/booking/datetime')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
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
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0E4F5',
    backgroundColor: '#FFFFFF',
  },
  optionCardSelected: {
    backgroundColor: '#F4FAFF',
    borderColor: '#B0D4F1',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  optionTextContainer: {
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  optionRole: {
    fontSize: 14,
    color: '#4A7FB8',
    fontWeight: '600',
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D0D0D0',
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
