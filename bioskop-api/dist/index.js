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
// Register
app.post('/register', (req, res) => {
    try {
        // Step01. Get Data from Req.Body
        const userBody = req.body;
        // Step02. Manipulation
        const db = (0, fs_1.ReadFile)();
        const usersJSON = db.users;
        const findUser = usersJSON.filter((val) => val.username === userBody.username || val.email === userBody.email);
        if (findUser.length > 0)
            return res.send('Email or Username Already Registered!');
        const uid = Date.now();
        usersJSON.push(Object.assign({ uid }, userBody));
        (0, fs_1.WriteFile)(db);
        // Step03. Send Response
        res.send({
            uid,
            username: userBody.username,
            email: userBody.email
        });
    }
    catch (error) {
        console.log(error);
    }
});
app.post('/auth', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = (0, fs_1.ReadFile)();
        const usersJSON = db.users;
        const findUser = usersJSON.filter(val => (val.username === username || val.email === username)
            && val.password === password); // [{}]
        if (findUser.length === 0)
            throw new Error('Username & Password Incorrect!');
        return res.send({
            uid: findUser[0].uid,
            username: findUser[0].username,
            role: findUser[0].role
        });
    }
    catch (error) {
        res.send(error.message);
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
