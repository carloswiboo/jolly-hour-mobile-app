import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CardComponent from "../components/CardComponent";
import { LinearGradient } from "expo-linear-gradient";
import HeaderInicioComponent from "../components/HeaderInicioComponent";
import { getAllPromociones, getNowAllPromotions } from "../API/APIPromociones";
import { v4 as uuid } from "uuid";
import { Dimensions } from "react-native";
import CategoriesHomeDataComponent from "../components/CategoriesHomeDataComponent";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [finalData, setFinalData] = React.useState([]);
  const [categorySelected, setCategorySelected] = React.useState(0);

  let ScreenHeight = Dimensions.get("window").height - 200;

  React.useEffect(() => {
    getNowAllPromotions(null).then((resultado) => {
      setFinalData(resultado);
      setLoading(false);
    });
    /* getAllPromociones(null).then((resultado) => {
      setFinalData(resultado);
      setLoading(false);
    }); */
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={["#3F5EFB", "#FC466B"]}
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
        <View style={{ width: "100%" }}>
          <CategoriesHomeDataComponent
            setCategorySelected={setCategorySelected}
          />
        </View>
        <View style={styles.ScrollView}>
          <Text
            onPress={() => {
              navigation.navigate("businessdetail", {
                idempresa: 36,
              });
            }}
          >
            Detalle
          </Text>
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
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    height: ScreenHeight,
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "800" }}>
                    Estamos cargando la información
                  </Text>
                  <Text style={{ fontWeight: "800" }}>Espera un poco</Text>
                </View>
              </>
            ) : (
              <>
                {finalData.map((promocion, index) => (
                  <>
                    {categorySelected === 0 ? (
                      <>
                        <CardComponent
                          key={uuid()}
                          navigation={navigation}
                          params={promocion}
                        />
                      </>
                    ) : categorySelected === promocion.idcategoria ? (
                      <CardComponent
                        key={uuid()}
                        navigation={navigation}
                        params={promocion}
                      />
                    ) : null}
                  </>
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
