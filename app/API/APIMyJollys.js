import axios from "axios";
import { encode } from "base64-arraybuffer";
import { API } from "./../constants/ApiConnection";

export const getDetailJollys = async (idusuario, values) => {
  let url = API + "/services/usuario/misJollys/" + idusuario;
  var armandoFinal= [];
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

        promocion.imagenLogoConvertida =
          "data:image/png;base64," + encode(promocion.logoEmpresa.data);
        promocion.imagenLogoEmpresaConvertida =
          "data:image/png;base64," + encode(promocion.logoEmpresa.data);
      }

      for (const promocionIteracion of response.data) {
        if(promocionIteracion.finalizado == 1)
        {

        }
        else
        {
          armandoFinal.push(promocionIteracion)
        }
      }

      return armandoFinal;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
