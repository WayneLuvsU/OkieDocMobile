import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const COLORS = {
  primaryTeal: '#0AA0B5',
  white: '#FFFFFF',
  darkText: '#171B26',
  lightGrayBg: '#F7F8FA',
  secondaryText: '#8A94A6',
  lightTeal: '#E6F7F9',
};

export default function RegisterScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType === 'patient') {
      navigation.navigate('PatientRegistration');
    } else if (selectedType === 'specialist') {
      navigation.navigate('SpecialistRegistration');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightGrayBg} />
      <View style={styles.container}>
        <Header />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={22} color={COLORS.primaryTeal} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Create an Account</Text>
        <Text style={styles.pageSubtitle}>Choose your account type.</Text>

        <View style={styles.cardsContainer}>
          {/* Patient Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedType === 'patient' && styles.cardSelected,
            ]}
            onPress={() => handleSelect('patient')}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-circle-outline" size={36} color={COLORS.primaryTeal} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Patient</Text>
                <Text style={styles.cardSubtitle}>
                  Book consultations and manage your records
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  selectedType === 'patient' && styles.selectButtonActive,
                ]}
                onPress={() => handleSelect('patient')}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    selectedType === 'patient' && styles.selectButtonTextActive,
                  ]}
                >
                  Select ›
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Specialist Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedType === 'specialist' && styles.cardSelected,
            ]}
            onPress={() => handleSelect('specialist')}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="medkit-outline" size={36} color={COLORS.primaryTeal} />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Specialist</Text>
                <Text style={styles.cardSubtitle}>
                  Access professional tools and assigned modules
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  selectedType === 'specialist' && styles.selectButtonActive,
                ]}
                onPress={() => handleSelect('specialist')}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    selectedType === 'specialist' && styles.selectButtonTextActive,
                  ]}
                >
                  Select ›
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedType && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedType}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGrayBg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGrayBg,
  },
  pageTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 36,
    color: COLORS.darkText,
    lineHeight: 44,
    marginTop: 12,
  },
  pageSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 4,
    marginBottom: 24,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    height: 132,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: COLORS.primaryTeal,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: COLORS.lightTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: COLORS.darkText,
    lineHeight: 24,
  },
  cardSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: COLORS.secondaryText,
    lineHeight: 18,
    marginTop: 2,
  },
  selectButton: {
    height: 34,
    width: 90,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: COLORS.primaryTeal,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: 8,
  },
  selectButtonActive: {
    backgroundColor: COLORS.lightTeal,
    borderWidth: 2,
  },
  selectButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: COLORS.primaryTeal,
  },
  selectButtonTextActive: {
    color: COLORS.primaryTeal,
  },
  spacer: {
    flex: 1,
  },
  continueButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#B0D9E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: COLORS.white,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  backButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: COLORS.primaryTeal,
  },
});
