import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const COLORS = {
  primaryTeal: '#0AA0B5',
  white: '#FFFFFF',
  darkText: '#171B26',
  lightGrayBg: '#F7F8FA',
  secondaryText: '#8A94A6',
  borderGray: '#E8EDF2',
  lightTeal: '#E6F7F9',
};

const SPECIALIST_TYPES = ['Nurse', 'Pharmacy', 'Doctor', 'PT', 'Admin'];

export default function SpecialistRegistrationScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    licenseId: '',
    specialistType: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: '' });
  };

  const toggleSpecialistType = (type) => {
    setForm({ ...form, specialistType: type });
    setErrors({ ...errors, specialistType: '' });
  };

  const validateForm = () => {
    const nextErrors = {};
    const { fullName, email, mobile, licenseId, specialistType } = form;

    // Full Name: letters and spaces only
    if (!/^[A-Za-z\s]+$/.test(fullName.trim())) {
      nextErrors.fullName = 'Full name must contain letters only.';
    }

    // Email: valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    // Mobile: digits only
    if (!/^\d+$/.test(mobile.trim())) {
      nextErrors.mobile = 'Mobile number must contain digits only.';
    }

    // License/Employee ID: alphanumeric (optional but can be required)
    if (!licenseId.trim()) {
      nextErrors.licenseId = 'License / Employee ID is required.';
    }

    // Specialist Type: must be selected
    if (!specialistType) {
      nextErrors.specialistType = 'Please select a specialist type.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    navigation.navigate('SpecialistRegistrationComplete');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightGrayBg} />
      <View style={styles.container}>
        <Header title="Specialist Registration" />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={22} color={COLORS.primaryTeal} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.pageTitle}>Specialist Registration</Text>
            <Text style={styles.pageSubtitle}>
              Enter your professional information.
            </Text>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={form.fullName}
                onChangeText={(text) => handleChange('fullName', text)}
                placeholder="Full Name"
                autoCapitalize="words"
              />
              {errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Mobile */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                value={form.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
              />
              {errors.mobile && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
              )}
            </View>

            {/* License / Employee ID */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>License / Employee ID</Text>
              <TextInput
                style={styles.input}
                value={form.licenseId}
                onChangeText={(text) => handleChange('licenseId', text)}
                placeholder="License / Employee ID"
                autoCapitalize="characters"
              />
              {errors.licenseId && (
                <Text style={styles.errorText}>{errors.licenseId}</Text>
              )}
            </View>

            {/* Specialist Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Specialist Type</Text>
              <Text style={styles.typePlaceholder}>Select specialist type</Text>
              <View style={styles.typePillsContainer}>
                {SPECIALIST_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typePill,
                      form.specialistType === type && styles.typePillActive,
                    ]}
                    onPress={() => toggleSpecialistType(type)}
                  >
                    <Text
                      style={[
                        styles.typePillText,
                        form.specialistType === type && styles.typePillTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.specialistType && (
                <Text style={styles.errorText}>{errors.specialistType}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
              <Text style={styles.createButtonText}>
                Create Specialist Account
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingBottom: 20,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  pageTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: COLORS.darkText,
    marginTop: 12,
  },
  pageSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 4,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: COLORS.darkText,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.darkText,
  },
  errorText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#D64545',
    marginTop: 6,
  },
  typePlaceholder: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLORS.secondaryText,
    marginBottom: 10,
  },
  typePillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typePill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    backgroundColor: COLORS.white,
    marginRight: 10,
    marginBottom: 10,
  },
  typePillActive: {
    borderColor: COLORS.primaryTeal,
    backgroundColor: COLORS.lightTeal,
  },
  typePillText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: COLORS.darkText,
  },
  typePillTextActive: {
    color: COLORS.primaryTeal,
  },
  createButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: COLORS.white,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    marginTop: 8,
  },
  backButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: COLORS.primaryTeal,
  },
});
