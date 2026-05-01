import { useEffect } from "react";
import { socket } from "../socket";
import { useAuth } from "@clerk/react";

export default function useGlobalSocketListeners() {
    const { getToken } = useAuth();

    useEffect(() => {
        const handleConnect = async () => {
            console.log("Socket connected:", socket.id);
            socket.emit("join-user-groups");
            alert('connected succefuly ')
        };

        const handleDisconnect = () => {
            console.log("Socket disconnected");
        };

        const handleGroupLive = (data) => {
            console.log("A group went live:", data);
            alert("gorup is live")

        };

        const handleGroupEnded = (data) => {
            console.log("Group ended:", data);
        };

        const handlePendingRequest = (data) => {
            console.log("New pending request:", data);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("room:live", handleGroupLive);
        socket.on("room:ended", handleGroupEnded);
        socket.on("pending-request", handlePendingRequest);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("group-live", handleGroupLive);
            socket.off("group-ended", handleGroupEnded);
            socket.off("pending-request", handlePendingRequest);
        };
    }, []);
}