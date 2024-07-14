import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import CustomStyles from "../Styles/CustomStyles";
import CustomInput from "./CustomInput";
import { patchUserByUsername } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditDetails({ setEditingMode, userDetails, avatars }) {
  const [newUsername, setNewUsername] = useState(userDetails.username);
  const [newEmail, setNewEmail] = useState(userDetails.email);
  const [selectedAvatarId, setSelectedAvatarId] = useState(userDetails.avatar_id);


  if (!avatars) {
    avatars = [];
  }

  const avatarsDrop = avatars.map((avatar) => {
    return { ...avatar, avatar_url: { uri: avatar.avatar_url } };
  });

  const saveUserDetails = async() => {
    const patchBody = {
      username: newUsername,
      email: newEmail,
      avatar_id: selectedAvatarId
    }
    try {
      await patchUserByUsername(userDetails.username, patchBody)
      await AsyncStorage.setItem("userLogged", newUsername);
      const userLogged = await AsyncStorage.getItem("userLogged")
      setEditingMode(false);
    } catch(err) {
      console.log("Error updating user details", err)
      Alert.alert(
        "Unable to process change",
        "Please try again later",
        [
          {text: "OK"}
        ]
      )
    }
  };

  return (
    <View style={CustomStyles.container}>
      <Text style={CustomStyles.h3}>Edit Details</Text>
      <Text style={styles.input_titles}>Username</Text>
      <CustomInput
        value={newUsername}
        setValue={setNewUsername}
        placeholder="Enter Username"
      />
      <Text style={styles.input_titles}>Email</Text>
      <CustomInput
        value={newEmail}
        setValue={setNewEmail}
        placeholder="Enter Email"
      />
      <Text style={styles.input_titles}>Avatar</Text>
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        maxHeight={200}
        value={selectedAvatarId}
        data={avatarsDrop}
        valueField="avatar_id"
        labelField="avatar_name"
        imageField="avatar_url"
        placeholder="Select avatar"
        searchPlaceholder="Search..."
        onChange={(e) => {
          setSelectedAvatarId(e.avatar_id);
        }}
      />
      <Button title="Save Details" onPress={saveUserDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    border: "1px solid grey",
    padding: "4px",
  },
  password: {},
  checkbox: { display: "inline-flex", flexDirection: "row" },

  dropdown: {
    marginBottom: 20,
    marginTop: 6,
    height: 50,
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
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
  icon: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  input_titles:{
    alignSelf: 'flex-start',
    marginTop: 5,
    fontSize: 16,
    color: 'grey',
  }
});
