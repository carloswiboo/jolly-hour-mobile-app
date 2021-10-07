import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./../screens/WelcomeScreen";

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="welcomescreen"
        component={WelcomeScreen}
        options={{ title: "Bienvenido", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
