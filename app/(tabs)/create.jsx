import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../../src/components/common/Button";
import { useAuth } from "../../src/context/AuthContext";
import { useTheme } from "../../src/context/ThemeContext";
import { supabase } from "../../src/lib/supabase";

export default function CreateScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

 
  const pickImage = async () => {
    try {
      // get permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant camera roll permissions to upload images."
        );
        return;
      }

      // laucch picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      const fileExt = imageUri.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      // Convert URI to blob for upload
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("post-images")
        .upload(fileName, arrayBuffer, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleCreatePost = async () => {
    // validation
    if (!caption.trim() && !selectedImage) {
      Alert.alert("Error", "Please add a caption or select an image");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = null;

      // Upload image if selected
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage.uri);
      }

      // Create post in database
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            user_id: user.id,
            caption: caption.trim() || null,
            image_url: imageUrl,
          },
        ])
        .select();

      if (error) throw error;

      Alert.alert("Success!", "Your post has been created", [
        {
          text: "OK",
          onPress: () => {
            setCaption("");
            setSelectedImage(null);
            router.push("/(tabs)/feed");
          },
        },
      ]);
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", error.message || "Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 ${isDark ? "bg-gray-900" : "bg-white"}`}
      contentContainerStyle={{
          backgroundColor: isDark ? '#111827' : '#fff',
         
        }}
    >
      <ScrollView
        className={`flex-1`}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 0, paddingLeft: 16, paddingRight:16 , backgroundColor: isDark ? '#111827' : '#fff',  flexGrow: 1, }}
        keyboardShouldPersistTaps="handled"
      >
        <View className={`flex-1`}>
          {/* Header */}
          <View className={`mb-4 ${isDark ? "bg-gray-900" : "bg-white"}`}>
            <Text
              className={`text-2xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Create New Post
            </Text>
            <Text className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Share your moment with the world
            </Text>
          </View>

          {/* Image Picker */}
          <TouchableOpacity
            onPress={pickImage}
            className={`rounded-xl mb-4 w-full -z-100 overflow-hidden border-2 border-dashed ${
              isDark
                ? "border-gray-700"
                : "border-gray-300 bg-gray-50"
            }`}
            style={{ aspectRatio: 4 / 3 }}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                className="w-full h-full z-50"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Text className="text-6xl mb-3">📷</Text>
                <Text
                  className={`text-base font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Tap to select an image
                </Text>
                <Text
                  className={`text-sm mt-1 ${
                    isDark ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  Optional
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {selectedImage && (
            <TouchableOpacity
              onPress={() => setSelectedImage(null)}
              className="mb-4 w-full flex items-center"
            >
              <Text
                className={`text-centerunderline ${
                  isDark ? "text-white" : "text-red-600"
                }`}
              >
                Remove Image ❌
              </Text>
            </TouchableOpacity>
          )}

          {/* Caption Input */}
          <View className="mb-4">
            <Text
              className={`text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Caption
            </Text>
            <TextInput
              value={caption}
              onChangeText={setCaption}
              placeholder="Write a caption..."
              placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className={`border-2 rounded-xl p-4 text-base ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              maxLength={500}
            />
            <Text
              className={`text-xs mt-1 text-right ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {caption.length}/500
            </Text>
          </View>

          {/* Post Button */}
          <Button
            title={uploading ? "Posting..." : "Share Post"}
            onPress={handleCreatePost}
            loading={uploading}
            disabled={uploading}
            className="mb-4"
          />

          {/* Tips */}
          <View
            className={`mt-6 p-4 rounded-xl ${
              isDark ? "bg-gray-800" : "bg-purple-50"
            }`}
          >
            <Text
              className={`text-sm font-medium mb-2 ${
                isDark ? "text-purple-300" : "text-purple-900"
              }`}
            >
              💡 Tips for great posts:
            </Text>
            <Text
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              • Add a caption or image (or both!)
              {"\n"}• Keep captions clear and engaging
              {"\n"}• Use high-quality images
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
