import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Badge, withBadge } from "react-native-elements";
import axios from "axios";
import {
  anadirEliminarCategorie,
  getAllCategorias,
  getCategoriesByUser,
} from "../API/APICategorias";
import { AuthContext } from "../context/context";

import { useFocusEffect } from "@react-navigation/native";
import LoadingComponent from "../components/LoadingComponent";
import LoadingCategoriesComponent from "../components/LoadingCategoriesComponent";

export default function InterestScreen({ navigation }) {
  const [finalData, setFinalData] = React.useState([]);
  const { loginState } = React.useContext(AuthContext);
  const [hasChanged, setHasChanged] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const [tiempo, setTiempo] = React.useState(0);
  const [countCategoriasActivas, setCountCategoriasActivas] = React.useState(0);

  let contadorActivas = 0;

  React.useEffect(() => {
    setFinalData([]);
    setLoading(true);
    getCategoriesByUser(loginState).then((categoriasDeUsuario) => {
      setFinalData(categoriasDeUsuario);
      console.log(categoriasDeUsuario);

      for (const categoria of categoriasDeUsuario) {
        if (categoria.isActive == true) {
          contadorActivas = contadorActivas + 1;
        }
      }

      setCountCategoriasActivas(contadorActivas);

      debugger;
      setLoading(false);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setFinalData([]);
      setLoading(true);

      getCategoriesByUser(loginState).then((categoriasDeUsuario) => {
        setFinalData(categoriasDeUsuario);
        setLoading(false);
      });
    }, [])
  );

  const restarFechas = async () => {
    var resultadoGuardado = await AsyncStorage.getItem(
      "fechaCaducidadVentanaIntereses"
    );
    var currentDate = new Date();
    var actualDate = new Date(currentDate.getTime()).toString();

    var diff = new Date(resultadoGuardado) - new Date(currentDate.getTime());

    var minutes = Math.floor(diff / 1000 / 60);

    setTiempo(minutes);
  };

  React.useEffect(() => {
    restarFechas();
    return () => {
      true;
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          var finalResult = [];

          for (const valor of finalData) {
            if (valor.id == item.id) {
              valor.isActive = !valor.isActive;
              finalResult.push(valor);
            } else {
              finalResult.push(valor);
            }
          }

          debugger;
          let contadorActivas2 = 0;
          for (const categoria of finalData) {
            if (categoria.isActive == true) {
              contadorActivas2 = contadorActivas2 + 1;
            }
          }

          debugger;
          setCountCategoriasActivas(contadorActivas2);

          setFinalData(finalResult);

          anadirEliminarCategorie(item.id, loginState).then((resultado) => {});
        }}
      >
        {item.isActive == true ? (
          <Image style={styles.tinyLogo} source={{ uri: item.imagenActiva }} />
        ) : (
          <Image
            style={styles.tinyLogo}
            source={{ uri: item.imagenInactiva }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      style={styles.loginBackground}
      colors={["#FC466B", "#3F5EFB"]}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Elige tus</Text>
          <Text style={styles.textTitleDos}>intereses</Text>
          <Text style={styles.textSubtitle}>
            Recibir??s las mejores promociones conforme los intereses que elijas.
          </Text>
        </View>
        <View style={styles.categoriesContainer}>
          {loading == false ? (
            <>
              <FlatList
                style={styles.scrollViewContainer}
                numColumns={3}
                vertical
                showsHorizontalScrollIndicator={false}
                data={finalData}
                renderItem={renderItem}
              />
            </>
          ) : (
            <LoadingCategoriesComponent />
          )}
        </View>

        {countCategoriasActivas > 0 && loading == false && tiempo > 0 ? (
          <>
            <TouchableOpacity
              style={{
                padding: 15,
                alignContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("home");
              }}
            >
              <Text style={{ color: "white" }}>Iniciar</Text>
            </TouchableOpacity>
          </>
        ) : null}

        {/*<View style={styles.containerButtons}>
          <Button
            buttonStyle={styles.buttonOmit}
            type="outline"
            title="Omitir"
            onPress={() => navigation.navigate("TabsComponent")}
          />
          <Button
            buttonStyle={styles.buttonNext}
            title="Siguiente"
            onPress={() => saveCategoriesAndContinue()}
          />
  </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    marginTop: 30,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  categoriesContainer: {
    backgroundColor: "white",
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  scrollViewContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 15,
  },
  containerButtons: {
    backgroundColor: "white",
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginBackground: {
    flex: 1,
  },
  textTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
  },
  textTitleDos: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    marginTop: -10
  },
  textSubtitle: {
    paddingVertical: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "100",
  },
  buttonOmit: {
    borderRadius: 40,
    paddingHorizontal: 30,
  },
  buttonNext: {
    borderRadius: 40,
    paddingHorizontal: 30,
  },
  item: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    margin: 0,
    position: "relative",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tinyLogo: {
    flex: 1,
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  overlayTrue: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7,237,122,0.1)",
    borderRadius: 20,
  },
  overlayFalse: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
  },
  badgesSuccess: {
    position: "absolute",
    top: 0,
    right: 0,
    textAlign: "right",
  },
});
