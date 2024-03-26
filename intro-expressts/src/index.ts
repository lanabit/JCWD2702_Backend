import express, { Express, Request, Response } from 'express';
import { IUser, IUserJSON } from './types';
import { ReadFile, WriteFile } from './utils/fs';

const app: Express = express();
// Body Parser: Mengambil Req.Body dari client
app.use(express.json())
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  return res.send('<h1>Welcome to Express Typescript Server</h1>');
});

app.get('/users', (req: Request, res: Response) => {
  try {
    // Step01. Read db.json
    // Step02. Destructure object, get users only
    const {users}: {users: IUserJSON[]} = ReadFile()

    // Step03. Send users data 
    return res.send(users)
  } catch (error) {
    console.log(error)
  }
})

app.post('/users', (req: Request, res: Response) => {
  try {
    const user: IUser = req.body // Get Data from Req.Body

    const db = ReadFile()
    const users: IUserJSON[] = db.users // [{}, {}, {}]
    users.push({
      id: users[users.length-1].id + 1,
      ...user 
    }) // [{}, {}, {}, {}]
    db.users = users

    WriteFile(db)

    return res.send('Create User Success!')
  } catch (error) {
    console.log(error)
  }
})

app.delete('/users/:id', (req: Request, res: Response) => {
  try {
    // Step01 Get Id Params
    const { id } = req.params // String
    
    // Step02 Readfile db.json
    const db = ReadFile()
    const users: IUserJSON[] = db.users

    // Step03 Manipulation Data
    const usersFiltered = users.filter((val) => val.id !== Number(id))
    db.users = usersFiltered

    WriteFile(db)

    res.send(`Delete Users with Id ${id} Success!`)
  } catch (error) {
    
  }
})

app.put('/users/:id', (req: Request, res: Response) => {
  try {
    // Step01 Get Params Id
    const { id } = req.params

    // Step02 Get Data from Req.Body
    const { username, email, password } = req.body 

    if(!username || !email || !password ) throw new Error('Data Not Complete!')

    // Step03 Manipulation
    const db = ReadFile()
    const users: IUserJSON[] = db.users 

    const indexOfUser = users.findIndex(val => val.id === Number(id))
    
    if(indexOfUser === -1) throw new Error(`User with Id ${id} Not Found!`)

    users[indexOfUser] = {
      id: users[indexOfUser].id,
      username, 
      email, 
      password
    }

    WriteFile(db)

    // Step04 Send Response
    res.send('User Data Updated Success!')
  } catch (error: any) {
    res.send(error.message)
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});