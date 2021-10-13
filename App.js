import React from "react";
import Navigation from "./app/navigations/Navigation";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./app/context/context";
import { RootSiblingParent } from "react-native-root-siblings";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as yup from "yup";
export default function App() {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {

      alert(token);
      debugger; 
      await AsyncStorage.setItem("tokenNotificaciones", JSON.stringify(token));
    });
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    debugger;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        debugger;
        const { status } = await Notifications.requestPermissionsAsync();

        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          userToken: action,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          userToken: action,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        try {
          await AsyncStorage.setItem("userToken", JSON.stringify(foundUser));
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({ type: "LOGIN", user: foundUser });
      },
      signOut: async () => {
        // setIsLoading(false);

        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        console.log(userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: JSON.parse(userToken) });
    }, 1000);
  }, []);

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        console.log(userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  return (
    <RootSiblingParent>
      <AuthContext.Provider value={{ authContext, loginState }}>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor={"black"}
            StatusBarStyle={"dark-content"}
          />
          <Navigation />
        </SafeAreaProvider>
      </AuthContext.Provider>
    </RootSiblingParent>
  );
}
