import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const COLORS = {
  primaryTeal: '#0AA0B5',
  white: '#FFFFFF',
  darkText: '#171B26',
  lightGrayBg: '#F7F8FA',
  secondaryText: '#8A94A6',
};

export default function RequestSubmittedScreen({ navigation }) {
  useEffect(() => {
    // If navigation stack is missing (edge cases), we still render safely.
    // No-op here intentionally.
  }, []);

  const goHome = () => {
    // In this app, the drawer contains Dashboard (DashboardFlow -> PatientSplash etc).
    navigation?.reset?.({ index: 0, routes: [{ name: 'Dashboard' }] });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightGrayBg} />
      <View style={styles.container}>
        <Header title="Request Submitted" />

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color={COLORS.primaryTeal} />
          </View>

          <Text style={styles.title}>Request submitted</Text>
          <Text style={styles.subtitle}>
            Thanks! Our team will review your request and get back to you shortly.
          </Text>

          <TouchableOpacity style={styles.button} onPress={goHome} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E6F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: 34,
  },
  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: COLORS.white,
  },
});

