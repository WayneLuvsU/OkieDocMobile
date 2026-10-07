// theme.js — single source of truth for OkieDoc+ visual language
export const colors = {
  primary: '#1976D2',
  primaryDark: '#0D47A1',
  secondary: '#42A5F5',
  success: '#43A047',
  warning: '#FB8C00',
  danger: '#E53935',
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: '#1A2233',
  textMuted: '#6B7685',
  border: '#E4E9F0',
  splashBackground: '#12C4D9',
  splashIconStart: '#1AA6A0',
  splashIconEnd: '#4FD1A5',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 26, fontWeight: '700', color: colors.text },
  h2: { fontSize: 20, fontWeight: '700', color: colors.text },
  h3: { fontSize: 16, fontWeight: '600', color: colors.text },
  body: { fontSize: 14, fontWeight: '400', color: colors.text },
  caption: { fontSize: 12, fontWeight: '500', color: colors.textMuted },
};

export const shadow = {
  shadowColor: '#0D2148',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3,
};

export const statusColor = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'pending':
      return colors.warning;
    case 'approved':
      return colors.secondary;
    case 'completed':
      return colors.success;
    default:
      return colors.textMuted;
  }
};

export const stockStatusColor = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'in stock':
      return colors.success;
    case 'low stock':
      return colors.warning;
    case 'out of stock':
      return colors.danger;
    case 'expired':
      return colors.primaryDark;
    default:
      return colors.textMuted;
  }
};
