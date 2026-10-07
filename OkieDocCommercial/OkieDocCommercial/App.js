import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from '@expo-google-fonts/poppins';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CallbackScreen from './screens/CallbackScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import PatientRegistrationScreen from './screens/PatientRegistrationScreen';
import SpecialistRegistrationScreen from './screens/SpecialistRegistrationScreen';
import PatientRegistrationCompleteScreen from './screens/PatientRegistrationCompleteScreen';
import SpecialistRegistrationCompleteScreen from './screens/SpecialistRegistrationCompleteScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RequestSubmittedScreen from './screens/RequestSubmittedScreen';
import CommercialSplashScreen from './screens/CommercialSplashScreen';
import DrawerContent from './components/DrawerContent';

import { getSession, hasSeenCommercialSplash } from './utils/authStore';

const Drawer = createDrawerNavigator();
const RootStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const RegisterStack = createNativeStackNavigator();
const CallbackStack = createNativeStackNavigator();

function MainLoginFlow() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="LoginMain" component={LoginScreen} />
      <LoginStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </LoginStack.Navigator>
  );
}

function MainRegisterFlow() {
  return (
    <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
      <RegisterStack.Screen name="RegisterMain" component={RegisterScreen} />
      <RegisterStack.Screen name="PatientRegistration" component={PatientRegistrationScreen} />
      <RegisterStack.Screen name="SpecialistRegistration" component={SpecialistRegistrationScreen} />
      <RegisterStack.Screen name="PatientRegistrationComplete" component={PatientRegistrationCompleteScreen} />
      <RegisterStack.Screen name="SpecialistRegistrationComplete" component={SpecialistRegistrationCompleteScreen} />
    </RegisterStack.Navigator>
  );
}

function MainCallbackFlow() {
  return (
    <CallbackStack.Navigator screenOptions={{ headerShown: false }}>
      <CallbackStack.Screen name="CallbackMain" component={CallbackScreen} />
      <CallbackStack.Screen name="RequestSubmitted" component={RequestSubmittedScreen} />
    </CallbackStack.Navigator>
  );
}

function renderDrawerContent(props) {
  return <DrawerContent {...props} />;
}


function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerActiveTintColor: '#0AA0B5',
        drawerInactiveTintColor: '#171B26',
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Login" component={MainLoginFlow} />
      <Drawer.Screen name="Register" component={MainRegisterFlow} />
      <Drawer.Screen name="Callback" component={MainCallbackFlow} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [booting, setBooting] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('CommercialSplash');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [seen, session] = await Promise.all([
          hasSeenCommercialSplash(),
          getSession(),
        ]);

        if (!alive) return;

        if (seen) {
          // If a session exists, route user accordingly.
          setInitialRouteName('MainApp');
        } else {
          setInitialRouteName('CommercialSplash');
        }
      } finally {
        if (alive) setBooting(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const root = useMemo(() => {
    if (!fontsLoaded) return null;

    return (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
          <RootStack.Screen
            name="CommercialSplash"
            component={CommercialSplashScreen}
          />
          <RootStack.Screen name="MainApp" component={MainDrawer} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }, [fontsLoaded, initialRouteName]);

  if (!fontsLoaded || booting) return null;
  return root;
}
