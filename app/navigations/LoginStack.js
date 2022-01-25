import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./../screens/WelcomeScreen";
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
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
