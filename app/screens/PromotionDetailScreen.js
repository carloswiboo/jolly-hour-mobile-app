import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import HeaderInicioComponent from "../components/HeaderInicioComponent";
import { AuthContext } from "../context/context";
import { getDetalleOfertaApp } from "../API/APIPromociones";
import imageLoading from "../../assets/fondoDetallePromocion.png";
import HeaderDetailPromotion from "../components/HeaderDetailPromotion";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../components/LoadingComponent";
import { setOfertasByUser } from "../API/APIUsuario";
import QRCode from "react-native-qrcode-svg";
import { CounterDataTime } from "../helpers/CounterDataTime";
import { CountDownText } from "react-native-countdown-timer-text";
import BusinessCardDataComponent from "../components/BusinessCardDataComponent";
import Toast from "react-native-root-toast";

export default function PromotionDetailScreen({ route, navigation }) {
  const { params } = route;
  const { loginState } = React.useContext(AuthContext);
  const [updateData, setUpdateData] = React.useState(0);
  const [resultadoMinutosQuedan, setResultadoMinutosQuedan] =
    React.useState("");
  const [finalData, setFinalData] = React.useState({
    objOferta: [],
    objCadena: [],
  });

  const [image, setImage] = React.useState({
    uri: "https://wiboo.com.mx/wp-content/uploads/2021/10/fondoDetallePromocion.png",
  });

  React.useEffect(() => {
    let isMounted = true;

    getDetalleOfertaApp({
      idusuario: loginState.userToken.id,
      idoferta: params.idpromocion,
    }).then((resultado) => {
      const resultadoImagen = resultado.objOferta[0].imagenPromocionConvertida;
      setImage({
        uri: resultadoImagen,
      });

      var horaFin = resultado.objOferta[0].horaFin;
      var fechaPublicacionFinal = resultado.objOferta[0].fechaPublicacion;

      const resultadoMinutosQuedanN = CounterDataTime(
        fechaPublicacionFinal,
        horaFin
      );

      setResultadoMinutosQuedan(resultadoMinutosQuedanN);

      setFinalData(resultado);
    });
    return function cleanup() {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {finalData.objOferta.length === 0 ? <LoadingComponent /> : null}
      {finalData.objOferta.map((oferta) => (
        <SafeAreaView style={styles.container} key={uuid()}>
          <View style={styles.encabezado}>
            <ImageBackground source={image} style={styles.image}>
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
                  <Text style={[styles.whiteText, styles.titleOne]}>
                    {finalData.objOferta[0].titulo}
                  </Text>
                  <Text style={[styles.whiteText, styles.titleTwo]}>
                    {finalData.objOferta[0].descripcionCorta}
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View style={styles.cuerpo}>
            <BusinessCardDataComponent
              navigation={navigation}
              params={finalData.objOferta[0]}
            />

           

            {finalData.objOferta[0].descripcionLarga == "" ? null : (
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Descripción:
                </Text>
                <Text>{finalData.objOferta[0].descripcionLarga}</Text>
              </View>
            )}
            {finalData.objOferta[0].descripcionLarga == "" ? null : (
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Restricciones:
                </Text>
                <Text>{finalData.objOferta[0].restricciones}</Text>
              </View>
            )}
            {finalData.objOferta[0].descripcionLarga == "" ? null : (
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Vigencia:
                </Text>
                <Text>{finalData.objOferta[0].vigencia}</Text>
              </View>
            )}

            {finalData.objCadena.map((qrcode) => (
              <View
                key={uuid()}
                style={{ alignItems: "center", marginVertical: 30 }}
              >
                <QRCode value={finalData.objCadena[0].cadena} />
                <Text>{finalData.objCadena[0].cadena}</Text>
              </View>
            ))}

            {finalData.objCadena.length === 0 ? (
                <>
              <Button
                onPress={() =>
                  setOfertasByUser({
                    idusuario: loginState.userToken.id,
                    idoferta: params.idpromocion,
                  }).then((resultado) => {
                    getDetalleOfertaApp({
                      idusuario: loginState.userToken.id,
                      idoferta: params.idpromocion,
                    }).then((resultado) => {
                      const resultadoImagen =
                        resultado.objOferta[0].imagenPromocionConvertida;

                      setImage({
                        uri: resultadoImagen,
                      });
                      setFinalData(resultado);

                      let toast = Toast.show("Gracias, acude al establecimiento para hacer válida tu promoción", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                      });
                    });
                  })
                }
                title="Guardar Promoción"
                color="#EC043C"
               
                accessibilityLabel="Learn more about this purple button"
              />
               <View
              style={{
                backgroundColor: "#ffbc00",
                position: "absolute",
                top: 70,
                left: 0,
                padding: 5,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                paddingHorizontal: 10,
                width: "50%",
                alignItems: "center",
              }}
            >
              <CountDownText
                style={{ fontWeight: "bold" }}
                countType="date"
                auto={true}
                afterEnd={() => {}}
                timeLeft={resultadoMinutosQuedan}
                step={-1}
                startText="Start"
                endText="End"
                intervalText={(date, hour, min, sec) =>
                  "Finaliza en: " + min + ":" + sec + ""
                }
              />
            </View>
           </> ) : (
              <Button
                onPress={() => {}}
                title="Ir a Ubicación"
                color="#FFBC00"
                accessibilityLabel="Learn more about this purple button"
              />
            )}
          </View>
        </SafeAreaView>
      ))}
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
    backgroundColor: "blue",
  },
  cuerpo: {
    flex: 7,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    marginTop: -10,
    flexDirection: "column",
    justifyContent: "space-between",
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
