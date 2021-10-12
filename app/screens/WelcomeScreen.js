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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SocialIcon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import { createAccountByMail, LoginUsuario } from "../API/APIUsuario";
import { AuthContext } from "../context/context";
import Toast from "react-native-root-toast";

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

  const signUpAction = (values) => {
    //navigation.navigate("CompleteInformationScreenComponent");

    LoginUsuario(values).then((resultadoLogin) => {
      authContext.signIn(resultadoLogin);
      dispatch();
    });
  };

  const createAccount = (values) => {
    //alert(JSON.stringify(values));
    //navigation.navigate("CompleteInformationScreenComponent");

    createAccountByMail(values).then((resultado) => {
      debugger;

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
                }}
                onSubmit={(values) => signUpAction(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <Input
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Correo Electrónico"
                    />
                    <Input
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Contraseña"
                      secureTextEntry={true}
                    />

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
              <TouchableOpacity style={buttonStyles.facebookButton}>
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
                }}
                onSubmit={(values) => createAccount(values)}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <Input
                      onChangeText={handleChange("nombre")}
                      onBlur={handleBlur("nombre")}
                      value={values.nombre}
                      placeholder="Nombre"
                      disabled={disabled}
                    />
                    <Input
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Correo Electrónico"
                      disabled={disabled}
                    />
                    <Input
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Contraseña"
                      secureTextEntry={true}
                      disabled={disabled}
                    />

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
