import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { CountDownText } from "react-native-countdown-timer-text";
import { CounterDataTime } from "../helpers/CounterDataTime";
import BusinessCardDataComponent from "./BusinessCardDataComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

export default function CardComponent({ navigation, params, islogged }) {
  debugger;
  console.log(params);
  let image = { uri: params.imagenConvertida };

  const [resultadoMinutosQuedan, setResultadoMinutosQuedan] =
    React.useState("0");

  React.useEffect(() => {
    let ready = false;

    const resultadoMinutosQuedanN = CounterDataTime(
      params.fechaPublicacion,
      params.horaFin
    );

    const d = new Date();
    let minutes = d.getMinutes();
    let seconds = 3600 - minutes * 60;

    setResultadoMinutosQuedan(seconds);

    return () => {
      ready = true;
    };
  }, []);

  return (
    <View>
      {islogged == false ? null : null}
      <BusinessCardDataComponent navigation={navigation} params={params} />
      <View style={styles.container}>
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          source={image}
          style={styles.image}
        >
          <View style={styles.opacity}>
            <AntDesign
              style={styles.heart}
              name="hearto"
              size={18}
              color="white"
              onPress={() =>
                navigation.navigate("promotiondetail", {
                  idpromocion: params.id,
                })
              }
            />
            {params.agotado == 1 ? (
              <>
                <View style={styles.dueDateDeshabilitado}>
                  <Text>
                    <MaterialIcons name="timer" size={11} color="white" />
                    <CountDownText
                      style={{ fontWeight: "bold" }}
                      countType="date"
                      auto={true}
                      afterEnd={() => {}}
                      timeLeft={resultadoMinutosQuedan}
                      step={-1}
                      startText=""
                      endText="Oferta Terminada"
                      intervalText={(date, hour, min, sec) =>
                        "Finaliza en: " + min + ":" + sec
                      }
                    />
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.dueDate}>
                  <Text>
                    <MaterialIcons name="timer" size={11} color="white" />
                    <CountDownText
                      style={{ fontWeight: "bold" }}
                      countType="date"
                      auto={true}
                      afterEnd={() => {}}
                      timeLeft={resultadoMinutosQuedan}
                      step={-1}
                      startText=""
                      endText="Oferta Terminada"
                      intervalText={(date, hour, min, sec) =>
                        "Finaliza en: " + min + ":" + sec
                      }
                    />
                  </Text>
                </View>
              </>
            )}
            <View style={{ marginTop: 20 }}>
              <Text style={[styles.whiteText, styles.titleOne]}>
                {params.titulo}
              </Text>
              <Text style={[styles.whiteText, styles.titleTwo]}>
                {params.descripcionCorta}
              </Text>
            </View>
            {islogged == false ? (
              <>
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("welcomescreen")}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Obtener Promoción
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {params.agotado == 1 ? (
                  <>
                    <View style={{ marginTop: 20 }}>
                      <TouchableOpacity
                        style={styles.buttonDisabled}
                        onPress={() =>
                          navigation.navigate("promotiondetail", {
                            idpromocion: params.id,
                          })
                        }
                      >
                        <Text style={{ fontWeight: "bold", color: "white" }}>
                          Temporalmente Agotada
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={{ marginTop: 20 }}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                          navigation.navigate("promotiondetail", {
                            idpromocion: params.id,
                          })
                        }
                      >
                        <Text style={{ fontWeight: "bold", color: "white" }}>
                          ¡ Obtener Promoción !
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: "white",
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
  dueDate: {
    backgroundColor: "#ffbc00",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 4,
    paddingBottom: 4,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    position: "absolute",
    top: 15,
  },
  dueDateDeshabilitado: {
    backgroundColor: "#adadad",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 4,
    paddingBottom: 4,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    position: "absolute",
    top: 15,
  },
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
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ffbc00",
    padding: 7,
    borderRadius: 15,
    marginHorizontal: 30,
  },
  buttonDisabled: {
    alignItems: "center",
    backgroundColor: "#adadad",
    padding: 7,
    borderRadius: 15,
    marginHorizontal: 30,
  },
  heart: {
    position: "absolute",
    right: 20,
    top: 18,
  },
});
