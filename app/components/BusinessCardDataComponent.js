import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";

export default function BusinessCardDataComponent({ navigation, params }) {


  debugger;

  return (
    <TouchableOpacity
      style={styles.companyData}
      onPress={() =>
        navigation.navigate("businessdetail", {
          idempresa: params.id,
        })
      }
    >
      <View style={styles.shadowImage}>
        <Image
          style={styles.imgCompany}
          source={{
            uri: params.imagenLogoEmpresaConvertida,
          }}
        />
      </View>
      <Text style={styles.companyName}>{params.nombreEmpresa}</Text>
      <Text style={styles.ratingCompany}>
        <Icon iconStyle={{ color: "#FFC700", fontSize: 10 }} name="star" /> 5
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  companyData: {
    width: "100%",
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgCompany: {
    height: 30,
    width: 30,
    resizeMode: "cover",
    borderRadius: 500,
    marginRight: 10,
  },
  shadowImage: {
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
  },
  companyName: {
    fontWeight: "bold",
    color: "#1E1E1E",
    textAlign: "left",
  },
  ratingCompany: {
    fontWeight: "bold",
    color: "#FFC700",
  },
  timeMessage: {
    backgroundColor: "#FFBC00",
    position: "absolute",
    paddingHorizontal: 15,
    marginTop: 17,
    width: "auto",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    left: 0,
    top: 5,
    alignSelf: "center",
  },
  promotionDescription: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  buttonDetail: {
    backgroundColor: "#ffBC00",
    padding: 10,
    marginTop: 15,
    borderRadius: 50,
    textAlign: "center",
  },
});
