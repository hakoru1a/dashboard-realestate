const host = "ws://localhost:8081/";

import { io } from "socket.io-client";

export const socket = io(host, {
  autoConnect: false,
});
