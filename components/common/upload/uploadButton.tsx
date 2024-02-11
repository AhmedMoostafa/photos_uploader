import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import styles from "../../../styles/photo";
interface UploadButtonProps {
  image: string;
  setImage: any;
}
const UploadButton: React.FC<UploadButtonProps> = ({ image, setImage }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // await imageUploading(result.assets[0].uri);
      image = result.assets[0].uri;
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.logoContainer}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: image }}
          style={{ ...styles.logoImage, width: 250, height: 250 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
export default UploadButton;
