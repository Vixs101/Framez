import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
}) {
  const { isDark } = useTheme();

  const getVariantStyles = () => {
    if (disabled || loading) {
      return isDark ? "bg-gray-700 opacity-50" : "bg-gray-300 opacity-50";
    }

    switch (variant) {
      case "primary":
        return isDark
          ? "bg-purple-600 active:bg-purple-700"
          : "bg-purple-500 active:bg-purple-600";
      case "secondary":
        return isDark
          ? "bg-gray-700 active:bg-gray-600"
          : "bg-gray-200 active:bg-gray-300";
      case "outline":
        return isDark
          ? "border-2 border-purple-600 bg-transparent"
          : "border-2 border-purple-500 bg-transparent";
      default:
        return "";
    }
  };

  const getTextStyles = () => {
    if (variant === "outline") {
      return isDark ? "text-purple-400" : "text-purple-600";
    }
    return variant === "secondary" && !isDark ? "text-gray-800" : "text-white";
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`py-4 px-6 rounded-xl items-center justify-center ${getVariantStyles()} ${className}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" ? (isDark ? "#c084fc" : "#a855f7") : "#ffffff"
          }
        />
      ) : (
        <Text className={`text-base font-semibold ${getTextStyles()}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
