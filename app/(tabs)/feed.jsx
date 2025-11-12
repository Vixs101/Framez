import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View,
} from "react-native";
import PostCard from "../../src/components/post/PostCard";
import { useTheme } from "../../src/context/ThemeContext";
import { supabase } from "../../src/lib/supabase";

export default function FeedScreen() {
  const { isDark } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  console.log(isDark);

  useEffect(() => {
    fetchPosts();

    // Subscribe to updates
    const subscription = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          // Add new post to the top
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          users (
            id,
            full_name,
            avatar_url
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const renderEmpty = () => (
    <View
      className={` ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } flex-1 items-center justify-center py-20`}
    >
      <Text className="text-6xl mb-4">📸</Text>
      <Text
        className={`text-xl font-semibold mb-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        No posts yet
      </Text>
      <Text
        className={`text-center px-8 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Be the first to share something amazing!
      </Text>
      <Text
        className={`text-center px-8 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Tap the + button to create a post.
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View
        className={`flex-1 items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-gray-50"
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
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 16,
          backgroundColor: isDark ? '#111827' : '#fff',
          flexGrow: 1,
        }}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDark ? "#a855f7" : "#9333ea"}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
