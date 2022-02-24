import React from "react";
import Navigation from "./app/navigations/Navigation";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./app/context/context";
import { RootSiblingParent } from "react-native-root-siblings";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as yup from "yup";
import { StatusBar } from "expo-status-bar";
import { io } from "socket.io-client";
import FlashMessage from "react-native-flash-message";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { Restart } from "fiction-expo-restart";

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === "granted") {
        console.log("Yay! I have user permission to track data");
      } else {
      }
    })();
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
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
      dispatch({ type: "RETRIEVE_TOKEN", token: JSON.parse(userToken) });
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <View style={{ flex: 1, backgroundColor: "black" }}>
            <AuthContext.Provider value={{ authContext, loginState }}>
              <StatusBar style="light" />
              <Navigation />
            </AuthContext.Provider>
          </View>
          <FlashMessage position="bottom" style={{ zIndex: 90000 }} />
        </RootSiblingParent>
      </SafeAreaProvider>
    </SafeAreaView>
  );
}
