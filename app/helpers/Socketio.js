import React from "react";
import { io } from "socket.io-client";

export const Socketio = () => {
  const socket = io("http://201.147.245.165:2020/");
  return socket;
};
