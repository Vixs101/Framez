import { Text, View } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";

export default function CreateScreen() {
  const { isDark } = useTheme();

  return (
    <View
      className={`flex-1 items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Text
        className={`text-2xl font-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Feed Screen
      </Text>
      <Text className="text-gray-500 mt-2">Coming next! 🚀</Text>
    </View>
  );
}
