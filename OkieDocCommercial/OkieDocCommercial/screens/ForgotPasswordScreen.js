import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';

const COLORS = {
  primaryTeal: '#0AA0B5',
  white: '#FFFFFF',
  darkText: '#171B26',
  lightGrayBg: '#F7F8FA',
  secondaryText: '#8A94A6',
  borderGray: '#E8EDF2',
};

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSendReset = () => {
    if (email.trim() === '') {
      alert('Please enter your email address.');
      return;
    }
    // Simulate sending reset link
    setSubmitted(true);
    // Optionally show a success message
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

        <Text style={styles.pageTitle}>Forgot Password</Text>
        <Text style={styles.pageSubtitle}>
          No worries! Enter your registered email address and we’ll send you a link to reset your password.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.noteText}>
          We’ll send a password reset link to your email address.
        </Text>

        <TouchableOpacity style={styles.resetButton} onPress={handleSendReset}>
          <Text style={styles.resetButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backToLogin}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
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
    fontSize: 28,
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
  noteText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: COLORS.secondaryText,
    marginBottom: 28,
  },
  resetButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  resetButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: COLORS.white,
  },
  backToLogin: {
    alignItems: 'center',
  },
  backToLoginText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: COLORS.primaryTeal,
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
