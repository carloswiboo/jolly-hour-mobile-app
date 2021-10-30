import axios from "axios";
import { API } from "../constants/ApiConnection";
export const LoginUsuario = async (values) => {
  let url = API + "/auth/usuario/signin";
  try {
    const response = await axios.post(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      alert("Contraseña Incorrecta");
      return null;
    } else if (response.status === 404) {
      alert("El usuario no existe");
      return null;
    }
  } catch (error) {

    debugger;

    console.error(error);
    return null;
  }
};

export const LoginUsuarioFacebook = async (values) => {
  let url = API + "/auth/usuario/loginFacebook";
  try {
    const response = await axios.post(url, values, {
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

export const createAccountByMail = async (values) => {
  let url = API + "/services/usuario/createUsuario";

  debugger;

  try {
    const response = await axios.post(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
    });

    debugger;

    if (response.status === 200) {
      return response;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const setOfertasByUser = async (values) => {
  let url = API + "/services/usuario/setOferta/";
  try {
    const response = await axios.post(url, values, {
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

export const getDetalleUsuario = async (values, idusuario) => {
  let url = API + "/services/usuario/getUsuario/" + idusuario;

  
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
