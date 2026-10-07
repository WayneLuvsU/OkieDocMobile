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

export default function PatientRegistrationScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    address: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    if (key === 'dob') {
      const digits = value.replace(/\D/g, '').slice(0, 8);
      let formatted = '';
      if (digits.length > 4) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
      } else if (digits.length > 2) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
      } else {
        formatted = digits;
      }
      setForm({ ...form, dob: formatted });
      setErrors({ ...errors, dob: '' });
      return;
    }

    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: '' });
  };

  const validateForm = () => {
    const nextErrors = {};
    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();
    const dob = form.dob.trim();
    const address = form.address.trim();
    const password = form.password;

    if (!/^[A-Za-z\s]+$/.test(fullName)) {
      nextErrors.fullName = 'Full name must contain letters only.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!/^\d+$/.test(mobile)) {
      nextErrors.mobile = 'Mobile number must contain digits only.';
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
      nextErrors.dob = 'Use format MM/DD/YYYY.';
    }

    if (!address) {
      nextErrors.address = 'Address is required.';
    }

    if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const { savePatientCredentials } = await import('../utils/authStore');
      await savePatientCredentials({
        email: form.email.trim(),
        password: form.password,
      });
    } catch {
      // If persistence fails, still allow navigation for demo purposes.
    }

    navigation.navigate('PatientRegistrationComplete');
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
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.pageTitle}>Patient Registration</Text>
            <Text style={styles.pageSubtitle}>
              Enter your information to create an account.
            </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={form.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
              placeholder="Full Name"
              autoCapitalize="words"
            />
            {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
          </View>

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
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={form.mobile}
              onChangeText={(text) => handleChange('mobile', text)}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
            />
            {errors.mobile ? <Text style={styles.errorText}>{errors.mobile}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={form.dob}
              onChangeText={(text) => handleChange('dob', text)}
              placeholder="MM/DD/YYYY"
              keyboardType="numbers-and-punctuation"
            />
            {errors.dob ? <Text style={styles.errorText}>{errors.dob}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={form.address}
              onChangeText={(text) => handleChange('address', text)}
              placeholder="Address"
            />
            {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={form.password}
                onChangeText={(text) => handleChange('password', text)}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.secondaryText}
                />
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

            <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
              <Text style={styles.createButtonText}>Create Patient Account</Text>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.darkText,
  },
  eyeButton: {
    padding: 8,
  },
  errorText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#D64545',
    marginTop: 6,
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
