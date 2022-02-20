import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { Dimensions } from "react-native";
import React from "react";
import imagenCategorias from "../../assets/CargandoJH.gif";

const windowWidth = Dimensions.get("window").width;

export default function LoadingCategoriesComponent() {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ width: windowWidth, flex: 4 }}
        source={imagenCategorias}
        resizeMode={"contain"}
      />
      <Text style={{ textAlign: "center", fontWeight: 'bold', flex: 1}}>
        Estamos cargando las categorias... espera un poco
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
