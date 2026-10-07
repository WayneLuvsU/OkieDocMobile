import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

const COLORS = {
  primaryTeal: '#0AA0B5',
  white: '#FFFFFF',
  darkText: '#171B26',
  lightGrayBg: '#F7F8FA',
  secondaryText: '#8A94A6',
  lightTeal: '#E6F7F9',
};

const CARD_HEIGHT = 90;
const HERO_HEIGHT = 180;

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightGrayBg} />
      <View style={styles.container}>
        <Header />

        <Text style={styles.registerFlowLabel}>DASHBOARD</Text>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Healthcare</Text>
            <Text style={styles.heroTitle}>Access Made Simple</Text>
            <Text style={styles.heroSubtitle}>
              Login, register, or request a callback to connect with our healthcare team.
            </Text>
          </View>
        </View>

        {/* Menu Cards */}
        <View style={styles.menuCardsContainer}>
          <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('Login')}>
            <View style={styles.menuCardLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="log-in-outline" size={24} color={COLORS.primaryTeal} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuCardTitle}>Login</Text>
                <Text style={styles.menuCardSubtitle}>Access your account securely</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color={COLORS.secondaryText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('Register')}>
            <View style={styles.menuCardLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="add-outline" size={24} color={COLORS.primaryTeal} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuCardTitle}>Register</Text>
                <Text style={styles.menuCardSubtitle}>Create a new account</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color={COLORS.secondaryText} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuCard, styles.lastMenuCard]} onPress={() => navigation.navigate('Callback')}>
            <View style={styles.menuCardLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="business-outline" size={24} color={COLORS.primaryTeal} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuCardTitle}>Callback Request</Text>
                <Text style={styles.menuCardSubtitle}>Request a callback</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color={COLORS.secondaryText} />
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
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: COLORS.lightGrayBg,
  },
  registerFlowLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: COLORS.primaryTeal,
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 12,
  },
  heroCard: {
    backgroundColor: COLORS.primaryTeal,
    borderRadius: 20,
    height: HERO_HEIGHT,
    padding: 20,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  heroTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    color: COLORS.white,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
    marginTop: 8,
    maxWidth: width * 0.75,
  },
  menuCardsContainer: {
    marginTop: 14,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    height: CARD_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  lastMenuCard: {
    marginBottom: 0,
  },
  menuCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.lightTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuCardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: COLORS.darkText,
    lineHeight: 20,
  },
  menuCardSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 16,
  },
});