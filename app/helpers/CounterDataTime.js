var dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
var duration = require("dayjs/plugin/duration");

require("dayjs/locale/es-mx");

export const CounterDataTime = (fechaPublicacionFinal, horaFin) => {
  let nuevaFechaFinal = new Date();
  nuevaFechaFinal = Date.parse(fechaPublicacionFinal + "T" + horaFin);
  let fechaActual = new Date();
  let resta = nuevaFechaFinal - fechaActual;
  var dayjsAver = dayjs(resta).format("mm");
  dayjsAver = parseInt(dayjsAver) * 60;
  return dayjsAver;
};
