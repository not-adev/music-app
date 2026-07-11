import { useEffect } from "react";
import { socket } from "../socket";
import { useAuth } from "@clerk/react";
import { useSong } from "../context/SongContext";
import { toast } from "react-toastify";
export default function useGlobalSocketListeners() {
    const { getToken } = useAuth();
    const notification = (msg)=> toast.success(msg)
    const errorNotificatoin = (error)=> toast.error(error)
    const { reset, inGroupUpdateCurrentSong, inGroupUpdateQue, inGroupUpdateCurrentIndex } = useSong()

    useEffect(() => {
        const handleConnect = async () => {
            console.log("Socket connected:", socket.id);
            socket.emit("join-user-groups");
            notification("Socket connected")
        };

        const handleDisconnect = () => {
            console.log("Socket disconnected");
            notification("Socket disconnected")
        };

        const handleGroupLive = (data) => {
            console.log("A group went live:", data);
            notification("Group is live")
        };

        const handleGroupEnded = (data) => {
            console.log("room ended:", data);
            notification("Room has ended")
            reset(false)
        };

        const handleNewSongAdded = async (data) => {
            notification("New song added to the queue")
            console.log("added song data ", data)
            inGroupUpdateQue(data.queue)
        }

        const handleUpdateCurrentIndex = (data) => {
            console.log("updte in current index")
            inGroupUpdateCurrentIndex(data.currentIndex);
        }




        const handlePendingRequest = (data) => {
            console.log("New pending request:", data);
        };


        const haddleSongPlay = (data) => {
            notification("Song is playing")
            console.log("song play data ", data)
            inGroupUpdateCurrentIndex(data.currentIndex)
        }

        const handleError = (error) => {
            console.log(error.message)
            errorNotificatoin(error.message)
        }
        socket.on("song:play", haddleSongPlay);
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