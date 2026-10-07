import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/*
 * Integration Note:
 * This component handles user selection of therapy services.
 * Please ensure that navigation paths and data mapping are updated 
 * to align with your project's routing structure and API schemas.
 */

/*
 * TODO (Integration):
 * This file contains static placeholder options for "Therapy Types".
 * When integrating with a real backend, you should fetch the available
 * therapies from your database (e.g., via a REST API or GraphQL) rather
 * than hardcoding them here.
 */
const THERAPY_TYPES = [
  { id: 'pt', label: 'Physical Therapy', icon: 'human-handsup' },
  { id: 'ot', label: 'Occupational Therapy', icon: 'human-handsdown' },
  { id: 'st', label: 'Speech Therapy', icon: 'account-voice' },
];

export default function DirectBookingScreen() {
  const [selectedType, setSelectedType] = useState('pt');
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Select Therapy Type</Text>
        <Text style={styles.pageSubtitle}>Choose the type of therapy you need</Text>

        <View style={styles.optionsContainer}>
          {THERAPY_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <TouchableOpacity 
                key={type.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => setSelectedType(type.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionLeft}>
                  <MaterialCommunityIcons 
                    name={type.icon as any} 
                    size={32} 
                    color="#1C3F95" 
                    style={styles.optionIcon} 
                  />
                  <Text style={styles.optionLabel}>{type.label}</Text>
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
          style={styles.primaryButton}
          onPress={() => router.push('/booking/therapist')}
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A7FB8', // Light blue
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
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
  optionIcon: {
    marginRight: 16,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
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
