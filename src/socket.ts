import { io } from "socket.io-client";

export const socket = io("https://reflex-royale-onrender-com.onrender.com", {
  autoConnect: false,
});
