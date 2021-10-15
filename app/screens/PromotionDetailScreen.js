import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import HeaderInicioComponent from "../components/HeaderInicioComponent";

export default function PromotionDetailScreen({ route, navigation }) {

    debugger;
  const { params } = route;

  const image = {
    uri: "https://fastly.4sqi.net/img/general/600x600/26742501_qJZ8UKR2at4J726YlAz8gW33TevskQJQlZ6kB6sznOE.jpg",
  };

  console.log(params);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.encabezado}>
        <ImageBackground source={image} style={styles.image}>
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)"]}
            style={styles.backgroundGradient}
          >
            <HeaderInicioComponent
              navigation={navigation}
              params={{ showBackButton: true }}
              showBackButton={true}
            />
            <View style={styles.containerPromotionTitles}>
              <Text style={[styles.whiteText, styles.titleOne]}>
                50% Descuento
              </Text>
              <Text style={[styles.whiteText, styles.titleTwo]}>
                Hamburguesa Hawaiana
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.cuerpo}>
        <Text>
          Aqui pongo el Detalle de promoción que es = {JSON.stringify(params)}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  encabezado: {
    flex: 5,
    backgroundColor: "blue",
  },
  cuerpo: {
    flex: 7,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    marginTop: -20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },
  backgroundGradient: {
    flex: 1,
  },
  titleOne: {
    fontWeight: "bold",
    fontSize: 30,
  },
  titleTwo: {
    fontSize: 18,
  },
  titleThree: {
    fontSize: 14,
  },
  containerPromotionTitles: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
