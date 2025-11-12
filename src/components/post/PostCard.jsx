// import { Heart, MessageCircle, Share2 } from "lucide-react-native";
import { Heart, MessageCircle, Share2 } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function PostCard({ post }) {
  const { isDark } = useTheme();

  // format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <View
      className={`mb-4 rounded-xl overflow-hidden ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Header - User Info */}
      <View className="flex-row items-center p-4">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${
            isDark ? "bg-purple-900" : "bg-purple-100"
          }`}
        >
          <Text
            className={`text-lg font-bold ${
              isDark ? "text-purple-300" : "text-purple-600"
            }`}
          >
            {post.users?.full_name?.charAt(0).toUpperCase() || "?"}
          </Text>
        </View>
        <View className="flex-1 ml-3">
          <Text
            className={`font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {post.users?.full_name || "Anonymous"}
          </Text>
          <Text
            className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            {formatTime(post.created_at)}
          </Text>
        </View>
      </View>

      {/* Caption */}
      {post.caption && (
        <View className="p-4">
          <Text className={`${isDark ? "text-gray-200" : "text-gray-800"}`}>
            {post.caption}
          </Text>
        </View>
      )}

      {/* Image */}
      {post.image_url && (
        <Image
          source={{ uri: post.image_url }}
          className="w-full h-80 mb-4"
          resizeMode="cover"
        />
      )}

      {/* Action Buttons */}
      <View className="flex-row items-center px-4 pb-4 gap-4">
        <TouchableOpacity className="flex-row items-center gap-1">
          <Heart
            size={24}
            color={isDark ? "#9ca3af" : "#6b7280"}
            strokeWidth={2}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-1">
          <MessageCircle
            size={24}
            color={isDark ? "#9ca3af" : "#6b7280"}
            strokeWidth={2}
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Share2
            size={24}
            color={isDark ? "#9ca3af" : "#6b7280"}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
