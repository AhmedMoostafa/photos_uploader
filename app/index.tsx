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
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Stack, useRouter } from "expo-router";
import { useState } from "react";

import styles from "../styles/photo";
import { login } from "../handlers/authHandler";

const Login = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const onLogin = async () => {
    let res = await login(email, password);
    if (res.error) {
      Alert.alert("Error", res.error);
    } else {
      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      await AsyncStorage.setItem("jwt", JSON.stringify(res.jwt));

      router.push("/home");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ headerTitle: "Login" }}></Stack.Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.welcomeMessgae}>Welcome To Gallery App </Text>

          <Text style={styles.loginTitle}>Login</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Email"
                onChangeText={onChangeEmail}
                value={email}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={onChangePassword}
                value={password}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={async () => {
                await onLogin();
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text
              style={styles.signupButton}
              onPress={() => {
                router.push("/auth/signup");
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
