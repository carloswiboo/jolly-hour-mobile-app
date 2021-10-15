import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
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

export default function PromotionDetailScreen({ route, navigation }) {
  const { params } = route;
  const { loginState } = React.useContext(AuthContext);
  const [updateData, setUpdateData] = React.useState(0);
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
      setFinalData(resultado);
    });
    return () => { isMounted = false };
  }, []);

  React.useEffect(() => {   
    
  }, [updateData]);

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
            {finalData.objOferta[0].descripcionLarga == "" ? null : (
              <Text>{finalData.objOferta[0].descripcionLarga}</Text>
            )}
            <Text>
              Aqui pongo el Detalle de promoción que es ={" "}
              {JSON.stringify(params)}
            </Text>

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
                  
                        const resultadoImagen = resultado.objOferta[0].imagenPromocionConvertida;
                  
                        setImage({
                          uri: resultadoImagen,
                        });
                        setFinalData(resultado);
                      });

                })
              }
              title="Seleccionar Oferta"
              color="#EC043C"
              accessibilityLabel="Learn more about this purple button"
            />
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
