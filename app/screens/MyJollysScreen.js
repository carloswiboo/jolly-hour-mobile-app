import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import CardsWallet from "react-native-wallet-cards";
import { Divider } from "react-native-elements";
import HeaderInicioComponent from "../components/HeaderInicioComponent";
import { LinearGradient } from "expo-linear-gradient";
import MyJollysComponentHeader from "../components/MyJollysComponentHeader";
import TitleScreenComponent from "../components/TitleScreenComponent";
export default function MyJollysScreen({ navigation }) {
  const tarjetasEjemplo = [
    <View style={styles.tarjetasEjemplo}>
      <MyJollysComponentHeader />
    </View>,
    <View style={styles.tarjetasEjemplo}>
      <MyJollysComponentHeader />
    </View>,
  ];

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#3F5EFB", "#FC466B"]}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
    >
      <SafeAreaView style={{ width: "100%", flex: 1, justifyContent:'flex-end' }}>
        <HeaderInicioComponent
          navigation={navigation}
          params={{ showBackButton: false }}
          showBackButton={true}
        />
        <TitleScreenComponent
          titlePage="Mis Jolly's"
          subTitle="Este es el historial de los Jollys! no se te pase hacerlos efectivos!"
        />
        <Divider style={{ backgroundColor: "rgba(255,255,255,.4)" }} />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <CardsWallet cardEasing={"ease-out-quart"} data={tarjetasEjemplo} cardHeight={700}/>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  subtitulo: {
    color: "white",
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  tarjetasEjemplo: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
