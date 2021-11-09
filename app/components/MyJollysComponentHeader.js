import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";

export default function MyJollysComponentHeader(props) {
  var random_boolean = Math.random() < 0.5;


  return (
    <View style={styles.topHeaderBusinessInformation}>
      <View style={styles.shadowImage}>
        <Image
          style={styles.imgCompany}
          source={{
            uri: props.imagenEmpresa,
          }}
        />
      </View>
      <Text style={{ fontWeight: "bold", flexGrow: 1, marginLeft: 10 }}>
        {props.titulo.slice(0, 30) + "..."}
      </Text>
      <View>
        {/*random_boolean == true ? (
          <Text style={{ fontWeight: "700", fontSize: 12, color: "green" }}>
            <Entypo name="dot-single" size={14} color="green" />
            Activa
          </Text>
        ) : (
          <Text style={{ fontWeight: "700", fontSize: 12, color: "gray" }}>
            <Entypo name="dot-single" size={14} color="gray" />
            Vencida
          </Text>
        )*/}

        <Text style={{ fontWeight: "700", fontSize: 12, color: "gray" }}>
          <Entypo name="dot-single" size={14} color="gray" />
          {props.nombreCategoria}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeaderBusinessInformation: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
    shadowColor: "white",
  },
  imgCompany: {
    height: 20,
    width: 20,
    borderRadius: 50,
  },
});
