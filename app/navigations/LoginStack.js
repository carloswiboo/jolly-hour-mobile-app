import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./../screens/WelcomeScreen";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import CarouselPrincipal from "../screens/CarouselPrincipal";
import PromotionsPublicScreen from "../screens/PromotionsPublicScreen";
import {
  getNowAllPromotions,
  getOfertaValidation,
} from "../API/APIPromociones";
import LoadingComponent from "../components/LoadingComponent";
const Stack = createStackNavigator();

export default function LoginStack() {
  const [finalData, setFinalData] = React.useState({ status: 3 });

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getOfertaValidation(null).then((resultado) => {
      setFinalData(resultado);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {finalData.status == 3 ? (
        <>
          <LoadingComponent />
        </>
      ) : (
        <>
          {finalData.status == 0 ? (
            <>
              <Stack.Navigator>
                <Stack.Screen
                  name="gallery"
                  component={CarouselPrincipal}
                  options={{ title: "Bienvenido", headerShown: false }}
                />
                <Stack.Screen
                  name="welcomescreen"
                  component={WelcomeScreen}
                  options={{ title: "Bienvenido", headerShown: false }}
                />
              </Stack.Navigator>
            </>
          ) : (
            <>
              <Stack.Navigator>
                <Stack.Screen
                  name="lastPromotions"
                  component={PromotionsPublicScreen}
                  options={{ title: "Bienvenido", headerShown: false }}
                />
                <Stack.Screen
                  name="welcomescreen"
                  component={WelcomeScreen}
                  options={{ title: "Bienvenido", headerShown: false }}
                />
              </Stack.Navigator>
            </>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
