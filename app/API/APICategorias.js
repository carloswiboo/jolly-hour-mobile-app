import { API } from "../constants/ApiConnection";
import axios from "axios";
import { encode } from "base64-arraybuffer";
import ImgToBase64 from "react-native-image-base64";

let imagePath = require("../../assets/categoriasServicios/activo/comidaRestaurantesActivo.png");

//Imagenes Comida Restaurantes
let imageComidaRestauranteActivo = require("../../assets/categoriasServicios/activo/comidaRestaurantesActivo.png");
let imageComidaRestauranteInactivo = require("../../assets/categoriasServicios/inactivo/comidaRestaurantesInactivo.png");

//Imágenes comida Entretenimiento
let imageEntretenimientoActivo = require("../../assets/categoriasServicios/activo/entretenimientoActivo.png");
let imageEntretenimientoInactivo = require("../../assets/categoriasServicios/inactivo/entretenimientoInactivo.png");

//Imágenes Hoteles y Viajes
let imagenHotelesYViajesActivo = require("../../assets/categoriasServicios/activo/hotelesViajesActivo.png");
let imagenHotelesYViajesInactivo = require("../../assets/categoriasServicios/inactivo/hotelesViajesInactivo.png");

//Imagenes Salud y Belleza
let imagenSaludYBellezaActivo = require("../../assets/categoriasServicios/activo/saludBellezaActivo.png");
let imagenSaludYBellezaInactivo = require("../../assets/categoriasServicios/inactivo/saludBellezaInactivo.png");

//Imagenes Servicios
let imagenServicioActivo = require("../../assets/categoriasServicios/activo/serviciosActivo.png");
let imagenServicioInactivo = require("../../assets/categoriasServicios/inactivo/serviciosInactivo.png");

//Imagenes Moda y Accesorios
let imagenModaAccesoriosActivo = require("../../assets/categoriasServicios/activo/modaAccesoriosActivo.png");
let imagenModaAccesoriosInactivo = require("../../assets/categoriasServicios/inactivo/modaAccesoriosInactivo.png");

export const getAllCategorias = async (values) => {
  let url = API + "/services/categoria/getCategorias/";


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
        if (categoria.nombre === "Comida y Restaurantes") {
          categoria.imagenActiva = imageComidaRestauranteActivo;
          categoria.imagenInactiva = imageComidaRestauranteInactivo;
        }
        if (categoria.nombre === "Entretenimiento") {
          categoria.imagenActiva = imageEntretenimientoActivo;
          categoria.imagenInactiva = imageEntretenimientoInactivo;
        }
        if (categoria.nombre === "Hoteles y Viajes") {
          categoria.imagenActiva = imagenHotelesYViajesActivo;
          categoria.imagenInactiva = imagenHotelesYViajesInactivo;
        }
        if (categoria.nombre === "Salud y Belleza") {
          categoria.imagenActiva = imagenSaludYBellezaActivo;
          categoria.imagenInactiva = imagenSaludYBellezaInactivo;
        }
        if (categoria.nombre === "Servicios") {
          categoria.imagenActiva = imagenServicioActivo;
          categoria.imagenInactiva = imagenServicioInactivo;
        }
        if (categoria.nombre === "Moda y Accesorios") {
          categoria.imagenActiva = imagenModaAccesoriosActivo;
          categoria.imagenInactiva = imagenModaAccesoriosInactivo;
        }
      }

      return response.data;
    } else if (response.status === 401) {
      return [];
    }
  } catch (error) {

    let errorMessage = error.toJSON();

    console.log(errorMessage);

    console.error(error);
    return [];
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



  try {
    const response = await axios.post(
      url,
      { idcategoria: idcategoria, idusuario: idusuario.userToken.id },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );

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

export const getCategoriesByUser = async (token) => {
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
        categoriaSeleccionada.imagenActiva =
          "data:image/png;base64," +
          encode(categoriaSeleccionada.imgActiva.data);
        categoriaSeleccionada.imagenInactiva =
          "data:image/png;base64," +
          encode(categoriaSeleccionada.imgInactiva.data);

        finalData.push(categoriaSeleccionada);
      }

     

      for (const categoriaNoSeleccionada of response.data.noSeleccionadas) {
        categoriaNoSeleccionada.isActive = false;
        categoriaNoSeleccionada.imagenActiva =
          "data:image/png;base64," +
          encode(categoriaNoSeleccionada.imgActiva.data);
        categoriaNoSeleccionada.imagenInactiva =
          "data:image/png;base64," +
          encode(categoriaNoSeleccionada.imgInactiva.data);

        finalData.push(categoriaNoSeleccionada);
      }

      return finalData;
    } else if (response.status === 401) {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
