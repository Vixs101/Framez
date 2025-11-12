import { Stack } from 'expo-router';
import { useTheme } from '../../src/context/ThemeContext';

export default function AuthLayout() {
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? '#111827' : '#ffffff',
        },
      }}
    />
  );
}