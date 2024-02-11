import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types"; // Import PropTypes

import styles from "./PhotoCard.style";
import { Photo } from "@/types/api";
import { BACKEND_URL } from "@env";
import { COLORS, images } from "@/constants";

interface PhotoCardProps {
  item: Photo; // Specify the type of item as string
  handleCardPress: (item: Photo) => void;
  index: number;
}
const PhotoCard: React.FC<PhotoCardProps> = ({ item, handleCardPress }) => {
  const [imageUri, setImageUri] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const getImage = async (path: string) => {
    try {
      const res = await fetch(path);
      if (res.status === 404) {
        setLoading(false);
        throw new Error("Not Found");
      }
      const data = await res.blob();
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(data);
      fileReaderInstance.onload = () => {
        let base64data = fileReaderInstance.result;

        setImageUri(base64data);
        setLoading(false);
      };
    } catch (error) {
      setImageUri(images.notFound);
    }
  };
  useEffect(() => {
    getImage(`${BACKEND_URL}/${item?.path}`);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <TouchableOpacity style={styles.container}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => handleCardPress(item)}
      >
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.logoImage}
          />
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PhotoCard;
