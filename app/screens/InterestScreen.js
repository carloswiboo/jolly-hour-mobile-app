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

export default function InterestScreen({ navigation }) {
  const [finalData, setFinalData] = React.useState([]);
  const { loginState } = React.useContext(AuthContext);
  const [hasChanged, setHasChanged] = React.useState(0);

  console.log(loginState);

  React.useEffect(() => {
    getCategoriesByUser(loginState).then((categoriasDeUsuario) => {
      setFinalData(categoriasDeUsuario);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCategoriesByUser(loginState).then((categoriasDeUsuario) => {
        setFinalData(categoriasDeUsuario);
      });
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          var finalResult = [];

          for (const valor of finalData) {
            debugger;

            if (valor.id == item.id) {
              valor.isActive = !valor.isActive;
              finalResult.push(valor);
            } else {
              finalResult.push(valor);
            }
          }

          setFinalData(finalResult);

          anadirEliminarCategorie(item.id, loginState).then((resultado) => {
            getCategoriesByUser(loginState).then((categoriasDeUsuario) => {
              setFinalData(categoriasDeUsuario);
            });
          });
        }}
      >
        {item.isActive == true ? (
          <Image style={styles.tinyLogo} source={item.imagenActiva} />
        ) : (
          <Image style={styles.tinyLogo} source={item.imagenInactiva} />
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
          <Text style={styles.textTitle}>Elige Tus{"\n"}Intereses</Text>
          <Text style={styles.textSubtitle}>
            Recibirás las mejores promociones conforme los intereses que elijas.
          </Text>
        </View>
        <View style={styles.categoriesContainer}>
          <FlatList
            style={styles.scrollViewContainer}
            numColumns={3}
            vertical
            showsHorizontalScrollIndicator={false}
            data={finalData}
            renderItem={renderItem}
          />
        </View>

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
  },
  scrollViewContainer: {
    flex: 1,
    width: "100%",
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
  textSubtitle: {
    paddingVertical: 10,
    color: "white",
    fontSize: 20,
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
