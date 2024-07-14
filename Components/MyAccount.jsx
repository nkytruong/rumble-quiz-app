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
import { getAvatar, getUserByUsername } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import { withTheme } from "react-native-paper";

function MyAccount({ theme, setIsLoggedIn, avatars }) {
  const [colourTheme, setColourTheme] = useState();
  const [editingMode, setEditingMode] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userLogged, setUserLogged] = useState("");
  const [userLoggedAvatar, setUserLoggedAvatar] = useState({});
  const { colors } = theme;
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
  }, [userLogged]);

  useEffect(() => {
    if (userLogged) {
      getUserByUsername(userLogged).then(({ user }) => {
        setUserDetails(user);
        setColourTheme(user.colour_theme_id);
      });
    }
  }, [userLogged]);

  useEffect(() => {
    //console.log(userDetails)
    if(userDetails){
      getAvatar(userDetails.avatar_id)
        .then(({avatar}) => {
          console.log(avatar.avatar_url);

          setUserLoggedAvatar(avatar);
          AsyncStorage.setItem("avatar_url", avatar.avatar_url);
        })
        .catch((err) => console.log("Error getting avatar from async storage ", err));
    }
  }, [userDetails]);

  const colour_themes = [
    { colour_theme_id: 1, theme_name: "Light" },
    { colour_theme_id: 2, theme_name: "Dark" },
    //{ colour_theme_id: 3, theme_name: "Kids" },
  ];

  const displayForm = () => {
    setEditingMode(true);
  };

  const onLogOutPressed = async () => {
    await AsyncStorage.setItem("isLoggedIn", JSON.stringify(false));
    await AsyncStorage.setItem("token", "");
    await AsyncStorage.setItem("userLogged", "");
    navigation.navigate("LogIn");
    setIsLoggedIn(false);
  };

  // Styles are defined inside of the component to have access to the theme
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    userCard: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: colors.orange,
      padding: 20,
    },
    userDetails: {
      width: "60%",
    },
    avatarContainer: {
      padding: 10,
      borderRadius: 100,
      backgroundColor: "#FFE4C6",
      width: 100,
      height: 100,
    },
    avatar: {
      width: "100%",
      height: "100%",
    },
    h2: {
      fontSize: 30,
    },
    h2_bold: {
      fontSize: 25,
      fontWeight: "bold",
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
  return (
    <>
      <CustomButton type="TERTIARY" text="Log Out" onPress={onLogOutPressed} />
      <View style={styles.userCard}>
        <View style={styles.userDetails}>
          <Text style={styles.h2_bold}>Welcome</Text>
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
            placeholder="Colour Theme: Light"
            searchPlaceholder="Search..."
            onChange={(e) => {
              setColourTheme(e.value);
            }}
          />
          <Button title="Edit details" onPress={displayForm} />
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: userLoggedAvatar.avatar_url }}
            style={styles.avatar}
          />
        </View>
      </View>
      <ScrollView>
        <View>
          {editingMode ? (
            <EditDetails
              setEditingMode={setEditingMode}
              userDetails={userDetails}
              avatars={avatars}
            />
          ) : null}
          {userLogged ? (
            <Stats username={userDetails.username} userLogged={userLogged} />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

export default withTheme(MyAccount);
