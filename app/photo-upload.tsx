import UploadButton from "@/components/common/upload/uploadButton";
import {
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { COLORS, SIZES, icons } from "@/constants";
import * as FileSystem from "expo-file-system";

import { BACKEND_URL } from "@env";
import styles from "../styles/photo";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const placehold = "https://placehold.co/600x400/png?text=Upload+Image";
const UploadPhoto = () => {
  const [title, onChangetitle] = useState("");
  const [description, onChangeDescription] = useState("");

  const [image, setImage] = useState<string>(placehold);
  const imageUploading = async () => {
    let jwt = await AsyncStorage.getItem("jwt");

    let data = await FileSystem.uploadAsync(
      `${BACKEND_URL}/photos/upload/`,
      image, // uri of the image
      {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "image",
        parameters: { description, title },
        headers: {
          Authorization: `Bearer ${JSON.parse(jwt!)}`,
        },
      }
    );
    const body = JSON.parse(data.body);

    return body;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ headerTitle: "Upload Photo" }}></Stack.Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <UploadButton image={image} setImage={setImage} />

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Please Enter Title"
                onChangeText={onChangetitle}
                value={title}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Please Enter Description"
                onChangeText={onChangeDescription}
                value={description}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={async () => {
                if (image === placehold || description === "" || title === "") {
                  Alert.alert("Error", "Missong Fileds");
                } else {
                  const data = await imageUploading();

                  if (data.error) {
                    Alert.alert("Error", data.error);
                  } else {
                    Alert.alert("INFO", "Uploaded");
                  }
                }
              }}
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadPhoto;
