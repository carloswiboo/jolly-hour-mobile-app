import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function MyJollysComponentHeader(props) {
  console.log(props);

  var random_boolean = Math.random() < 0.5;

  console.log(random_boolean);

  return (
    <View style={styles.topHeaderBusinessInformation}>
      <View style={styles.shadowImage}>
        <Image
          style={styles.imgCompany}
          source={{
            uri: "https://scontent.fcyw1-1.fna.fbcdn.net/v/t1.6435-9/134811562_100204992037017_7132832552319398947_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeE3q5ZgPZEopk8j9T4rGJ7WJGgJokbWfTAkaAmiRtZ9MHEHxAP7t2GL6PSoVIpVLAA&_nc_ohc=cTIWJEMo4cIAX-wD96W&_nc_ht=scontent.fcyw1-1.fna&oh=62ef1ef07661422dd70c22539476107b&oe=61A0DB77",
          }}
        />
      </View>
      <Text style={{ fontWeight: "bold", flexGrow: 1, marginLeft: 10 }}> 70% en Hamburguesa BBQ </Text>
      <View>
        {random_boolean == true ? (
          <Text style={{ fontWeight: "700", fontSize: 12, color: "green" }}>
            <Entypo name="dot-single" size={14} color="green" />
            Activa
          </Text>
        ) : (
          <Text style={{ fontWeight: "700", fontSize: 12, color:'gray' }}>
            <Entypo name="dot-single" size={14} color="gray" />
            Vencida
          </Text>
        )}
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

