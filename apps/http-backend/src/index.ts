import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from '@repo/common/types';
import { prismaClient } from "@repo/db/db"
import { CustomRequest } from './middleware';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
app.use(express.json());
const port = 5000;
app.use(cors())


app.post('/signin',async(req:CustomRequest,res:Response)=>{
    const data = SigninSchema.safeParse(req.body);
 
    if(!data.success){
        res.status(400).json(data.error);
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: data.data.username
        }
    })
    if(user){
        const passwordMatch = await bcrypt.compare(data.data.password,user.password);
        if(passwordMatch){
            const token = jwt.sign({ userId: user.id }, JWT_SECRET);
            res.status(200).json({ token });
        }
    }
    else{
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

app.post('/signup',async(req:CustomRequest,res:Response)=>{
    const data = CreateUserSchema.safeParse(req.body);

    if(!data.success){
        res.status(400).json(data.error);
        return;
    }

    const hashedPassword = await bcrypt.hash(data.data.password,10);

    try {
        // db call
        const user = await prismaClient.user.create({
            data: {
                email: data.data.username,
                password: hashedPassword,
                name: data.data.name
            },
        });


        res.status(200).json({ userId: user.id });
    } catch (error: Error | any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.post('/room',middleware,async(req:CustomRequest,res:Response)=>{
    const data = CreateRoomSchema.safeParse(req.body);

    if(!data.success){
        res.status(400).json(data.error);
        return;
    }

    // db call
    const userId = req.userId??'';
    try{
        const room = await prismaClient.room.create({
            data:{
                slug: data.data.name,
                adminId: userId
            }
        })

        res.status(200).json({
            roomId:room.id
        })

    }catch(error:Error|any){
        res.status(411).json({
            message:'Room already exists with this name'
        });
    }
});

app.get('/chats/:roomId',async(req,res)=>{
    const roomId = req.params.roomId;
    const messages = await prismaClient.chat.findMany({
        where:{
            roomId: Number(roomId)
        },
        orderBy: {
            id: 'asc' 
        },
    })

    res.json({
        messages
    })

})


app.get('/room/:slug', async(req,res)=>{
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where:{
            slug: slug
        }
    });
    if(!room){
        res.status(404).json({
            message:'Room not found'
        });
    }
    res.status(200).json({
        room
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

