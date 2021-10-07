import { API } from "../Constants/ApiConnection";
import axios from "axios";
import { encode } from "base64-arraybuffer";

export const getAllCategorias = async (values) => {
  let url = API + "services/categoria/getCategorias";
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
  let url = API + "services/categoria/getCategoria/" + idcategoria;
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
