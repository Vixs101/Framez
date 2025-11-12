import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState("system");
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (theme === 'system') {
        setIsDark(systemColorScheme === 'dark');
    } else {
        setIsDark(theme === 'dark');
    }
  }, [theme, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
        const savedTheme = await AsyncStorage.getItem('theme_preference');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    } catch (error) {
        console.error("Error loading theme preference", error);
    }
  }

  const toggleTheme = async (newTheme) => {
    try {
        setTheme(newTheme);
        await AsyncStorage.setItem('theme_preference', newTheme);
    } catch (error) {
        console.error("Error saving theme preference", error);
    }
  }

  const value = {
    theme, 
    isDark,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a theme provider');
    }
    return context  
}
