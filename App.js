import React from "react";
import Navigation from "./app/navigations/Navigation";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { useReducerAsync } from "use-reducer-async";
import { authReducer } from "./app/auth/authReducer";
import { AuthContext } from "./app/auth/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const init = async () => {
  try {
    debugger;
    const value = await AsyncStorage.getItem("@usuariojolly");
    console.log(value);
    return JSON.parse(value) || { logged: false };
  } catch (e) {
    // error reading value
  }
};

const setValue = async () => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem("@usuariojolly", JSON.stringify(user));
};

export default function App() {
  const [user, dispatch] = React.useReducer(authReducer, {}, init);

  React.useEffect(() => {
    const setValue = async (user) => {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@usuariojolly", JSON.stringify(user));
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={"black"} StatusBarStyle={"dark-content"} />
        <Navigation />
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
