import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error = '',
  icon = null,
  ...props
}) {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getBorderColor = () => {
    if (error) return 'border-red-500';
    if (isFocused) return isDark ? 'border-purple-500' : 'border-purple-600';
    return isDark ? 'border-gray-700' : 'border-gray-300';
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </Text>
      )}
      <View className={`flex-row items-center border-2 rounded-xl px-4 ${getBorderColor()} ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        {icon && <View className="mr-2">{icon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-1 py-4 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
            <Text className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>
      ) : null}
    </View>
  );
}