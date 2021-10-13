import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { CountDownText } from "react-native-countdown-timer-text";
import BusinessCardDataComponent from "./BusinessCardDataComponent";

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

export default function CardComponent({ navigation, params }) {


   

  const image = { uri: params.imagenConvertida };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <span>
        {days} días, {hours}:{minutes}:{seconds}
      </span>
    );
  };

  return (
    <View>
      <BusinessCardDataComponent navigation={navigation} params={params} />
      <View style={styles.container}>
        <ImageBackground
          source={image}
          style={styles.image}
          imageStyle={{ borderRadius: 15 }}
        >
          <View style={styles.opacity}>
            <View style={styles.dueDate}>
              <Text>
                <CountDownText
                  style={styles.cd}
                  countType="seconds"
                  auto={true}
                  afterEnd={() => {}}
                  timeLeft={24353}
                  step={-1}
                  startText="Start"
                  endText="Promoción terminada"
                  intervalText={(min) => min + " Segundos"}
                />
              </Text>
            </View>
            <View style={{ marginTop: 14 }}>
              <Text style={[styles.whiteText, styles.titleOne]}>
                {params.titulo}
              </Text>
              <Text style={[styles.whiteText, styles.titleTwo]}>
                {params.descripcionCorta}
              </Text>
             
            </View>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("DetailPromotionScreenComponent", {
                    idBusiness: params.id,
                  })
                }
              >
                <Text style={{ fontWeight: "bold" }}>Obtener Promoción</Text>
              </TouchableOpacity>
            </View>
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    position: "absolute",
    top: 9,
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
  },
});