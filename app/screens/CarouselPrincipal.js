import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../components/CarouselDataItemComponent";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";
import imagen from "../../assets/jollyHourIcon.png";
import imagenFondo from "../../assets/JHCarruselFondo.png";
import carousel1 from "../../assets/carousel1.png";
import carousel2 from "../../assets/carousel2.png";
import carousel3 from "../../assets/carousel3.png";
import carousel4 from "../../assets/carousel4.png";

const data = [
  {
    title: "Aenean leo",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: carousel1,
  },
  {
    title: "In turpis",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl:carousel2,
  },
  {
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: carousel3
  },
  {
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: carousel4,
  },
];

export default function CarouselPrincipal({ route, navigation }) {
  const carouselRef = React.useRef(null);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [index, setIndex] = React.useState(0);

  const isCarousel = React.useRef(null);

  React.useEffect(() => {
    carouselRef.current.snapToItem(index);
  }, [index]);

  return (
    <>
      <ImageBackground style={styles.loginBackground} source={imagenFondo}>
        <SafeAreaView style={styles.container}>
          {index != 0 ? (
            <>
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 30,
                  alignContent: "center",
                  alignItems: "center",
                  zIndex: 6000,
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    zIndex: 4000,
                    resizeMode: "contain",
                  }}
                  source={require("../../assets/jollyHourIcon.png")}
                />
              </View>
            </>
          ) : null}

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
            onSnapToItem={(index) => {
              setIndex(index);
            }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
              padding: 10,
            }}
          >
            <View style={{ width: "100%", alignContent: "center" }}>
              <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={carouselRef}
                dotStyle={{
                  width: 7,
                  height: 7,
                  borderRadius: 5,
                  marginHorizontal: 2,
                  backgroundColor: "#FFFFFF",
                }}
                tappableDots={true}
                inactiveDotStyle={{
                  backgroundColor: "black",
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>

            {index == 1 || index == 2 ? (
              <>
                <View
                  style={{
                    width: "50%",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.buttonAtras}
                    onPress={() => {
                      setIndex(index - 1);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Atras
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "50%",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.buttonSiguiente}
                    onPress={() => {
                      setIndex(index + 1);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Continuar
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}

            {index == 0 ? (
              <>
                <View
                  style={{
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.buttonSiguiente}
                    onPress={() => {
                      setIndex(1);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Continuar
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}

            {index == 3 ? (
              <>
                <View
                  style={{
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.buttonSiguiente}
                    onPress={() => {
                      navigation.navigate("welcomescreen");
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Listo para comenzar
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
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
    width: "90%",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonAtras : {
    width: "90%",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imageLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
