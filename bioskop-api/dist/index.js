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
        usersJSON.push(Object.assign({}, req.body));
        (0, fs_1.WriteFile)(db);
        // Step03. Send Response
        res.send('Register Success!');
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
