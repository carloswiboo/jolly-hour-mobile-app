import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";

export default function HeaderInicioComponent({ navigation, params }) {
  //console.log("Parámetros de HeaderInicioComponent: " + JSON.stringify(params));

  const backButton = (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/flechaAtras.png")}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        {params.showBackButton == true ? backButton : null}
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/jollylogoapp.png")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    paddingHorizontal: 10,
  },
  tinyLogo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
});
