import React from "react";
import { io } from "socket.io-client";

export const Socketio = () => {
  const socket = io("http://wiboodv.com:2020/");

  debugger;
  return socket;
};
