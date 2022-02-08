import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../components/CarouselDataItemComponent";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    title: "Aenean leo",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: "https://wiboo.com.mx/wp-content/uploads/2022/02/Prueba.png",
  },
  {
    title: "In turpis",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: "https://wiboo.com.mx/wp-content/uploads/2022/02/Prueba.png",
  },
  {
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: "https://wiboo.com.mx/wp-content/uploads/2022/02/Prueba.png",
  },
  {
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: "https://wiboo.com.mx/wp-content/uploads/2022/02/Prueba.png",
  },
];

export default function CarouselPrincipal({ route, navigation }) {
  const carouselRef = React.useRef(null);
  const [slideIndex, setSlideIndex] = React.useState(0);

  return (
    <LinearGradient
      style={styles.loginBackground}
      colors={["#FC466B", "#3F5EFB"]}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
    >
      <SafeAreaView style={styles.container}>
        <Carousel
          layout="default"
          layoutCardOffset={5}
          ref={carouselRef}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={styles.buttonSiguiente}
            onPress={() => {
              setSlideIndex(slideIndex + 1);
              carouselRef.current.snapToItem(slideIndex);
            }}
          >
            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>
              Continuar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSiguiente}
            onPress={() => {
              setSlideIndex(slideIndex + 1);
              carouselRef.current.snapToItem(slideIndex);
            }}
          >
            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>
              Siguiente
            </Text>
          </TouchableOpacity>
        </View>

        {/*
  <TouchableOpacity
          style={styles.buttonSiguiente}
          onPress={() => {
            setSlideIndex(slideIndex + 1);
            carouselRef.current.snapToItem(slideIndex);
          }}
        >
          <Text style={{ fontSize: 22, color: "white" }}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSiguiente}
          onPress={() => {
            navigation.navigate("lastPromotions");
          }}
        >
          <Text style={{ fontSize: 22, color: "white" }}>
            {" "}
            Abrir Nueva Pantalla{" "}
          </Text>
        </TouchableOpacity>
  */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loginBackground: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  buttonSiguiente: {
    width: "50%",
    alignContent: "center",
    alignItems: "center",

    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
