"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uidDecoding = exports.tokenVerify = exports.createToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const createToken = ({ uid }) => __awaiter(void 0, void 0, void 0, function* () {
    return jwt.sign({ uid }, process.env.JWT_SECRETKEY, {
        expiresIn: "2h",
    });
});
exports.createToken = createToken;
const tokenVerify = (req, res, next) => {
    try {
        const reqToken = req;
        const { accesstoken } = req.headers;
        console.log(accesstoken);
        if (!accesstoken)
            throw new Error("Token Must Provided!");
        const decodedPayload = jwt.verify(accesstoken, process.env.JWT_SECRETKEY);
        console.log(decodedPayload);
        reqToken.payload = decodedPayload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.tokenVerify = tokenVerify;
const uidDecoding = (token) => {
    return jwt.verify(token, process.env.JWT_SECRETKEY);
};
exports.uidDecoding = uidDecoding;
