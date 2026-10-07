import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from '../components/Header';

const COLORS = {
  lightGrayBg: '#F7F8FA',
  darkText: '#171B26',
  secondaryText: '#8A94A6',
};

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightGrayBg} />
      <View style={styles.container}>
        <Header title="Notifications" />
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Notifications</Text>
          <Text style={styles.placeholderSubtext}>Your 3 notifications</Text>
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
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: COLORS.darkText,
  },
  placeholderSubtext: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: COLORS.secondaryText,
    marginTop: 8,
  },
});