import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import PromotionDetailScreen from '../screens/PromotionDetailScreen';
import BusinessDetailScreen from '../screens/BusinessDetailScreen';

const Stack = createStackNavigator();

export default function PromocionesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="homepromotions"
        component={HomeScreen}
        options={{ title: "Promociones", headerShown: false }}
      />
      <Stack.Screen
        name="promotiondetail"
        component={PromotionDetailScreen}
        options={{ title: "Detalle de Promoción", headerShown: false  }}
      />
      <Stack.Screen
        name="businessdetail"
        component={BusinessDetailScreen}
        options={{ title: "Detalle de Empresa", headerShown: false  }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
