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
          fontSize: 32,
          fontFamily: "cursive", 
        },
        tabBarStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderTopColor: isDark ? "#374151" : "#e5e7eb",
          height: 75,
          paddingBottom: 12,
          paddingTop: 10,
        },
        tabBarActiveTintColor: isDark ? "#a855f7" : "#9333ea",
        tabBarInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor:"#581c87",
        },
        headerTintColor: isDark ? "#ffffff" : "#000000",
        headerRight: () => (
          <Button
            title={"Log out"}
            onPress={handlelogout}
            loading={loading}
            className="mr-2"
          />
        ),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          headerTitle: "📸 Feed",
          tabBarLabel: "Feed",
          tabBarIcon: ({ focused, color }) => (
            <Text style={{ fontSize: focused ? 28 : 24 }}>
              {focused ? "🏠" : "🏘️"}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerTitle: "📸 Create",
          tabBarLabel: "Create",
          tabBarIcon: ({ focused, color }) => (
            <Text style={{ fontSize: focused ? 28 : 25, color: isDark ? "white" : "black" }}>
              {focused ? "➕" : "⊕"}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "📸 Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Text style={{ fontSize: focused ? 28 : 24 }}>
              {focused ? "👤" : "👥"}
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
