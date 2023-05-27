import { io } from "socket.io-client";
import React from "react";
const SOCKET_URL = process.env.REACT_APP_BASE_URL || "http://localhost:9000";
export const socket = io(SOCKET_URL);
// app context
export const AppContext = React.createContext("");
