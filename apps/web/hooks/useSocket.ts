import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmN2VjOWI3Ny02ZTAzLTQwNTktODM0MC1iZjQxMGQ3YWRhMWMiLCJpYXQiOjE3NDI0OTk5Njd9.amwEoZdl__CVwM7vH8C0bohCl-JSbUBR0IGZRjirzsg`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}