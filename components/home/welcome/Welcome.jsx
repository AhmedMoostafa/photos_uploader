import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import styles from "./welcome.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../../types/api";
import photoStyles from "../../../styles/photo";

const Welcome = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  AsyncStorage.getItem("user").then((value) => {
    setUser(JSON.parse(value));
  });
  return (
    <View>
      <View style={styles.container}>
        <Text style={photoStyles.welcomeMessgae}>Hello {user?.firstName}</Text>
      </View>
    </View>
  );
};

export default Welcome;
