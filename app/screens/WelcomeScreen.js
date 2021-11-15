import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SocialIcon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  createAccountByMail,
  LoginUsuario,
  LoginUsuarioFacebook,
} from "../API/APIUsuario";
import { AuthContext } from "../context/context";
import Toast from "react-native-root-toast";
import * as yup from "yup";
import * as Facebook from "expo-facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Restart } from "fiction-expo-restart";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim("Correo sin espacios")
    .email("Ingresa un correo válido")
    .required("Correo Necesario"),
  password: yup
    .string()
    .min(
      8,
      ({ min }) => `La Contraseña debe tener ${min} caracteres como mínimo`
    )
    .required("Contraseña requerida"),
});

const createAccountValidationSchema = yup.object().shape({
  nombre: yup.string().required("Nombre Requerido"),
  email: yup
    .string()
    .trim("Correo sin espacios")
    .email("Ingresa un correo válido")
    .required("Correo Necesario"),
  password: yup
    .string()
    .min(
      8,
      ({ min }) => `La Contraseña debe tener ${min} caracteres como mínimo`
    )
    .required("Contraseña requerida"),
});

export default function WelcomeScreen({ navigation }) {
  const { authContext } = React.useContext(AuthContext);
  const { loginState } = React.useContext(AuthContext);

  const [isWelcomeOpen, setIsWelcomeOpen] = React.useState(true);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);

  const [disabled, setDisabled] = React.useState(false);

  const [emailLogin, setEmailLogin] = React.useState("");
  const [emailPassword, setEmailPassword] = React.useState("");

  const [tokenNotificacionState, setTokenNotificacionState] =
    React.useState("");

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((resultado) => {
      setTokenNotificacionState(resultado);
    });
  }, []);
  React.useEffect(() => {
    registerForPushNotificationsAsync().then((resultado) => {
      setTokenNotificacionState(resultado);
    });
  }, [loginState]);

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

  const openLogin = () => {
    setIsWelcomeOpen(false);
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };
  const openSignUp = () => {
    setIsWelcomeOpen(false);
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
  };

  async function logInFacebook() {
    try {
      var userToken = await AsyncStorage.getItem("tokenNotificaciones");

      await Facebook.initializeAsync({
        appId: "787199475327558",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );

        const resultado = await response.json();

         

        LoginUsuarioFacebook({
          idFacebook: resultado.id,
          nombre: resultado.name,
          tokenNotificacion: tokenNotificacionState,
        }).then((resultado) => {
          authContext.signIn(resultado).then(() => {

             
            Restart();
          });
        });

        Alert.alert("Bienvenido", `Hola! ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch (error) {

      //Este error se detona si hay ya un loggeo anterior

    }
  }

  const signUpAction = async (values) => {
    //navigation.navigate("CompleteInformationScreenComponent");

    var userToken = await AsyncStorage.getItem("tokenNotificaciones");
    values.tokenNotificacion = tokenNotificacionState;

    LoginUsuario(values).then((resultadoLogin) => {
      if (resultadoLogin !== null) {
        authContext.signIn(resultadoLogin).then(() => {
          Restart();
        });
      } else {
        alert("Datos incorrectos, intenta de nuevo");
      }
    });
  };

  const createAccount = (values) => {
    //alert(JSON.stringify(values));
    //navigation.navigate("CompleteInformationScreenComponent");

    createAccountByMail(values).then((resultado) => {
      if (resultado.status == 200) {
        let toast = Toast.show("Gracias! Ahora inicia tu sesión!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
        });
        setEmailPassword(values.password);
        setEmailLogin(resultado.data.email);
        openLogin();
      }
    });
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={null}> Patrocinado por: </Text>

            <Image
              style={{ width: "90%", height: 300 }}
              source={{
                uri: "https://www.wiboo.com.mx/wp-content/uploads/2021/06/logo-gmcvb-corp.png",
              }}
              resizeMode="contain"
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cerrar Informativo</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <LinearGradient
        style={styles.loginBackground}
        colors={["#FC466B", "#3F5EFB"]}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
      >
        <Image
          style={styles.logoLogin}
          source={require("../../assets/jollylogoapp.png")}
        />
        {/* Div de comienzo */}
        {isWelcomeOpen ? (
          <View style={stylesWelcomeMessage.welcomeMessageContainer}>
            <Text style={stylesWelcomeMessage.textWelcome}>¡Bienvenido!</Text>
            <Text style={stylesWelcomeMessage.subtitleWelcome}>
              Nos da mucho gusto
            </Text>
            <Text style={stylesWelcomeMessage.subtitleWelcome}>
              que estés aquí! 
            </Text>
            <View style={{ paddingVertical: 20 }}>
              <TouchableOpacity
                style={stylesWelcomeMessage.buttonBegin}
                onPress={() => openLogin()}
              >
                <Text style={stylesWelcomeMessage.buttonBeginButton}>
                  Iniciar Sesión
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesWelcomeMessage.buttonBegin}
                onPress={() => openSignUp()}
              >
                <Text style={stylesWelcomeMessage.buttonBeginButton}>
                  Crear Cuenta
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {/* LogIn Content*/}
        {isLoginOpen ? (
          <Animated.View style={stylesContainer.containerLogSignUp}>
            <View style={{ paddingHorizontal: 8 }}>
              <Text style={loginStyles.titleLogin}>Empecemos</Text>
              <Text style={loginStyles.titleLogin}>aquí</Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Formik
                initialValues={{
                  email: emailLogin,
                  password: emailPassword,
                  tokenNotificacion: tokenNotificacionState,
                }}
                onSubmit={(values) => signUpAction(values)}
                validationSchema={loginValidationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <View>
                    <Input
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Correo Electrónico"
                    />
                    {errors.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                    <Input
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Contraseña"
                      secureTextEntry={true}
                    />
                    {errors.password && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          width: "100%",
                          textAlign: "center",
                          paddingBottom: 20,
                        }}
                      >
                        {errors.password}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={loginStyles.loginButton}
                    >
                      <Text style={loginStyles.loginButtonText}>
                        Iniciar Sesión
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>

            <View style={{ paddingBottom: 10 }}>
              <TouchableOpacity
                style={buttonStyles.facebookButton}
                onPress={() => {
                  logInFacebook();
                }}
              >
                <Text style={buttonStyles.facebookButtonText}>
                  <FontAwesome name="facebook-f" size={18} color="white" />
                  {"  "}Iniciar Sesión con Facebook
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingBottom: 10,
                paddingTop: 10,
                alignItems: "center",
              }}
            >
              <Text>¿No tienes cuenta?</Text>
              <TouchableOpacity onPress={() => openSignUp()}>
                <Text style={{ color: "#6e24a4" }}> Crear cuenta</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : null}
        {/* SignUp content */}
        {isSignUpOpen ? (
          <Animated.View style={stylesContainer.containerLogSignUp}>
            <View style={{ paddingHorizontal: 8 }}>
              <Text style={loginStyles.titleLogin}>Crea tu cuenta</Text>
              <Text style={loginStyles.titleLogin}>aquí</Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Formik
                initialValues={{
                  email: "",
                  nombre: "",
                  password: "",
                  tokenNotificacion: tokenNotificacionState,
                }}
                onSubmit={(values) => createAccount(values)}
                validationSchema={loginValidationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <View>
                    <Input
                      onChangeText={handleChange("nombre")}
                      onBlur={handleBlur("nombre")}
                      value={values.nombre}
                      placeholder="Nombre"
                      disabled={disabled}
                    />
                    {errors.nombre && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {errors.nombre}
                      </Text>
                    )}
                    <Input
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Correo Electrónico"
                      disabled={disabled}
                    />
                    {errors.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                    <Input
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Contraseña"
                      secureTextEntry={true}
                      disabled={disabled}
                    />
                    {errors.password && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          width: "100%",
                          textAlign: "center",
                          paddingBottom: 20,
                        }}
                      >
                        {errors.password}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={loginStyles.loginButton}
                      disabled={disabled}
                    >
                      <Text style={loginStyles.loginButtonText}>
                        Crear Cuenta
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>

            <View
              style={{
                paddingBottom: 10,
                paddingTop: 10,
                alignItems: "center",
              }}
            >
              <Text>¿Ya tienes cuenta?</Text>
              <TouchableOpacity onPress={() => openLogin()}>
                <Text style={{ color: "#6e24a4" }}> Iniciar Sesión cuenta</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : null}
      </LinearGradient>
    </>
  );
}

const buttonStyles = StyleSheet.create({
  facebookButton: {
    backgroundColor: "#3b5998",
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  facebookButtonText: {
    color: "white",
    fontSize: 18,
  },
});

const loginStyles = StyleSheet.create({
  titleLogin: {
    fontSize: 40,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#0043ff",
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
});

const styles = StyleSheet.create({
  loginBackground: {
    flex: 1,
    alignItems: "center",
  },
  logoLogin: {
    marginTop: 70,
    height: 150,
    resizeMode: "contain",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 30,
    marginRight: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 50,
  },
  textStyle: {
    padding: 9,
    elevation: 5,
    borderRadius: 30,
    color: "white",
  },
});

const stylesWelcomeMessage = StyleSheet.create({
  welcomeMessageContainer: {
    alignContent: "center",
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 30,
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
  buttonBegin: {
    marginHorizontal: 70,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  buttonBeginButton: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

const stylesContainer = StyleSheet.create({
  containerLogSignUp: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 45,
  },
});
