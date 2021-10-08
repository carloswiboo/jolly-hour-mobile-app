import React from "react";
import Navigation from "./app/navigations/Navigation";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CounterContext = React.createContext();

const useCounter = () => React.useContext(CounterContext);

const CounterContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({});

  const login = (values) => {
    debugger;
    setUser(values);
  };
  const logout = (values) => setUser({});

  React.useEffect(() => {
    AsyncStorage.getItem("JOLLYHOYR::USERJOLLYSs").then((resultado) => {
      var resultadoFinal = JSON.parse(resultado);

      var usuario = user;

      debugger;

      if(resultadoFinal.accessToken)
      {

      }
      else
      {
        AsyncStorage.setItem(
          "JOLLYHOYR::USERJOLLYSs",
          `${JSON.stringify(usuario)}`
        );
      }

     

    });
  }, [user]);

  React.useEffect(() => {
    AsyncStorage.getItem("JOLLYHOYR::USERJOLLYSs").then((resultado) => {

      debugger;
      setUser(JSON.parse(resultado));
    });
  }, []);

  return (
    <CounterContext.Provider value={{ user, login, logout }}>
      {children}
    </CounterContext.Provider>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={"black"} StatusBarStyle={"dark-content"} />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default () => (
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);
