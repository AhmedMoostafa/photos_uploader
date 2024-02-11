import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";
import { Photo } from "@/types/api";

const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: SIZES.xLarge,
    marginTop: SIZES.large,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",

    ...SHADOWS.medium,
  },
  logoContainer: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },

  infoContainer: {
    marginTop: SIZES.large,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default styles;
