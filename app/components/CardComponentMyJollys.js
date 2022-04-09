import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function CardComponentMyJollys(props) {
  return (
    <View style={styles.container}>
      {props.data.agotado == 1 ? (
        <>
          <View
            style={{
              width: "100%",
              alignContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "red" }}>
              Promoción temporalmente agotada
            </Text>
          </View>
        </>
      ) : null}
      <ImageBackground
        source={{ uri: props.data.imagenConvertida }}
        style={styles.image}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.opacity}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
            {props.data.titulo}
          </Text>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "300" }}>
            {props.data.descripcionCorta}
          </Text>
        </View>
      </ImageBackground>
      <View style={{ marginTop: 5, marginBottom: 5 }}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Descripción: </Text>
          {props.data.descripcionLarga}.
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Restricciones: </Text>
          {props.data.restricciones}.
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Vigencia: </Text>
          {props.data.vigencia}.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 30,
  },
  opacity: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    padding: 30,
  },
});
