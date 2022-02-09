import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NotificationsScreen from "../screens/NotificationsScreen";
import MyJollysScreen from "../screens/MyJollysScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PromocionesStack from "./PromocionesStack";
import { Icon } from "react-native-elements";
import { CounterContext } from "./../../App";
import LoginStack from "./LoginStack";
import { AuthContext } from "./../context/context";
import InterestScreen from "../screens/InterestScreen";
import LoadingComponent from "../components/LoadingComponent";

import { Socketio } from "../helpers/Socketio";
import { showMessage, hideMessage } from "react-native-flash-message";

import jwt_decode from "jwt-decode";
import { CarouselPrincipal } from "../screens/CarouselPrincipal";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const socket = Socketio();
export default function Navigation() {
  const { loginState } = React.useContext(AuthContext);

  var isLoading = loginState.isLoading;

  const [isLoadingJolly, setLoadingJolly] = React.useState(
    loginState.isLoading
  );

  const [tiempo, setTiempo] = React.useState(0);

  React.useEffect(() => {
    if (loginState.userToken != null) {
      var decodedToken = jwt_decode(loginState.userToken.accessToken);
      socket.on("connect", () => {
        socket.emit("join", { guid: decodedToken.guid });
      });

      socket.on("codigoCorrecto", () => {
        showMessage({
          message: "Gracias, disfruta tu promoción!",
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
          duration: 5000,
        });
      });
    }
  }, [isLoading]);

  const restarFechas = async () => {
    var resultadoGuardado = await AsyncStorage.getItem(
      "fechaCaducidadVentanaIntereses"
    );
    var currentDate = new Date();
    var actualDate = new Date(currentDate.getTime()).toString();

    var diff = new Date(resultadoGuardado) - new Date(currentDate.getTime());

    var minutes = Math.floor(diff / 1000 / 60);

    console.log("Diferencia: " + minutes);

    console.log("Valor Actual: " + actualDate);
    console.log("Valor Guardado: " + resultadoGuardado);

    setTiempo(minutes);
  };

  React.useEffect(() => {
    restarFechas();
    return () => {
      true;
    };
  }, []);

  return (
    <>
      {isLoading === true ? (
        <LoadingComponent />
      ) : (
        <>
          <NavigationContainer>
            {loginState.userToken == null ? (
              <LoginStack />
            ) : (
              <>
                <Tab.Navigator
                  initialRouteName={tiempo > 0 ? "intereses" : "home"}
                  screenOptions={{
                    tabBarInactiveTintColor: "#ffffff",
                    tabBarActiveTintColor: "#dc3864",
                    adaptive: true,
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarActiveBackgroundColor: "#000000",
                    tabBarInactiveBackgroundColor: "#000000",
                    tabBarLabelStyle: {
                      fontSize: 12.5,
                      fontWeight: "500",
                      paddingBottom: 3,
                    },
                    tabBarAllowFontScaling: true,
                    tabBarStyle: {},
                    tabBarIconStyle: {
                      marginTop: 4,
                    },
                  }}
                >
                  <Tab.Screen
                    name="home"
                    component={PromocionesStack}
                    options={{
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                          name="home"
                          color={color}
                          size={22}
                          style={{ height: 24, width: 24, fontSize: 24 }}
                        />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="intereses"
                    options={{
                      title: "Intereses",
                      headerShown: false,
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                          name="bell"
                          color={color}
                          size={24}
                          style={{ height: 24, width: 24, fontSize: 24 }}
                        />
                      ),
                    }}
                    component={InterestScreen}
                  />

                  <Tab.Screen
                    name="myjollys"
                    options={{
                      title: "Mis Jolly's",
                      headerShown: false,
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                          name="heart"
                          color={color}
                          size={24}
                          style={{ height: 24, width: 24, fontSize: 24 }}
                        />
                      ),
                    }}
                    component={MyJollysScreen}
                  />

                  <Tab.Screen
                    name="profile"
                    options={{
                      title: "Perfil",
                      headerShown: false,
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                          name="account"
                          color={color}
                          size={24}
                          style={{ height: 24, width: 24, fontSize: 24 }}
                        />
                      ),
                    }}
                    component={ProfileScreen}
                  />
                </Tab.Navigator>
              </>
            )}
          </NavigationContainer>
        </>
      )}
    </>
  );
}
