import { Tabs, useRouter } from "expo-router";
import { Alert, Text } from "react-native";
import Button from "../../src/components/common/Button";
import { useAuth } from "../../src/context/AuthContext";
import { useTheme } from "../../src/context/ThemeContext";

export default function TabsLayout() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { signOut, loading } = useAuth();

  const handlelogout = async () => {
    try {
      await signOut();
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Logout Failed", error.message || "Please try again");
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderTopColor: isDark ? "#374151" : "#e5e7eb",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: isDark ? "#a855f7" : "#9333ea",
        tabBarInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? "#374151" : "#e5e7eb",
        },
        headerTintColor: isDark ? "#ffffff" : "#000000",
        headerRight: () => (
          <Button
            title={"Log out"}
            onPress={handlelogout}
            className=""
          />
        ),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>➕</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
