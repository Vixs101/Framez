import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../../src/components/common/Button";
import ThemeToggle from "../../src/components/common/ThemeToggle";
import PostCard from "../../src/components/post/PostCard";
import { useAuth } from "../../src/context/AuthContext";
import { useTheme } from "../../src/context/ThemeContext";
import { supabase } from "../../src/lib/supabase";
const { width } = Dimensions.get("window");
const imageSize = (width - 48) / 3; 


export default function ProfileScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { signOut, userProfile, user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({ posts: 0 });

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        users!user_id(id, full_name, avatar_url)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

      if (error) throw error;

      setUserPosts(data || []);
      setStats({ posts: data?.length || 0 });
    } catch (error) {
      console.error("Error fetching user posts:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserPosts();
  };

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

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

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: isDark ? '#111827' : '#fff',
            flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDark ? "#a855f7" : "#9333ea"}
          />
        }
      >
        <View className="p-6">
          {/* Profile Header */}
          <View className="items-center mb-6 w-full">
            {/* Avatar */}
            <View
              className={`w-[] h-32 rounded-full  items-center justify-center mb-4 ${
                isDark ? "bg-purple-900" : "bg-purple-100"
              }`}
            >
              {userProfile?.avatar_url ? (
                <Image
                  source={{ uri: userProfile.avatar_url }}
                  className=''
                />
              ) : (
                <Text
                  className={`text-4xl font-bold ${
                    isDark ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  {userProfile?.full_name?.charAt(0).toUpperCase() || "?"}
                </Text>
              )}
            </View>

            {/* Name & Email */}
            <Text
              className={`text-2xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {userProfile?.full_name || "Anonymous User"}
            </Text>
            <Text
              className={`text-sm mb-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {userProfile?.email || user?.email}
            </Text>

            {/* Stats */}
            <View className="flex-row mt-6 space-x-8 mb-2">
              <View className="items-center">
                <Text
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stats.posts}
                </Text>
                <Text
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Posts
                </Text>
              </View>
            </View>
          </View>

          {/* Theme Toggle */}
          <View className="mb-6">
            <Text
              className={`text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Theme Preference
            </Text>
            <ThemeToggle />
          </View>

          {/* Divider */}
          <View
            className={`h-2px mb-6 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
          />

          {/* Posts Section */}
          <View>
            <View className="flex-col items-center justify-between mb-4">
              <Text
                className={`text-lg font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                My Posts
              </Text>
              <Text
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stats.posts} {stats.posts === 1 ? "post" : "posts"}
              </Text>
            </View>

            {/* Posts Grid */}
            {userPosts.length > 0 ? (
              <View className="w-full flex-col flex-wrap -mx-1 mb-4">
                {userPosts.map((post) => (
                  <TouchableOpacity
                    key={post.id}
                    className="p-1"
                  >
                    {post.image_url ? (
                      <PostCard post={post} />
                    ) : (
                      <View
                        className={`rounded-lg items-center justify-center ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                        style={{
                          width: imageSize,
                          height: imageSize,
                        }}
                      >
                        <Text className="text-3xl">📝</Text>
                        <Text
                          className={`text-xs mt-2 text-center px-2 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                          numberOfLines={2}
                        >
                          {post.caption}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className="items-center py-12">
                <Text className="text-6xl mb-4">📸</Text>
                <Text
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  No posts yet
                </Text>
                <Text
                  className={`text-center px-8 mb-6 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Share your first post and start building your collection!
                </Text>
                <Button
                  title="Create First Post"
                  onPress={() => router.push("/(tabs)/create")}
                />
              </View>
            )}
          </View>

          {/* Account Info */}
          <View
            className={`mt-8 p-4 rounded-xl ${
              isDark ? "bg-gray-800" : "bg-gray-300"
            }`}
          >
            <Text
              className={`text-xs font-medium mb-2 rounded-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              ACCOUNT INFO
            </Text>
            <View className="space-y-2">
              <View className="flex-row justify-between mb-2">
                <Text
                  className={`text-sm mr-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  User ID
                </Text>
                <Text
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {user?.id?.substring(0, 8)}...
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  className={`text-sm mr-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Member Since
                </Text>
                <Text
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {new Date(userProfile?.created_at).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
