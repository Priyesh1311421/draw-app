"use client"
import { useEffect, useRef, useState } from "react";

import { WS_URL } from "@/config";
import Canvas from "./Canvas";

export function RoomCanvas({roomId}:{roomId:string}) {
    
    const [socket, setSocket] = useState<WebSocket | null>(null); 

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmN2VjOWI3Ny02ZTAzLTQwNTktODM0MC1iZjQxMGQ3YWRhMWMiLCJpYXQiOjE3NDI0OTk5Njd9.amwEoZdl__CVwM7vH8C0bohCl-JSbUBR0IGZRjirzsg`);
        
        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId: parseInt(roomId),
            });
            ws.send(data)
        }
    },[]) 

    

    if(!socket){
        return <div>
            Connecting to server...
        </div>
    }

    return (
        <div>
            <Canvas roomId={roomId} socket={socket} />
            
        </div>
    );
}