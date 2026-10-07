import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';

const COLORS = {
  primaryTeal: '#0AA0B5',
  white: '#FFFFFF',
  darkText: '#171B26',
  lightGrayBg: '#F7F8FA',
  secondaryText: '#8A94A6',
  lightTeal: '#E6F7F9',
  borderGray: '#E8EDF2',
};

const ROLES = ['Patient', 'Nurse', 'Pharmacy', 'Doctor', 'PT', 'Admin'];

export default function LoginSuccessScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      // Login logic now lives in LoginScreen, so this screen can just route to PatientApp.
      navigation.reset({ index: 0, routes: [{ name: 'PatientApp' }] });
    }, 2000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightGrayBg} />
      <View style={styles.container}>
        <Header />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.validationText}>Credentials validated</Text>

          <Text style={styles.roleLabel}>Identified role:</Text>


          <View style={styles.pillsContainer}>
            {ROLES.map((role) => (
              <View key={role} style={styles.pill}>
                <Text style={styles.pillText}>{role}</Text>
              </View>
            ))}
          </View>
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
  validationText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: COLORS.darkText,
    marginBottom: 24,
  },
  roleLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: COLORS.secondaryText,
    marginBottom: 16,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    backgroundColor: COLORS.white,
    margin: 6,
  },
  pillText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: COLORS.darkText,
  },
});