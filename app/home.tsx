import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "@/constants";
import { Gallery, ScreenHeaderBtn, Welcome } from "@/components";
import { FloatingAction } from "react-native-floating-action";
const actions = [
  {
    text: "Upload Image",
    icon: icons.upload,
    name: "upload_img",
    position: 2,
  },
];

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen />
      <View style={{ flex: 1, padding: SIZES.medium }}>
        <Welcome />
        <Gallery />
      </View>
      <FloatingAction
        actions={actions}
        color="rgb(63, 2, 121)"
        onPressItem={() => {
          router.push("/photo-upload");
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
