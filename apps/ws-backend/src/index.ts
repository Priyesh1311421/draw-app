import WebSocket, { WebSocketServer } from 'ws';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/db';

interface User{
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

const users: User[] = [];


const wss = new WebSocketServer({ port: 8080 });



function checkUser(token: string): string|null{
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(typeof decoded === 'string'){
            return null;
        }
        if(!decoded || !decoded.userId){       
            return null;
        }

        return decoded.userId;
    } catch (error) {
        return null;
    }
}

wss.on('connection', (ws,request) => {

    const url = request.url;
    if(!url){
        return;
    } 

    const queryParam = new URLSearchParams(url.split('?')[1]);
    const token = queryParam?.get('token') ?? '';
    const userId = checkUser(token);

    if(!userId){
        ws.close();
        return;
    }

    users.push({
        ws: ws,
        userId,
        rooms: [],
    });
    
    ws.on('message', async(data) => {
        const parsedData = JSON.parse(data as unknown as string);

        if (parsedData.type === 'join_room') {
            console.log('join room', parsedData.roomId);
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === 'leave_room') {
            const user = users.find(x => x.ws === ws);
            if(!user){
                return;
            }
            user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
        }


        if (parsedData.type === 'chat') {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            const chat = await prismaClient.chat.create({
                data: {
                    roomId: roomId,
                    userId: userId,
                    message: message,
                }
            })

            console.log(chat);

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: 'chat',
                        roomId,
                        message: message,
                    }));
                }
            });

            console.log('message sent', message);
        }
    });
});

console.log('server started');