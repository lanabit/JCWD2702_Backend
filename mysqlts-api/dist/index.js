"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// IMPORT CONNECTION & SETUP PROMISFY
const connection_1 = __importDefault(require("./connection"));
const util_1 = __importDefault(require("util"));
const query = util_1.default.promisify(connection_1.default.query).bind(connection_1.default);
const app = (0, express_1.default)();
// Body Parser: Mengambil Req.Body dari client
app.use(express_1.default.json());
const port = 5000;
app.get('/passangers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findPassangers = yield query('SELECT * FROM passangers');
        res.status(200).send({
            error: false,
            message: 'Success',
            data: findPassangers
        });
    }
    catch (error) {
        console.log(error);
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// Buatlah REST API Express dengan 4 Item End-Point, Dimana Setiap
// End-Point Meng-Eksekusi Request Handler Sebagai Berikut: 
// 1. User Dapat Mencari Nama Penumpang yang Berada di Kapal Titanic. 
//    Request:  /passangers?Name='Helen';
// 2. User Dapat Melihat Total Penumpang yang Selamat 
//    Request: /passangers/survived
// 3. User Dapat Melihat Total Penumpang Pria dan Total Penumpang Wanita yang Selamat
//    Requests: /passangers/survived/sex
// 4. User Dapat Melihat List Penumpang yang Selamat dan Berada di Class yang Ditentukan oleh User
//    Requests: /passangers/survived?class=1
//              OR
//              /passangers/survived?class=0
