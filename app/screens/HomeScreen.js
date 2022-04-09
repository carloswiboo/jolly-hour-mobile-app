import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CardComponent from "../components/CardComponent";
import { LinearGradient } from "expo-linear-gradient";
import HeaderInicioComponent from "../components/HeaderInicioComponent";
import { getAllPromociones, getNowAllPromotions } from "../API/APIPromociones";
import { v4 as uuid } from "uuid";
import { Dimensions } from "react-native";
import CategoriesHomeDataComponent from "../components/CategoriesHomeDataComponent";
import SkeletonContent from "react-native-skeleton-content";
import { Socketio } from "../helpers/Socketio";
import Toast from "react-native-root-toast";
import { showMessage, hideMessage } from "react-native-flash-message";
import { AuthContext } from "../context/context";

export default function HomeScreen({ navigation, params }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [finalData, setFinalData] = React.useState([]);
  const [categorySelected, setCategorySelected] = React.useState(0);

  let ScreenHeight = Dimensions.get("window").height - 200;

  const { loginState } = React.useContext(AuthContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNowAllPromotions(null).then((resultado) => {
      setFinalData(resultado);
      setLoading(false);
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    const socket = Socketio();

    socket.on("connect", () => {
      //var saludos = user.id;
      socket.emit("join", { idusuario: loginState.id });
    });
    socket.on("refreshOferta", () => {
      setLoading(true);

      showMessage({
        message: "Se acabó el tiempo! obteniendo nuevas promociones",

        type: "info",
        style: {
          paddingVertical: 80,
          textAlign: "center",
          alignContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        titleStyle: { fontSize: 18, textAlign: "center" },
        backgroundColor: "#C70C5A",
        color: "white",
        duration: 3000,
      });

      getNowAllPromotions(null).then((resultado) => {
        setFinalData(resultado);
        setLoading(false);
      });
    });

    socket.on("connect_error", (error) => {
      console.log(error);
    });

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
    <LinearGradient
      style={styles.container}
      colors={["#3F5EFB", "#FC466B"]}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
    >
      <View style={{ paddingTop: 25 }}>
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
        {finalData.length === 0 ? (
          <>
            <ScrollView
              style={{ flex: 1, flexDirection: "row", width: "100%" }}
              contentContainerStyle={{ flex: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <Image
                style={{ width: "100%", flex: 1, resizeMode: "contain" }}
                source={require("../../assets/JollyStarLooking.png")}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                Seguiremos buscando promociones
              </Text>
            </ScrollView>
          </>
        ) : null}

        <ScrollView
          contentContainerStyle={styles.scrollViewCards}
          contentInset={{ top: 10 }}
          automaticallyAdjustContentInsets={true}
          maximumZoomScale={1}
          minimumZoomScale={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            justifyContent: "center",
          }}
        >
          {loading == true ? (
            <>
              <SkeletonContent
                containerStyle={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "column",
                }}
                animationDirection="horizontalLeft"
                boneColor="#EDEDED"
                highlightColor="#E0E0E0"
                layout={[
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                  {
                    width: "100%",
                    height: 170,
                    marginBottom: 6,
                    borderRadius: 15,
                  },
                ]}
                isLoading={true}
              />
            </>
          ) : (
            <>
              {finalData.map((promocion, index) => (
                <>
                  {categorySelected === 0 ? (
                    <CardComponent
                      key={index}
                      navigation={navigation}
                      params={promocion}
                    />
                  ) : categorySelected === promocion.idcategoria ? (
                    <CardComponent
                      key={index}
                      navigation={navigation}
                      params={promocion}
                    />
                  ) : null}
                </>
              ))}
              <Text></Text>
              <Text></Text>

            </>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  ScrollView: {
    flex: 1,
    position: "relative",
    bottom: 0,
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
    overflow: "scroll",
    bottom: 0,
  },
});
