import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-4xl font-bold mb-3">🎉 Framez App</Text>
        <Text className="text-xl text-gray-600">Setup Complete!</Text>
        <Text className="text-sm text-purple-600 mt-4">NativeWind is working! 🎨</Text>
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}