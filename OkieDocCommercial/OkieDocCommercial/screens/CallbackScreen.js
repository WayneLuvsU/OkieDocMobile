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
};

export default function CallbackScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    contactNumber: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: '' });
  };

  const validateForm = () => {
    const nextErrors = {};
    const { fullName, contactNumber, preferredDate, preferredTime, reason } = form;

    // Full Name: letters and spaces only
    if (!/^[A-Za-z\s]+$/.test(fullName.trim())) {
      nextErrors.fullName = 'Full name must contain letters only.';
    }

    // Contact Number: digits only
    if (!/^\d+$/.test(contactNumber.trim())) {
      nextErrors.contactNumber = 'Contact number must contain digits only.';
    }

    // Preferred Date: non-empty
    if (!preferredDate.trim()) {
      nextErrors.preferredDate = 'Preferred date is required.';
    }

    // Preferred Time: non-empty
    if (!preferredTime.trim()) {
      nextErrors.preferredTime = 'Preferred time is required.';
    }

    // Reason: non-empty
    if (!reason.trim()) {
      nextErrors.reason = 'Please describe your concern.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    // Navigate to success screen
    navigation.navigate('RequestSubmitted');
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

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.pageTitle}>Callback Request</Text>
            <Text style={styles.pageSubtitle}>
              Our team will contact you as soon as possible.
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

            {/* Contact Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Number</Text>
              <TextInput
                style={styles.input}
                value={form.contactNumber}
                onChangeText={(text) => handleChange('contactNumber', text)}
                placeholder="Contact Number"
                keyboardType="phone-pad"
              />
              {errors.contactNumber && (
                <Text style={styles.errorText}>{errors.contactNumber}</Text>
              )}
            </View>

            {/* Preferred Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Date</Text>
              <TextInput
                style={styles.input}
                value={form.preferredDate}
                onChangeText={(text) => handleChange('preferredDate', text)}
                placeholder="Preferred Date (e.g., May 22, 2026)"
              />
              {errors.preferredDate && (
                <Text style={styles.errorText}>{errors.preferredDate}</Text>
              )}
            </View>

            {/* Preferred Time */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Time</Text>
              <TextInput
                style={styles.input}
                value={form.preferredTime}
                onChangeText={(text) => handleChange('preferredTime', text)}
                placeholder="Preferred Time (e.g., 10:00 AM)"
              />
              {errors.preferredTime && (
                <Text style={styles.errorText}>{errors.preferredTime}</Text>
              )}
            </View>

            {/* Reason for Callback */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reason for Callback</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={form.reason}
                onChangeText={(text) => handleChange('reason', text)}
                placeholder="Briefly describe your concern..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {errors.reason && (
                <Text style={styles.errorText}>{errors.reason}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
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
  textArea: {
    height: 120,
    paddingTop: 14,
    paddingBottom: 14,
  },
  errorText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#D64545',
    marginTop: 6,
  },
  submitButton: {
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
  submitButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: COLORS.white,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 10,
  },
  backButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: COLORS.primaryTeal,
  },
});
