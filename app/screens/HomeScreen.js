import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { CounterContext } from "../../App";

export default function HomeScreen() {
  const { user, login, logout } = React.useContext(CounterContext);

  return (
    <View>
      <Text> Página principal amigo {JSON.stringify(user)}</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({});
