import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

type TherapyOption = {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const THERAPY_OPTIONS: TherapyOption[] = [
  {
    id: 'physical',
    title: 'Physical Therapy',
    icon: 'human-handsup', // Placeholder icon
  },
  {
    id: 'occupational',
    title: 'Occupational Therapy',
    icon: 'handshake-outline', // Placeholder icon
  },
  {
    id: 'speech',
    title: 'Speech Therapy',
    icon: 'account-voice',
  },
];

export default function TherapyTypeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedTherapy, setSelectedTherapy] = useState<string>('physical');

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
        </View>
        
        <Text style={styles.pageTitle}>Therapy Type</Text>
        <Text style={styles.pageSubtitle}>Choose the appropriate therapy type.</Text>

        {/* Therapy Options */}
        <View style={styles.optionsContainer}>
          {THERAPY_OPTIONS.map((option) => {
            const isSelected = selectedTherapy === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedTherapy(option.id)}
              >
                <View style={styles.optionIconContainer}>
                  <MaterialCommunityIcons 
                    name={option.icon} 
                    size={32} 
                    color="#000000" 
                  />
                </View>
                
                <Text style={styles.optionTitle}>{option.title}</Text>
                
                <View style={styles.radioContainer}>
                  {isSelected ? (
                    <MaterialCommunityIcons name="check-circle" size={24} color="#286EF0" />
                  ) : (
                    <View style={styles.radioUnselected} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push(`/referral/schedule/${id}`)}
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
    marginBottom: 12,
  },
  pageSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A7FB8', // Lighter blue subtitle
    marginBottom: 32,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    padding: 20,
  },
  optionCardSelected: {
    backgroundColor: '#F4FAFF', // Light blue background
    borderColor: '#B0D4F1',
  },
  optionIconContainer: {
    marginRight: 16,
    width: 32,
    alignItems: 'center',
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  radioContainer: {
    marginLeft: 16,
  },
  radioUnselected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D0E4F5',
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
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
});
