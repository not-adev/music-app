import { createContext, useContext, useEffect } from "react";
import { socket } from "../socket";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      alert('connected succefuly ')
    });
  
    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};