import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { getDetailEmpresa } from "../API/APIEmpresa";
import { AuthContext } from "../context/context";
import LoadingComponent from "./../components/LoadingComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuid } from "uuid";
import HeaderDetailPromotion from "./../components/HeaderDetailPromotion";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { FontAwesome5 } from "@expo/vector-icons";

export default function BusinessDetailScreen({ route, navigation }) {
  const { params } = route;
  const { loginState } = React.useContext(AuthContext);
  const [finalData, setFinalData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState({
    uri: "https://wiboo.com.mx/wp-content/uploads/2021/10/fondoDetallePromocion.png",
  });
  const [portada, setPortada] = React.useState({
    uri: "https://wiboo.com.mx/wp-content/uploads/2021/10/fondoDetallePromocion.png",
  });

  React.useEffect(() => {
    let ready = false;
    getDetailEmpresa(params.idempresa, null).then((resultado) => {
       

      setFinalData(resultado);
      setLoading(false);
    });
    return () => {
      ready = true;
    };
  }, []);

  return (
    <>
      {loading === true ? (
        <LoadingComponent />
      ) : (
        <>
          <SafeAreaView style={styles.container} key={uuid()}>
            <View style={styles.encabezado}>
              <ImageBackground
                source={{ uri: finalData.imagenConvertidaPortada }}
                style={styles.image}
              >
                <LinearGradient
                  // Background Linear Gradient
                  colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.6)"]}
                  style={styles.backgroundGradient}
                >
                  <HeaderDetailPromotion
                    navigation={navigation}
                    params={{ showBackButton: true }}
                    showBackButton={true}
                  />
                  <View style={styles.containerPromotionTitles}>
                    <Image
                      style={{
                        borderRadius: 100,
                        width: 80,
                        height: 80,
                        marginBottom: 10,
                      }}
                      source={{
                        uri: finalData.imagenConvertida,
                      }}
                    />
                    <Text style={[styles.whiteText, styles.titleOne]}>
                      {finalData.nombre}
                    </Text>
                    <Text style={[styles.whiteText, styles.titleTwo]}>
                      Jolly Hour
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
            <View style={styles.cuerpo}>
              <ScrollView
                style={{
                  backgroundColor: "white",
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <View style={{ paddingVertical: 20, paddingHorizontal: 5 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Descripción:
                  </Text>
                  <Text>
                   {finalData.descripcion}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonVerMasInformacion}
                  onPress={() => {
                    WebBrowser.openBrowserAsync(
                      "http://www.google.com/search?q=" +
                        encodeURIComponent(finalData.nombre)
                    );
                  }}
                >
                  <Text style={{ fontSize: 17 }}>
                    <FontAwesome5 name="search" size={17} color="black" />
                    &nbsp;Ver más información
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonLlamar}
                  onPress={() => {
                    Linking.openURL("tel:" + finalData.telefono);
                  }}
                >
                  <Text style={{ fontSize: 17 }}>
                    <FontAwesome name="phone" size={17} color="black" />
                    &nbsp;Llamar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonUbicacion}
                  onPress={() => {
                    WebBrowser.openBrowserAsync(
                      "https://www.google.com/maps/search/?api=1&query=" +
                        encodeURIComponent(finalData.direccion)
                    );
                  }}
                >
                  <Text style={{ fontSize: 17 }}>
                    <FontAwesome name="map-marker" size={17} color="black" />
                    &nbsp;Ir a Ubicación
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonFacebook}
                  onPress={() => {
                    WebBrowser.openBrowserAsync(finalData.facebook);
                  }}
                >
                  <Text style={{ fontSize: 17, color: "white" }}>
                    <FontAwesome name="facebook" size={17} color="white" />{" "}
                    &nbsp;Facebook
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonInstagram}
                  onPress={() => {
                    WebBrowser.openBrowserAsync(finalData.instagram);
                  }}
                >
                  <Text style={{ fontSize: 17, color: "white" }}>
                    <FontAwesome name="instagram" size={17} color="white" />
                    &nbsp;Instagram
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
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
    backgroundColor: "black",
  },
  cuerpo: {
    flex: 7,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    marginTop: -17,
    flexDirection: "column",
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
    fontSize: 13,
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
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#ffbc00",
    justifyContent: "center",
    padding: 7,
    paddingVertical: 10,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  buttonVerMasInformacion: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    padding: 7,
    paddingVertical: 10,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  buttonUbicacion: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#34A853",
    justifyContent: "center",
    padding: 7,
    paddingVertical: 10,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  buttonLlamar: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    padding: 7,
    paddingVertical: 10,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  buttonFacebook: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#3B5998",
    justifyContent: "center",
    padding: 7,
    paddingVertical: 10,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  buttonInstagram: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#DE1B85",
    justifyContent: "center",
    padding: 7,
    paddingVertical: 10,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 3,
    marginBottom: 5,
  },
});
