import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { getAllCategorias } from "../API/APICategorias";
import { v4 as uuid } from "uuid";

export default function CategoriesHomeDataComponent(props) {
  const [finalData, setFinalData] = React.useState([]);
  React.useEffect(() => {
    getAllCategorias(null).then((resultadoCategorias) => {
      for (const categoria of resultadoCategorias) {
        categoria.isActive = false;
      }

      resultadoCategorias.unshift({
        id: 0,
        nombre: "Mostrar Todas",
        isActive: true,
      });
      setFinalData(resultadoCategorias);
    });
    return () => {};
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: "",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        width: "100%",
      }}
      horizontal={true}
    >
      {finalData.length === 0 ? (
        <>
          <Text>Cargando Información</Text>
        </>
      ) : (
        <>
          {finalData.map((categoria) => (
            <TouchableOpacity
              onPress={() => {
                const categoriaIdBuscar = categoria.id;
                const finalModifyData = finalData;

                debugger;

                for (const categoria of finalModifyData) {
                  if (categoria.id === categoriaIdBuscar) {
                    categoria.isActive = true;
                  } else {
                    categoria.isActive = false;
                  }
                }

                setFinalData(finalModifyData);
                props.setCategorySelected(categoria.id);
              }}
              key={uuid()}
              style={[
                {
                  borderRadius: 50,
                  padding: 8,
                  marginHorizontal: 2,
                },
                {
                  backgroundColor:
                    categoria.isActive === true ? "rgba(0,0,0,0.5)" : "white",
                },
              ]}
            >
              <Text
                style={[
                  {
                    color: categoria.isActive === true ? "white" : "black",
                  },
                ]}
              >
                {categoria.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}
