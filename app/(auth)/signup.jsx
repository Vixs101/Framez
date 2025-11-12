import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../src/components/common/Button';
import Input from '../../src/components/common/Input';
import ThemeToggle from '../../src/components/common/ThemeToggle';
import { useAuth } from '../../src/context/AuthContext';
import { useTheme } from '../../src/context/ThemeContext';


export default function SignupScreen() {
  const router = useRouter();
  const { signUp, loading } = useAuth();
  const { isDark } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    const { data, error } = await signUp(
      email.trim().toLowerCase(),
      password,
      fullName.trim()
    );

    if (error) {
      Alert.alert('Signup Failed', error.message);
    }
    else {
      Alert.alert(
        'Success!',
        'Your account has been created. Please sign in.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    }
  };

  return (
    <SafeAreaView className={`flex-1 h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="justify-center px-6 py-8">
            {/* Header */}
            <View className="items-center mb-8">
              <Text className="text-5xl font-bold mb-2">📸</Text>
              <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Join Framez
              </Text>
              <Text className={`text-base mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Create an account to get started
              </Text>
            </View>

            {/* Theme Toggle */}
            <View className="mb-8">
              <ThemeToggle />
            </View>

            {/* Form */}
            <View className="mb-6">
              <Input
                label="Full Name"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  setErrors({ ...errors, fullName: '' });
                }}
                placeholder="Enter your full name"
                error={errors.fullName}
              />

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
                placeholder="Create a password"
                secureTextEntry
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                placeholder="Confirm your password"
                secureTextEntry
                error={errors.confirmPassword}
              />

              <Button
                title="Create Account"
                onPress={handleSignup}
                loading={loading}
                className="mb-4"
              />

              <Button
                title="Back to Sign In"
                variant="outline"
                onPress={() => router.back()}
              />
            </View>

            {/* Footer */}
            <View className="place-content-center items-center justify-end py-4">
              <Text className={`text-xs ${isDark ? 'text-white' : 'text-gray-400'} text-center px-4`}>
                By creating an account, you agree to our
                Terms of Service & Privacy Policy
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}