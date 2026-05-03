import { useEffect } from "react";
import { socket } from "../socket";
import { useAuth } from "@clerk/react";
import { useSong } from "../context/SongContext";
export default function useGlobalSocketListeners() {
    const { getToken } = useAuth();
    const { reset, inGroupUpdate } = useSong()

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
            console.log("room ended:", data);
            alert('room ended ')
            reset(false)
        };

        const handlePendingRequest = (data) => {
            console.log("New pending request:", data);
        };

        const handleError = (error) => {
            console.log(error.message)
            alert(error.message)
        }

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("room:live", handleGroupLive);
        socket.on("room:ended", handleGroupEnded);
        socket.on("pending-request", handlePendingRequest);
        socket.on("error", handleError);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("group-live", handleGroupLive);
            socket.off("group-ended", handleGroupEnded);
            socket.off("pending-request", handlePendingRequest);
        };
    }, []);
}