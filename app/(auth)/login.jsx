import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../src/components/common/Button';
import Input from '../../src/components/common/Input';
import ThemeToggle from '../../src/components/common/ThemeToggle';
import { useAuth } from '../../src/context/AuthContext';
import { useTheme } from '../../src/context/ThemeContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const { error } = await signIn(email.trim().toLowerCase(), password);

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      router.replace('/(tabs)/feed');
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 py-8">
            {/* Header */}
            <View className="items-center mb-8">
              <Text className="text-5xl font-bold mb-2">📸</Text>
              <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Framez
              </Text>
              <Text className={`text-base mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Welcome back! Sign in to continue
              </Text>
            </View>

            {/* Theme Toggle */}
            <View className="mb-8">
              <ThemeToggle />
            </View>

            {/* Form */}
            <View className="mb-6">
              <Input
                label="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: '' });
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <Input
                label="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors({ ...errors, password: '' });
                }}
                placeholder="Enter your password"
                secureTextEntry
                error={errors.password}
              />

              <TouchableOpacity className="self-end mb-4">
                <Text className={`text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                className="mb-4"
              />

              <Button
                title="Create Account"
                variant="outline"
                onPress={() => router.push('/(auth)/signup')}
              />
            </View>

            {/* Footer */}
            <View className="flex-1 justify-end items-center py-4">
              <Text className={`text-xs ${isDark ? 'text-white' : 'text-gray-400'}`}>
                By continuing, you agree to our Terms & Privacy Policy
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}