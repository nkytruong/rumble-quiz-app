import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CheckBox from "expo-checkbox";
import { SelectCountry } from "react-native-element-dropdown";

import { useNavigation } from "@react-navigation/native";
import { postNewUser } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function CreateAccountPage({
  currentScheme,
  avatars,
}) {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordRepeatInput, setPasswordRepeatInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [selected, setSelected] = useState(false);
  const [currentSchemeNumber, setCurrentSchemeNumber] = useState(null);
  const [avatar, setAvatar] = useState([]);

  const avatarsDrop = avatars.map((avatar) => {
    return { ...avatar, avatar_url: { uri: avatar.avatar_url } };
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (currentScheme === "light") {
      setCurrentSchemeNumber(1);
    } else if (currentScheme === "dark") {
      setCurrentSchemeNumber(2);
    }
  }, [currentScheme]);

  const onCreateAccountPressed = async () => {
    const postBody = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
      avatar_id: avatar,
      is_child: null,
      colour_theme_id: currentSchemeNumber,
      online: true,
    };

    try {
        await postNewUser(postBody);
        
        // Store the username in AsyncStorage
        await AsyncStorage.setItem('userLogged', usernameInput);
  
        navigation.navigate("AppNavigation");
      } catch (err) {
        console.log("Error posting new user:", err);
      }
  };

  const onLogInPressed = () => {
    navigation.navigate("LogIn");
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an Account</Text>
        <CustomInput
          placeholder="Username"
          value={usernameInput}
          setValue={setUsernameInput}
        />
        <CustomInput
          placeholder="Email"
          value={emailInput}
          setValue={setEmailInput}
        />
        <CustomInput
          placeholder="Password"
          value={passwordInput}
          setValue={setPasswordInput}
          secureTextEntry={!showPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          type="Password"
        />
        <CustomInput
          placeholder="Repeat Password"
          value={passwordRepeatInput}
          setValue={setPasswordRepeatInput}
          secureTextEntry={!showRepeatPassword}
          showRepeatPassword={showRepeatPassword}
          setShowRepeatPassword={setShowRepeatPassword}
          type="RepeatPassword"
        />
        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={avatar}
          data={avatarsDrop}
          valueField="avatar_id"
          labelField="avatar_name"
          imageField="avatar_url"
          placeholder="Select Avatar"
          onChange={(e) => {
            const { _index, ...selectedAvatar } = e;
            setAvatar(e.avatar_id);
          }}
        />
        <View style={styles.checkbox}>
          <CheckBox
            value={selected}
            disabled={false}
            onValueChange={setSelected}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Are you over 15?</Text>
        </View>
        <CustomButton text="Create Account" onPress={onCreateAccountPressed} />
        <CustomButton
          text="Have an account? Log in"
          onPress={onLogInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
  },
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  checkbox: {
    display: "inline-flex",
    flexDirection: "row",
    margin: 10,
  },
  checkboxText: {
    margin: 12,
  },
  dropdown: {
    marginVertical: 20,
    height: 50,
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
