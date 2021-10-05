import { API } from "../Constants/ApiConnection";
import axios from "axios";
import { encode } from "base64-arraybuffer";

export const getAllEmpresas = async (values) => {
  let url = API + "services/empresa/getEmpresas/";
  try {
    const response = await axios.get(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });
    if (response.status === 200) {
      for (const empresa of response.data) {
        empresa.imagenConvertida =
          "data:image/png;base64," + encode(empresa.logo.data);
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

export const getDetailEmpresa = async (idempresa, values) => {
  let url = API + "services/empresa/getEmpresa/" + idempresa;
  try {
    const response = await axios.get(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });
    if (response.status === 200) {
      response.data.imagenConvertida =
        "data:image/png;base64," + encode(response.data.logo.data);
      return response.data;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
