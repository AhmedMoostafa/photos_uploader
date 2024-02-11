import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../constants";
import { Photo } from "@/types/api";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    alignItems: "center",
    marginTop: "30%",
  },
  logoContainer: {
    width: "100%",
    height: "50%",
    borderRadius: SIZES.xLarge,

    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "40%",
  },

  infoContainer: {
    marginTop: SIZES.large,
  },

  inputField: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: SIZES.medium,
    height: 50,
  },

  searchBtn: {
    height: "100%",
    width: "40%",
    backgroundColor: COLORS.kenzz,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  welcomeMessgae: {
    fontSize: 30,
    color: "rgb(126, 0, 225)",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  loginTitle: {
    fontSize: 35,
    color: "rgb(123, 255, 176)",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginTop: SIZES.large,
  },
  signupButton: {
    color: "rgb(255, 210, 123)",
    fontWeight: "700",
    fontSize: SIZES.medium,
  },
});

export default styles;
