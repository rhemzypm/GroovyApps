import { io } from "socket.io-client";
const socket = io("http://10.10.28.146:5000", {
  query: { customerService: true },
});

export default socket;
