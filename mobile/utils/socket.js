import { io } from "socket.io-client";
const socket = io.connect("http://10.10.28.146:5002");

export default socket;
