import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import EditDetails from "./EditDetails";
import Stats from "./Stats";
import { getUserByUsername } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";

export default function MyAccount() {
  const [colourTheme, setColourTheme] = useState(1);
  const [editingMode, setEditingMode] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userLogged, setUserLogged] = useState("");

  const navigation = useNavigation();

  const getUserLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("userLogged");
      setUserLogged(user);
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage", error);
    }
  };

  useEffect(() => {
    getUserLogged();
  }, []);

  useEffect(() => {
    if (userLogged) {
      getUserByUsername(userLogged).then(({ user }) => {
        setUserDetails(user);
      });
    }
  }, [userLogged]);

  const colour_themes = [
    { colour_theme_id: 1, theme_name: "Light" },
    { colour_theme_id: 2, theme_name: "Dark" },
    { colour_theme_id: 3, theme_name: "Kids" },
  ];

  const displayForm = () => {
    setEditingMode(true);
  };

  const onLogOutPressed = async () => {
    await AsyncStorage.setItem("isLoggedIn", "");
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("userLogged", "");
    navigation.navigate("Auth");
  };

  return (
    <>
      <CustomButton type="TERTIARY" text="Log Out" onPress={onLogOutPressed} />
      <View style={styles.userCard}>
        <View style={styles.userDetails}>
          <Text style={styles.h2}>{userLogged}</Text>
          <Text>{userDetails.email}</Text>
          <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            imageStyle={styles.imageStyle}
            iconStyle={styles.iconStyle}
            maxHeight={200}
            value={colourTheme}
            data={colour_themes}
            valueField="id"
            labelField="theme_name"
            imageField="avatar_url"
            placeholder="Select Colour Theme"
            searchPlaceholder="Search..."
            onChange={(e) => {
              setColourTheme(e.value);
            }}
          />
          <Button title="Edit details" onPress={displayForm} />
        </View>
        <View>
          <Image source={userDetails.avatar_id} style={styles.avatar} />
        </View>
      </View>
      <ScrollView>
        <View>
          {editingMode ? (
            <EditDetails setEditingMode={setEditingMode} user={userDetails} />
          ) : null}
          {userLogged ? (
            <Stats username={userDetails.username} userLogged={userLogged} />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  userCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#CCAE2F",
  },
  userDetails: {
    width: "60%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  h2: {
    fontSize: 30,
  },
  input: {
    border: "1px solid grey",
    padding: "4px",
  },
  password: {},
  checkbox: { display: "inline-flex", flexDirection: "row" },
  dropdown: {
    marginVertical: 20,
    height: 50,
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
});
