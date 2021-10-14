import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CardComponent from "../components/CardComponent";
import { LinearGradient } from "expo-linear-gradient";
import HeaderInicioComponent from "../components/HeaderInicioComponent";
import { getAllPromociones } from "../API/APIPromociones";
import { v4 as uuid } from "uuid";

const exampleData = [
  {
    businessInformation: {
      name: "Chicho's Burguers",
      id: 1,
      image: "https://www.wiboo.com.mx/wp-content/uploads/2021/05/chichos.jpg",
      stars: 3,
    },
    promotionInformation: {
      id: 1,
      dueDate: "01-06-2021 00:00:00",
      imageUrl:
        "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/08/hamburguesa-2028707.jpg?itok=ujl3qgM9",
      titleOne: "50% Descuento",
      titleTwo: "Hamburguesa Hawaiana",
      titielThree: "Incluye Papas y Refresco",
    },
  },
  {
    businessInformation: {
      name: "Ma Come No",
      id: 2,
      image:
        "https://yosoyvendedor.com/source/0ab1052204dc0dc1396440804d5e1634/logo-macomeno-nuevo.png",
      stars: 5,
    },
    promotionInformation: {
      id: 2,
      dueDate: "01-06-2021 00:00:00",
      imageUrl:
        "https://media-cdn.tripadvisor.com/media/photo-s/0f/6c/02/95/ven-y-descubre-lo-que.jpg",
      titleOne: "60% Descuento",
      titleTwo: "En la pasta que prefieras",
      titielThree: "Aplica para todos los platillos de tu mesa",
    },
  },
  {
    businessInformation: {
      name: "Cheve Wings",
      id: 3,
      image:
        "https://viaaltaleon.com.mx/wp-content/uploads/2021/04/chevewings.jpg",
      stars: 5,
    },
    promotionInformation: {
      id: 3,
      dueDate: "January 01, 2023 00:00:00 ",
      imageUrl:
        "https://fastly.4sqi.net/img/general/600x600/26742501_qJZ8UKR2at4J726YlAz8gW33TevskQJQlZ6kB6sznOE.jpg",
      titleOne: "60% Descuento",
      titleTwo: "En boneless",
      titielThree: "Aplica solo una persona por código",
    },
  },
  {
    businessInformation: {
      name: "Dóminos Pizza",
      id: 3,
      image: "https://realcenter.com.mx/wp-content/uploads/2019/08/dominos.jpg",
      stars: 5,
    },
    promotionInformation: {
      id: 4,
      dueDate: "January 01, 2023 00:00:00 ",
      imageUrl:
        "https://www.semana.com/resizer/GnkQW_RxabTCAeg73bNyySMQN_A=/1200x675/filters:format(jpg):quality(70)//cloudfront-us-east-1.images.arcpublishing.com/semana/7RK7CWNTV5H5TBD45ACCJ7IUGQ.jpg",
      titleOne: "70% Descuento",
      titleTwo: "En las papas",
      titielThree: "En la compra de una pizza familiar",
    },
  },
];

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [finalData, setFinalData] = React.useState([]);

  React.useEffect(() => {
    getAllPromociones(null).then((resultado) => {


      debugger;

      setFinalData(resultado);
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={["#FC466B", "#3F5EFB"]}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
      >
        <View>
          <HeaderInicioComponent
            navigation={navigation}
            params={{ showBackButton: false }}
            showBackButton={true}
          />
        </View>
        <View style={styles.ScrollView}>
          <ScrollView
            contentContainerStyle={styles.scrollViewCards}
            contentInset={{ top: 10 }}
            automaticallyAdjustContentInsets={true}
            maximumZoomScale={1}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "center",
            }}
          >
            {loading == true ? (
              <>
                <Text>Estamos Cargando tu información</Text>
              </>
            ) : (
              <>
                {finalData.map((promocion, index) => (
                  <CardComponent
                    key={uuid()}
                    navigation={navigation}
                    params={promocion}
                  />
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    alignItems: "center",
  },
  ScrollView: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
    overflow: "scroll",
  },
});
