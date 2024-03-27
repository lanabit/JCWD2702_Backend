import express, { Express, Request, Response } from 'express';
import { ReadFile, WriteFile } from './utils/fs';

const app: Express = express();
// Body Parser: Mengambil Req.Body dari client
app.use(express.json())
const port = 5000;

import { IUser, IUserJSON } from './types';

// Register
app.post('/register', (req: Request, res: Response) => {
    try {
        // Step01. Get Data from Req.Body
        const userBody: IUser = req.body
        
        // Step02. Manipulation
        const db = ReadFile()
        const usersJSON: IUserJSON[] = db.users
        const findUser = usersJSON.filter((val: IUser) => 
            val.username === userBody.username || val.email === userBody.email
        )
        
        if(findUser.length > 0) return res.send('Email or Username Already Registered!')

        const uid = Date.now()

        usersJSON.push({uid, ...userBody})

        WriteFile(db)

        // Step03. Send Response
        res.send({
            uid, 
            username: userBody.username, 
            email: userBody.email
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/auth', (req: Request, res: Response) => {
    try {
        const { username, password } = req.body 

        const db = ReadFile()
        const usersJSON: IUserJSON[] = db.users

        const findUser: IUserJSON[] = usersJSON.filter(val => 
            (val.username === username || val.email === username) 
            && val.password === password) // [{}]
        
        if(findUser.length === 0) throw new Error('Username & Password Incorrect!')

        return res.send({
            uid: findUser[0].uid, 
            username: findUser[0].username, 
            role: findUser[0].role
        })
    } catch (error: any) {
        res.send(error.message)
    }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});