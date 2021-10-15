import { API } from "../constants/ApiConnection";
import axios from "axios";
import { encode } from "base64-arraybuffer";

export const getAllCategorias = async (values) => {
  let url = API + "/services/categoria/getCategorias";

  try {
    const response = await axios.get(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });
    if (response.status === 200) {
      for (const categoria of response.data) {
        categoria.imagenConvertida =
          "data:image/png;base64," + encode(categoria.imagen.data);
      }
      return response.data;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getCategorieById = async (idcategoria) => {
  let url = API + "/services/categoria/getCategoria/" + idcategoria;
  try {
    const response = await axios.get(url, null, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });
    if (response.status === 200) {
      response.data.imagenConvertida =
        "data:image/png;base64," + encode(response.data.imagen.data);
      return response.data;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
export const anadirEliminarCategorie = async (idcategoria, idusuario) => {
  let url = API + "/services/usuario/addCategoria/";

  debugger;
  try {
    const response = await axios.post(url, {idcategoria: idcategoria, idusuario: idusuario.userToken.id}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });


    debugger;

    if (response.status === 200) {


      debugger;
      
      return response.data;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {

    debugger;
    console.error(error);
    return {};
  }
};

export const getCategoriesByUser = async (token) => {


  debugger;
  let url = API + "/services/usuario/getCategoriasByUser/" + token.userToken.id;

  try {
    const response = await axios.get(url, null, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });
    if (response.status === 200) {
      const finalData = [];
      for (const categoriaSeleccionada of response.data.seleccionadas) {
        categoriaSeleccionada.isActive = true;
        categoriaSeleccionada.imagenConvertida =
          "data:image/png;base64," + encode(categoriaSeleccionada.imagen.data);
        finalData.push(categoriaSeleccionada);
      }

      for (const categoriaNoSeleccionada of response.data.noSeleccionadas) {
        categoriaNoSeleccionada.isActive = false;
        categoriaNoSeleccionada.imagenConvertida =
          "data:image/png;base64," +
          encode(categoriaNoSeleccionada.imagen.data);
        finalData.push(categoriaNoSeleccionada);
      }

      return finalData;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    debugger;
    console.error(error);
    return {};
  }
};
