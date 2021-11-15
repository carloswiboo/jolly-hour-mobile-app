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

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const { loginState } = React.useContext(AuthContext);

  var isLoading = loginState.isLoading;

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
                  initialRouteName="home"
                  screenOptions={{
                    tabBarInactiveTintColor: "#ffffff",
                    tabBarActiveTintColor: "#dc3864",
                    adaptive: true,
                    tabBarShowLabel: true,
                    tabBarActiveBackgroundColor: "#000000",
                    tabBarInactiveBackgroundColor: "#000000",
                    tabBarLabelStyle: {
                      fontSize: 12.5,
                      fontWeight: "500",
                      paddingBottom: 3,
                    },
                    tabBarAllowFontScaling: true,
                    tabBarStyle: {
                      height: 55,
                    },
                    tabBarIconStyle: {
                      marginTop: 4,
                    },
                  }}
                >
                  <Tab.Screen
                    name="home"
                    options={{
                      title: "Inicio",
                      headerShown: false,
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                          name="home"
                          color={color}
                          size={22}
                        />
                      ),
                    }}
                    component={PromocionesStack}
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
                          size={22}
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
                          size={22}
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
                          size={22}
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
