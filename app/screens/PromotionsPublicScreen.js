import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getNowAllPromotions } from "../API/APIPromociones";
import { Socketio } from "../helpers/Socketio";
import SkeletonContent from "react-native-skeleton-content";
import CardComponent from "../components/CardComponent";
import * as Linking from "expo-linking";

export default function PromotionsPublicScreen({ route, navigation }) {
  const [finalData, setFinalData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getNowAllPromotions(null).then((resultado) => {
      setFinalData(resultado);
      setLoading(false);
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNowAllPromotions(null).then((resultado) => {
      setFinalData(resultado);
      setLoading(false);
      setRefreshing(false);
    });
  }, []);

  return (
    <LinearGradient
      style={styles.loginBackground}
      colors={["#FC466B", "#3F5EFB"]}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.textoPrincipal}>
          <Text style={styles.textWelcome}>¡No las dejes ir!</Text>
          <Text style={styles.subtitleWelcome}>
            Estas son las promociones actuales
          </Text>
          <View style={{ marginTop: 7, marginBottom: 0 }}>
            <TouchableOpacity
              style={styles.buttonMenu}
              onPress={() => {
                Linking.openURL("https://help.jollyhour.com.mx/privacy.html");
              }}
            >
              <Text style={{fontWeight: 'bold', color: 'white'}}>Consulta el aviso de Privacidad</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.promotionsContainer}>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
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
          >
            {loading === true ? (
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
                  <CardComponent
                    key={index}
                    navigation={navigation}
                    params={promocion}
                    islogged={false}
                  />
                ))}
              </>
            )}
          </ScrollView>
        </View>
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
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  promotionsContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
    overflow: "scroll",
  },
  textoPrincipal: {
    marginHorizontal: 20,
    marginVertical: 40,
    alignItems: "flex-start",
  },
  textWelcome: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
  },
  subtitleWelcome: {
    color: "white",
    textAlign: "center",
    fontWeight: "200",
    fontSize: 20,
  },
});
