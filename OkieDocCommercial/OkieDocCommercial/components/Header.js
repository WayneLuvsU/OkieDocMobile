import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  primaryTeal: '#0AA0B5',
  white: '#FFFFFF',
  darkText: '#171B26',
  secondaryText: '#8A94A6',
};

export default function Header({ title = 'OkieDoc+', showBack = false }) {
  const navigation = useNavigation();

  const openDrawer = () => {
    if (!navigation) return;

    if (typeof navigation?.openDrawer === 'function') {
      navigation.openDrawer();
      return;
    }

    // Fallbacks to avoid runtime crashes if navigation method differs
    if (typeof navigation?.toggleDrawer === 'function') {
      navigation.toggleDrawer();
      return;
    }
  };

  const goBack = () => {
    if (navigation && typeof navigation.goBack === 'function') {
      navigation.goBack();
    }
  };

  const goToNotifications = () => {
    if (!navigation) return;

    // Only navigate if a valid route exists in the current navigator.
    // Prevents edge-case crashes if header is rendered outside the Drawer.
    const state = navigation.getState?.();
    const routes = state?.routes ?? [];
    const hasNotificationsRoute = routes.some((r) => r?.name === 'Notifications');

    if (hasNotificationsRoute && typeof navigation.navigate === 'function') {
      navigation.navigate('Notifications');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={showBack ? goBack : openDrawer} style={styles.iconButton}>
          <Ionicons
            name={showBack ? 'chevron-back-outline' : 'menu-outline'}
            size={28}
            color={COLORS.darkText}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>O+</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>Your Health Partner</Text>
        </View>
      </View>
      <TouchableOpacity onPress={goToNotifications} style={styles.notificationsButton}>
        <View style={styles.notificationsIconWrap}>
          <Ionicons name="notifications-outline" size={28} color={COLORS.darkText} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationsButton: {
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 4,
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 10,
  },
  logoText: {
    color: COLORS.white,
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    lineHeight: 16,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: COLORS.darkText,
    lineHeight: 22,
  },
  headerSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 11,
    color: COLORS.secondaryText,
    lineHeight: 14,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    includeFontPadding: false,
    textAlign: 'center',
  },
});