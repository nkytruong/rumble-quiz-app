import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/Designer.jpeg";

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export default function LoadingPage() {
  const navigation = useNavigation();
  const sv = useSharedValue(0);

  React.useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);

    const timeout = setTimeout(() => {
      navigation.replace("LogIn");
    }, 5000); // 5 seconds

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [navigation, sv]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Image source={Logo} style={styles.image} />
      </Animated.View>
      <Text style={styles.welcome_message}>Welcome to Rumble Quiz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    height: 200,
    width: 200,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    alignContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  welcome_message: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 50,
  },
});
