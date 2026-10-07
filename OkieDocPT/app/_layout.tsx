import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router/react-navigation";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { AppProvider } from '@/context/AppContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="booking/index" options={{ headerShown: false }} />
          <Stack.Screen name="booking/therapist" options={{ headerShown: false }} />
          <Stack.Screen name="booking/datetime" options={{ headerShown: false }} />
          <Stack.Screen name="booking/summary" options={{ headerShown: false }} />
          <Stack.Screen name="booking/success" options={{ headerShown: false }} />
          <Stack.Screen name="booking/notification" options={{ headerShown: false }} />
          <Stack.Screen name="patient/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="referral/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="referral/therapy-type/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="referral/schedule/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProvider>
  );
}
