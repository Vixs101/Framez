import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";
import { useTheme } from "../src/context/ThemeContext";

export default function Index() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();

  if (loading) {
    return (
      <View
        className={`flex-1 items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <ActivityIndicator
          size="large"
          color={isDark ? "#a855f7" : "#9333ea"}
        />
      </View>
    );
  }

  // Redirect based on auth state
  if (user) {
    return <Redirect href="/(tabs)/feed" />;
  }

  return <Redirect href="/(auth)/login" />;
}
