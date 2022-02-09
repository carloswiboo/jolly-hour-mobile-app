import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Divider } from "react-native-elements";

import { AuthContext } from "./../context/context";
import { LinearGradient } from "expo-linear-gradient";
import MyJollysComponentHeader from "../components/MyJollysComponentHeader";
import HeaderInicioComponent from "../components/HeaderInicioComponent";
import { getDetalleUsuario } from "../API/APIUsuario";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Badge, Icon, withBadge } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";

export default function ProfileScreen({ navigation }) {
  const { authContext } = React.useContext(AuthContext);
  const { loginState } = React.useContext(AuthContext);

  const [isEnabled, setIsEnabled] = React.useState(false);
  const [userImage, setUserImage] = React.useState(null);

  const [finalData, setFinalData] = React.useState({});

  const [selectedLanguage, setSelectedLanguage] = React.useState();

  const [tokenNotificacionState, setTokenNotificacionState] =
    React.useState("");

  React.useEffect(() => {
    let ready = false;
    getDetalleUsuario(null, loginState.userToken.id).then((resultado) => {
      console.log(resultado);
      setFinalData(resultado);
    });

    (async () => {
      try {
        const value = await AsyncStorage.getItem("@imageProfile");
        setUserImage(value);
        return value;
      } catch (e) {
        // error reading value
      }
    })();

    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          // alert("Necesitamos permiso para cambiar tu imagen de perfil!");
        } else {
          let toast = Toast.show("Acceso para cambiar imagen concedido", {
            duration: Toast.durations.SHORT,
            backgroundColor: "black",
            position: Toast.positions.CENTER,
          });
        }
      }
    })();

    return () => {
      ready = true;
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      storeDataImageProfile(result.uri).then((resultado) => {
        setUserImage(result.uri);
      });
    }
  };

  const storeDataImageProfile = async (value) => {
    try {
      await AsyncStorage.setItem("@imageProfile", value);
      return true;
    } catch (e) {
      // saving error
    }
  };

  const getDataImageProfile = async () => {
    try {
      const value = await AsyncStorage.getItem("@imageProfile");
      return value;
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((resultado) => {
      setTokenNotificacionState(resultado);
    });
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();

        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }


  };

  return (
    <>
      <LinearGradient
        style={styles.container}
        colors={["#3F5EFB", "#FC466B"]}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
      >
        <SafeAreaView style={styles.container}>
          <HeaderInicioComponent
            navigation={navigation}
            params={{ showBackButton: false }}
            showBackButton={true}
          />

          <View style={styles.profilePrincipalData}>
            <Avatar
              rounded
              size="xlarge"
              overlayContainerStyle={{ backgroundColor: "black" }}
              containerStyle={{ backgroundColor: "black", marginBottom: 10 }}
              source={{
                uri: userImage,
              }}
              onPress={() => pickImage()}
              activeOpacity={0.7}
            >
              <Avatar.Accessory containerStyle={{ backgroundColor: "green" }} />
            </Avatar>

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center",
              }}
            >
              {finalData.nombre}
            </Text>
            <Text style={{ color: "white", fontWeight: "400", fontSize: 15 }}>
              <Badge status="success" style={{ paddingTop: 40 }} /> Cliente VIP
            </Text>
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
              <View style={styles.listaDatosPicker}>
                <Text
                  style={{ marginLeft: 6, color: "#2837DE", marginBottom: 2 }}
                >
                  Elige ciudad:
                </Text>
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }
                  itemStyle={styles.fontSizeQuince}
                  numberOfLines={1}
                >
                  <Picker.Item
                    label="León"
                    style={styles.fontSizeQuince}
                    value="León"
                  />
                </Picker>
              </View>
              <Divider orientation="horizontal" />
              <View style={styles.listaDatos}>
                <Text style={styles.tinyText}>Correo electrónico</Text>
                <Text style={styles.resultText}>
                  {finalData.email === null
                    ? "Inicio con red social"
                    : finalData.email}
                </Text>
              </View>
              <Divider orientation="horizontal" />

              <View style={styles.listaDatos}>
                <TouchableOpacity
                  style={styles.buttonMenu}
                  onPress={() => {
                    Linking.openURL("https://partners.jollyhour.com.mx/terms/");
                  }}
                >
                  <Text style={styles.resultText}>Términos y Condiciones</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.listaDatos}>
                <TouchableOpacity
                  style={styles.buttonMenu}
                  onPress={() => {
                    Linking.openURL("https://help.jollyhour.com.mx/ayuda/");
                  }}
                >
                  <Text style={styles.resultText}>Ayuda</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.listaDatos}>
                <TouchableOpacity
                  style={styles.buttonMenu}
                  onPress={() => {
                    Linking.openURL(
                      "https://help.jollyhour.com.mx/privacy.html"
                    );
                  }}
                >
                  <Text style={styles.resultText}>Aviso de Privacidad</Text>
                </TouchableOpacity>
              </View>
              {/*
              <View style={styles.listaDatos}>
                <TouchableOpacity
                  style={styles.buttonMenu}
                  onPress={() => {
                    openShareDialogAsync();
                  }}
                >
                 
                  <Text style={styles.resultText}>
                    {tokenNotificacionState}
                  </Text>
                </TouchableOpacity>
                
              </View>
              */}
              <View style={styles.listaDatos}>
                <TouchableOpacity
                  style={styles.buttonMenu}
                  onPress={() => authContext.signOut()}
                >
                  <Text style={styles.resultText}>Cerrar Sesión</Text>
                </TouchableOpacity>
              </View>

              {/*
                <Text>{JSON.stringify(loginState)}</Text>
              <Text>{JSON.stringify(finalData)}</Text> */}
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
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
  profilePrincipalData: {
    margin: 15,
    alignItems: "center",
  },
  listaDatos: {
    paddingVertical: 10,
  },
  tinyText: {
    fontSize: 15,
    opacity: 0.5,
    fontWeight: "100",
  },
  resultText: {
    fontSize: 20,
    opacity: 1,
    fontWeight: "100",
  },
  listaDatosPicker: {
    borderRadius: 20,
    backgroundColor: "#EAEAEA",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  fontSizeQuince: {
    fontSize: 20,
    textAlign: "center",
  },
});
