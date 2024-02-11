import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import { COLORS, SIZES } from "@/constants";
import PhotoCard from "@/components/common/cards/popular/photoCard";
import styles from "./gallery.style";
import { useRouter } from "expo-router";
import useFetch from "@/hook/useFetch";

const Gallery = () => {
  const router = useRouter();
  const [index, setindex] = useState(0);

  const { data, isLoading, error, refetch } = useFetch(`photos/list`, {});
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Photos</Text>
        <Button
          title="RefResh"
          onPress={() => {
            refetch();
          }}
        />
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size={"large"} />
        ) : error ? (
          <Text>Somthing Wrong</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data ? data.photos : []}
            onEndReached={() => {
              setindex(index + 1);
            }}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <PhotoCard
                item={item}
                handleCardPress={(item) => {
                  router.push(`/photo-details/${item.id}`);
                }}
              />
            )}
            keyExtractor={(item) => item?.id}
          />
        )}
      </View>
    </View>
  );
};

export default Gallery;
