import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  hasSeenCommercialSplash: 'okiedoc.hasSeenCommercialSplash',
  patientCredentials: 'okiedoc.patientCredentials',
  session: 'okiedoc.session',
};

export async function markCommercialSplashSeen() {
  await AsyncStorage.setItem(KEYS.hasSeenCommercialSplash, 'true');
}

export async function hasSeenCommercialSplash() {
  const v = await AsyncStorage.getItem(KEYS.hasSeenCommercialSplash);
  return v === 'true';
}

export async function savePatientCredentials({ email, password }) {
  await AsyncStorage.setItem(
    KEYS.patientCredentials,
    JSON.stringify({ email, password })
  );
}

export async function getPatientCredentials() {
  const raw = await AsyncStorage.getItem(KEYS.patientCredentials);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function setSession({ role, email }) {
  await AsyncStorage.setItem(KEYS.session, JSON.stringify({ role, email }));
}

export async function getSession() {
  const raw = await AsyncStorage.getItem(KEYS.session);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function clearSession() {
  await AsyncStorage.removeItem(KEYS.session);
}

