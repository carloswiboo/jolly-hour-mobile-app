import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={item.imgUrl} style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    flex: 1,
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 20
  },
  image: {
    width: ITEM_WIDTH,
    flex: 1,
    resizeMode: 'contain'
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
