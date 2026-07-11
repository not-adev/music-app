import {socket} from "../../../socket"; 
export const songAddToGroupEmit = (songInfo)=>{
    socket.emit("song:add",songInfo)
}