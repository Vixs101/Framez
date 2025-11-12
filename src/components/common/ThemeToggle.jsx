import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  const themes = [
    { id: "light", label: "☀️", name: "Light" },
    { id: "dark", label: "🌙", name: "Dark" },
    { id: "system", label: "💻", name: "Auto" },
  ];

  return (
    <View
      className={`flex-row rounded-xl p-1 mb-4 ${
        isDark ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      {themes.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => toggleTheme(item.id)}
          className={`flex-1 py-2 px-3 rounded-lg items-center ${
            theme === item.id
              ? isDark
                ? "bg-purple-600"
                : "bg-purple-500"
              : "bg-transparent"
          }`}
        >
          <Text className="text-lg mb-1">{item.label}</Text>
          <Text
            className={`text-xs ${
              theme === item.id
                ? "text-white font-semibold"
                : isDark
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
