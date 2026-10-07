import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing } from '../theme/theme';

// How long the starting page stays on screen before moving to Login.
const SPLASH_DURATION_MS = 1800;

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LinearGradient
          colors={[colors.splashIconStart, colors.splashIconEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.badge}
        >
          <Text style={styles.badgeText}>O+</Text>
        </LinearGradient>

        <View style={styles.textWrap}>
          <Text style={styles.brand}>OkieDoc+</Text>
          <Text style={styles.moduleName}>Admin</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.splashBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  badgeText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  textWrap: {
    justifyContent: 'center',
  },
  brand: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0E1B2B',
  },
  moduleName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0E1B2B',
    marginTop: -2,
  },
});
