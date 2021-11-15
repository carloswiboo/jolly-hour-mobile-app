import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import CardsWallet from "react-native-wallet-cards";
import { Divider } from "react-native-elements";
import HeaderInicioComponent from "../components/HeaderInicioComponent";
import { LinearGradient } from "expo-linear-gradient";
import MyJollysComponentHeader from "../components/MyJollysComponentHeader";
import TitleScreenComponent from "../components/TitleScreenComponent";
import { AuthContext } from "../context/context";

import CardComponent from "../components/CardComponent";
import CardComponentMyJollys from "../components/CardComponentMyJollys";
import { getDetailJollys } from "./../API/APIMyJollys";
import AccordionDataComponent from "../components/AccordionDataComponent";
import { v4 as uuid } from "uuid";
import { ref } from "yup";

import { useFocusEffect } from "@react-navigation/native";

export default function MyJollysScreen({ navigation }) {
  const { authContext } = React.useContext(AuthContext);
  const { loginState } = React.useContext(AuthContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const [finalData, setFinalData] = React.useState([]);
  const [finalDataCard, setFinalDataCard] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let functionReady = false;
      getDetailJollys(loginState.userToken.id, null).then((resultado) => {
        setFinalData(resultado);
      });
      return () => {
        functionReady = true;
      };
    }, [])
  );

  React.useEffect(() => {
    let functionReady = false;
    getDetailJollys(loginState.userToken.id, null).then((resultado) => {
      setFinalData(resultado);
    });
    return () => {
      functionReady = true;
    };
  }, []);

  React.useEffect(() => {
    let functionReady = false;
    if (refreshing === true) {
      getDetailJollys(loginState.userToken.id, null).then((resultado) => {
        setFinalData(resultado);
      });
      return () => {
        functionReady = true;
      };
    } else {
      return;
    }
  }, [refreshing]);

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#3F5EFB", "#FC466B"]}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
    >
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "flex-end",
          marginTop: 32,
        }}
      >
        <HeaderInicioComponent
          navigation={navigation}
          params={{ showBackButton: false }}
          showBackButton={true}
        />
        <TitleScreenComponent
          titlePage="Mis Jolly's"
          subTitle="Aquí puedes ver las promociones que haz guardado, ¡Apresúrate a hacerlas efectivas!"
        />
        <Divider style={{ backgroundColor: "rgba(255,255,255,.4)" }} />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <AccordionDataComponent
            data={finalData}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
          />
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
