import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { v4 as uuid } from "uuid";
import QRCode from "react-native-qrcode-svg";
import CardComponent from "./CardComponent";
import CardComponentMyJollys from "./CardComponentMyJollys";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function AccordionDataComponent(props) {
  const onRefresh = React.useCallback(() => {
    props.setRefreshing(true);
    wait(2000).then(() => props.setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.principalContainer}
      refreshControl={
        <RefreshControl refreshing={props.refreshing} onRefresh={onRefresh} />
      }
    >
      {props.data.map((promocion) => (
        <Collapse key={uuid()}>
          <CollapseHeader style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 100,
                  marginEnd: 5,
                }}
                source={{
                  uri: promocion.imagenLogoConvertida,
                }}
              />
              <Text style={{ fontWeight: "bold" }}>
                {" "}
                {promocion.titulo.slice(0, 30) + "..."}
              </Text>
            </View>
            <Text style={{ fontSize: 10 }}>{promocion.nombreCategoria}</Text>
          </CollapseHeader>
          <CollapseBody style={styles.body}>
            <CardComponentMyJollys data={promocion} />
            <View style={{ alignItems: "center" }}>
              <QRCode value={promocion.cadena} />
              <Text style={{ marginTop: 5 }}>{promocion.cadena}</Text>
            </View>
          </CollapseBody>
        </Collapse>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    paddingTop: 25,
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
    alignContent: "center",
    alignItems: "center",
    borderBottomColor: "transparent",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  body: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 2,
  },
});
