import express, { Express, Request, Response } from 'express';
import { ReadFile, WriteFile } from './utils/fs';

const app: Express = express();
// Body Parser: Mengambil Req.Body dari client
app.use(express.json())
const port = 5000;

import { IUser } from './types';

// Register
app.post('/register', (req: Request, res: Response) => {
    try {
        // Step01. Get Data from Req.Body
        const userBody: IUser = req.body
        
        // Step02. Manipulation
        const db = ReadFile()
        const usersJSON: IUser[] = db.users
        const findUser = usersJSON.filter((val: IUser) => 
            val.username === userBody.username || val.email === userBody.email
        )
        
        if(findUser.length > 0) return res.send('Email or Username Already Registered!')

        usersJSON.push({...req.body})

        WriteFile(db)

        // Step03. Send Response
        res.send('Register Success!')
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});