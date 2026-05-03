import { useEffect } from "react";
import { socket } from "../socket";
import { useAuth } from "@clerk/react";
import { useSong } from "../context/SongContext";
export default function useGlobalSocketListeners() {
    const { getToken } = useAuth();
    const { reset, inGroupUpdateCurrentSong, inGroupUpdateQue, inGroupUpdateCurrentIndex } = useSong()

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

        const handleNewSongAdded = async (data) => {
            console.log("added song data ", data)
            inGroupUpdateQue(data.queue)
            inGroupUpdateCurrentIndex(data.currentIndex);
        }




        const handleUpdateCurrentIndex = (data) => {
            console.log("updte in current index")
            inGroupUpdateQue(data.queue)
            inGroupUpdateCurrentIndex(data.currentIndex);
        }




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
        socket.on("song:upDateCurrentIndex", handleUpdateCurrentIndex);
        socket.on("song:added", handleNewSongAdded)
        socket.on("room:ended", handleGroupEnded);
        socket.on("pending-request", handlePendingRequest);
        socket.on("error", handleError);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("room:live", handleGroupLive);
            socket.off("song:upDateCurrentIndex", handleUpdateCurrentIndex);
            socket.off("song:added", handleNewSongAdded)
            socket.off("room:ended", handleGroupEnded);
            socket.off("pending-request", handlePendingRequest);
            socket.off("error", handleError);

        };
    }, []);
}