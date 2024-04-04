"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const connection_1 = __importDefault(require("../connection"));
const util_1 = __importDefault(require("util"));
exports.query = util_1.default.promisify(connection_1.default.query).bind(connection_1.default);