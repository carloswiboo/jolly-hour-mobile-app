import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingComponent() {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={["#FC466B", "#3F5EFB"]}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/jollylogoapp.png")}
          style={{ width: 50, height: 60, marginBottom: 10 }}
        />
        <Text style={{ color: "white" }}>Consultando Información.</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
