import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";

import { getAvatars } from "./utils/api";

// components
import LoginPage from "./Components/LoginPage";
import CreateAccountPage from "./Components/CreateAccountPage";
import MyAccount from "./Components/MyAccount";
import Friends from "./Components/Friends";
import NotificationsList from "./Components/NotificationsList";
import LeaderBoard from "./Components/LeaderBoardPage";
import QuizPage from "./Components/QuizPage";
import LoadingPage from "./Components/LoadingPage";

// Navigation
import AppNavigation from "./navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Context and storage
//import { UserContext } from "./context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorsDark, colorsLight } from "./Styles/ThemeColors";
import { useColorScheme, Appearance } from "react-native";
import EndOfGame from "./Components/EndOfGame";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLogged, setUserLogged] = useState("");
  const colorScheme = useColorScheme();
  const [currentScheme, setCurrentScheme] = useState(colorScheme);
  const [isLoading, setIsLoading] = useState(false);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setCurrentScheme(colorScheme);
    });
  
    return () => subscription.remove();
  }, []);
  const paperTheme =
    currentScheme === "dark"
      ? { ...DefaultTheme, colors: colorsDark }
      : { ...DefaultTheme, colors: colorsLight };

  const getDataFromStorage = async () => {
    const logged = await AsyncStorage.getItem("isLoggedIn");
    const user = await AsyncStorage.getItem("userLogged");
    // const user_avatar = await AsyncStorage.getItem("avatar_url");

    if (logged === "true") {
      setIsLoggedIn(true);
      setUserLogged(user);
    } else {
      setIsLoggedIn(false);
      setUserLogged("");
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);


  useEffect(() => {
    getAvatars().then(({ avatars }) => {
      setAvatars(avatars);
    });
  }, []);


  const AfterLogin = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="AppNavigation">
        {(props) => (
          <AppNavigation
            {...props}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            avatars={avatars}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="QuizPage" component={QuizPage} />
      <Stack.Screen name="EndOfGame" component={EndOfGame} />
      <Stack.Screen name="MyAccount">
        {(props) => (
          <MyAccount
            {...props}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            avatars={avatars}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="LeaderBoard">
        {(props) => (
          <LeaderBoard
            {...props}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Notifications" component={NotificationsList} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="CreateAccount">
        {(props) => (
          <CreateAccountPage
            {...props}
            setIsLoggedIn={setIsLoggedIn}
            currentScheme={currentScheme}
            avatars={avatars}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="LogIn">
        {(props) => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  const BeforeLogin = () => (
    <Stack.Navigator initialRouteName="LoadingPage" screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen
        name="LoadingPage"
        component={LoadingPage}
      />
      <Stack.Screen name="LogIn">
        {(props) => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="CreateAccount">
        {(props) => (
          <CreateAccountPage
            {...props}
            setIsLoggedIn={setIsLoggedIn}
            currentScheme={currentScheme}
            avatars={avatars}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AppNavigation">
        {(props) => (
          <AppNavigation
            {...props}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );

  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={styles.root}>
          <PaperProvider theme={paperTheme}>
            {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
          </PaperProvider>
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
