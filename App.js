import React from "react";
import Navigation from "./app/navigations/Navigation";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={"black"} StatusBarStyle={"dark-content"} />
      <Navigation />
    </SafeAreaProvider>
  );
}
