import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  primaryTeal: '#0AA0B5',
  white: '#FFFFFF',
  darkText: '#171B26',
};

export default function CommercialSplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Mark splash as seen and navigate to main app after 2.5 seconds
    const timer = setTimeout(async () => {
      try {
        // Lazy import to avoid circular deps
        const { markCommercialSplashSeen } = await import('../utils/authStore');
        await markCommercialSplashSeen();
      } catch {
        // ignore persistence errors
      }
      navigation.replace('MainApp');
    }, 2500);


    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryTeal} />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoSquare}>
          <Text style={styles.logoText}>O+</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.appName}>OkieDoc+</Text>
          <Text style={styles.subText}>Commercial</Text>
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSquare: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#188EA4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: COLORS.white,
  },
  textContainer: {
    flexDirection: 'column',
  },
  appName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#000000',
    lineHeight: 34,
  },
  subText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
  },
});