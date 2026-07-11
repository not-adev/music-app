import { createContext, useContext, useEffect } from "react";
import { socket } from "../socket";
import useGlobalSocketListeners from "../utilities/GlobalSocketListers";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
   useGlobalSocketListeners()
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};