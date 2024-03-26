"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("./utils/fs");
const app = (0, express_1.default)();
// Body Parser: Mengambil Req.Body dari client
app.use(express_1.default.json());
const port = 5000;
app.get('/', (req, res) => {
    return res.send('<h1>Welcome to Express Typescript Server</h1>');
});
app.get('/users', (req, res) => {
    try {
        // Step01. Read db.json
        // Step02. Destructure object, get users only
        const { users } = (0, fs_1.ReadFile)();
        // Step03. Send users data 
        return res.send(users);
    }
    catch (error) {
        console.log(error);
    }
});
app.post('/users', (req, res) => {
    try {
        const user = req.body; // Get Data from Req.Body
        const db = (0, fs_1.ReadFile)();
        const users = db.users; // [{}, {}, {}]
        users.push(Object.assign({ id: users[users.length - 1].id + 1 }, user)); // [{}, {}, {}, {}]
        db.users = users;
        (0, fs_1.WriteFile)(db);
        return res.send('Create User Success!');
    }
    catch (error) {
        console.log(error);
    }
});
app.delete('/users/:id', (req, res) => {
    try {
        // Step01 Get Id Params
        const { id } = req.params; // String
        // Step02 Readfile db.json
        const db = (0, fs_1.ReadFile)();
        const users = db.users;
        // Step03 Manipulation Data
        const usersFiltered = users.filter((val) => val.id !== Number(id));
        db.users = usersFiltered;
        (0, fs_1.WriteFile)(db);
        res.send(`Delete Users with Id ${id} Success!`);
    }
    catch (error) {
    }
});
app.put('/users/:id', (req, res) => {
    try {
        // Step01 Get Params Id
        const { id } = req.params;
        // Step02 Get Data from Req.Body
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            throw new Error('Data Not Complete!');
        // Step03 Manipulation
        const db = (0, fs_1.ReadFile)();
        const users = db.users;
        const indexOfUser = users.findIndex(val => val.id === Number(id));
        if (indexOfUser === -1)
            throw new Error(`User with Id ${id} Not Found!`);
        users[indexOfUser] = {
            id: users[indexOfUser].id,
            username,
            email,
            password
        };
        (0, fs_1.WriteFile)(db);
        // Step04 Send Response
        res.send('User Data Updated Success!');
    }
    catch (error) {
        res.send(error.message);
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
