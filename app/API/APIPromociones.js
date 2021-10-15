import { API } from "../constants/ApiConnection";
import axios from "axios";
import { encode } from "base64-arraybuffer";

export const getNowAllPromotions = async (values) => {

 
  let url = API + "/services/oferta/filterOfertaNow/";
  try {
    const response = await axios.get(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });


    if (response.status === 200) {
      for (const promocion of response.data) {
        promocion.imagenConvertida =
          "data:image/png;base64," + encode(promocion.imagen.data);
        promocion.imagenLogoEmpresaConvertida =
          "data:image/png;base64," + encode(promocion.logoEmpresa.data);
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
export const getAllPromociones = async (values) => {
  let url = API + "/services/oferta/getOfertas";
  try {
    const response = await axios.get(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });

    if (response.status === 200) {
      for (const promocion of response.data) {
        promocion.imagenConvertida =
          "data:image/png;base64," + encode(promocion.imagen.data);
        promocion.imagenLogoEmpresaConvertida =
          "data:image/png;base64," + encode(promocion.logoEmpresa.data);
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

export const getDetallePromocion = async (idpromocion, values) => {
  let url = API + "services/oferta/getOferta/" + idpromocion;
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

export const getDetallePromocionPorEmpresa = async (idempresa, values) => {
  let url = API + "services/oferta/getOfertaByEmpresa/" + idempresa;
  try {
    const response = await axios.get(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });
    if (response.status === 200) {
      for (const promocion of response.data.oferta) {
        promocion.imagenConvertida =
          "data:image/png;base64," + encode(promocion.imagen.data);
      }
      return response.data.oferta;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getDetallePromocionPorCodigo = async (idempresa, values) => {
  let url = API + "services/usuario/getOferta/" + idempresa;
  try {
    const response = await axios.get(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
