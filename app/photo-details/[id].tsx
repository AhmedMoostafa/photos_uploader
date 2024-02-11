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

import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { COLORS, SIZES, icons, images } from "@/constants";
import useFetch from "@/hook/useFetch";
import { Photo } from "@/types/api";
import { BACKEND_URL } from "@env";
import styles from "../../styles/photo";
import { upadtePhoto } from "@/handlers/photoHandler";

const PhotoDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch<{ photo: Photo }>(
    `photos/photo/${params.id}`,
    {}
  );
  const [title, onChangetitle] = useState(data?.photo.title);
  const [description, onChangeDescription] = useState(data?.photo.description);
  const [imageUri, setImageUri] = useState<any>(null);
  const getImage = async (path: string) => {
    try {
      const res = await fetch(path);
      if (res.status === 404) {
        throw new Error("Not Found");
      }
      const data = await res.blob();
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(data);
      fileReaderInstance.onload = () => {
        let base64data = fileReaderInstance.result;
        setImageUri(base64data);
      };
    } catch (error) {
      setImageUri(images.notFound);
    }
  };

  useEffect(() => {
    getImage(`${BACKEND_URL}/${data?.photo.path}`);
    onChangetitle(data?.photo.title);
    onChangeDescription(data?.photo.description);
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{ headerTitle: data?.photo.title }}></Stack.Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data?.photo === undefined ? (
            <Text>No data available</Text>
          ) : (
            <Image
              source={{
                uri: imageUri,
              }}
              resizeMode="contain"
              style={styles.logoImage}
            />
          )}

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                onChangeText={onChangetitle}
                defaultValue={data?.photo.title}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                onChangeText={onChangeDescription}
                defaultValue={data?.photo.description}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={async () => {
                if (title && description) {
                  const data = await upadtePhoto(
                    params.id.toString(),
                    title,
                    description
                  );
                  if (data.error) {
                    Alert.alert("Error", data.error);
                  } else {
                    Alert.alert("INFO", "Uploaded");
                  }
                } else {
                  Alert.alert("Error", "Missing Fileds");
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

export default PhotoDetails;
