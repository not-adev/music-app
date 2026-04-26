import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import { socket } from "./socket";

export function useSocketAuth() {
  const { getToken } = useAuth();

  useEffect(() => {
    const init = async () => {
      const token = await getToken();
      socket.auth = { token };
      socket.connect();
    };

    init();
  }, [getToken]);
}