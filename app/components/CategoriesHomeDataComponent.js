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
import SkeletonContent from "react-native-skeleton-content";

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
    <>
      <View
        style={{
          backgroundColor: "",
          paddingLeft: 15,
          paddingRight: 15,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 26, color: "white", fontWeight: "bold" }}>
          Categorías
        </Text>
      </View>

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
            <SkeletonContent
              containerStyle={{ flex: 1, width: '100%', flexDirection: "row" }}
              animationDirection="horizontalLeft"
              boneColor="#991980"
              highlightColor="black"
              layout={[
                { width: 120, height: 20, marginBottom: 6, borderRadius: 50 },
                { width: 120, height: 20, marginBottom: 6, marginHorizontal: 10, borderRadius: 50 },
                { width: 120, height: 20, marginBottom: 6, marginHorizontal: 10, borderRadius: 50 },
                { width: 120, height: 20, marginBottom: 6, marginHorizontal: 10, borderRadius: 50 },
                { width: 120, height: 20, marginBottom: 6, marginHorizontal: 10, borderRadius: 50 },
              ]}
              isLoading={true}
            />
          </>
        ) : (
          <>
            {finalData.map((categoria) => (
              <TouchableOpacity
                onPress={() => {
                  const categoriaIdBuscar = categoria.id;
                  const finalModifyData = finalData;

                   

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
                      categoria.isActive === true ? "#7089E5" : "#9C187E",
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      color: categoria.isActive === true ? "white" : "white",
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
    </>
  );
}
