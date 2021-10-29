import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";

import { AuthContext } from "./../context/context";
import { LinearGradient } from "expo-linear-gradient";
import MyJollysComponentHeader from "../components/MyJollysComponentHeader";
import HeaderInicioComponent from "../components/HeaderInicioComponent";
import { getDetalleUsuario } from "../API/APIUsuario";

export default function ProfileScreen({ navigation }) {
  const { authContext } = React.useContext(AuthContext);
  const { loginState } = React.useContext(AuthContext);

  const [finalData, setFinalData] = React.useState({});

  React.useEffect(() => {
    getDetalleUsuario(null, loginState.userToken.id).then((resultado) => {
        setFinalData(resultado);
    })
  }, []);

  return (
    <>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#3F5EFB", "#FC466B"]}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
      >
        <SafeAreaView
          style={{ width: "100%", flex: 1, justifyContent: "space-between" }}
        >
          <HeaderInicioComponent
            navigation={navigation}
            params={{ showBackButton: false }}
            showBackButton={true}
          />

          <Text>{JSON.stringify(loginState)}</Text>
          <Text>{JSON.stringify(finalData)}</Text>

          <Button
            title="Cerrar Sesión"
            onPress={() => authContext.signOut()}
          ></Button>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({});
