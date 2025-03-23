import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    console.log(response.data);
    return response.data.room.id;
}

export default async function({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = (await params).slug;
    console.log(slug);
    const roomId = await getRoomId(slug);
    console.log("Room Id",roomId);
    
    return <ChatRoom id={roomId}></ChatRoom>

}