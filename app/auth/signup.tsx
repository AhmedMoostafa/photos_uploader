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

import styles from "../../styles/photo";
import { signUp } from "../../handlers/authHandler";

const Signup = () => {
  const router = useRouter();
  const [firstName, onChangeFirstName] = useState("");

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const onSignup = async () => {
    let res = await signUp(firstName, email, password);
    if (res.error) {
      Alert.alert("Error", res.error);
    } else {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          firstName: firstName,
          email: email,
        })
      );
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

          <Text style={styles.loginTitle}>Create Account</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Name"
                onChangeText={onChangeFirstName}
                value={firstName}
              />
            </View>
          </View>
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
                console.log(password, firstName, email);
                if (password && firstName && email) {
                  await onSignup();
                } else {
                  Alert.alert("Error", "Missing Fields");
                }
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text
              style={styles.signupButton}
              onPress={() => {
                router.push("/");
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
