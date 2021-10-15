import React from "react";
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from "react-native";

export default function TitleScreenComponent(props) {
  return (
    <View style={styles.container}>
      {props.titlePage != undefined ? (
        <Text style={styles.titleScreen}>{props.titlePage}</Text>
      ) : null}
      {props.subTitle != undefined ? (
        <Text style={styles.subTitle}>{props.subTitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleScreen: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  subTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "100",
  },
});
