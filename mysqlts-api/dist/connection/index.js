"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const db = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "abc12345",
    database: "titanic",
});
db.connect((err) => {
    if (err)
        return console.log('Error ' + err.message);
    console.log('Connected to Database');
});
exports.default = db;
