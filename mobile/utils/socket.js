import { io } from "socket.io-client";
const socket = io("http://192.168.100.5:5000", {
  query: { customerService: true },
});

export default socket;
