
import axios from 'axios';
import { API } from '../constants/ApiConnection';
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
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createAccountByMail = async (values) => {

  let url = API + "/services/usuario/createUsuario";

 
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
  let url = API + "services/usuario/setOferta/";
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

