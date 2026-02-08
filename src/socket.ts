import { io } from "socket.io-client";

export const socket = io("https://YOUR_RENDER_URL.onrender.com", {
  autoConnect: false,
});
