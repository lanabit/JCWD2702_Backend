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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const AuthService_1 = require("../services/AuthService");
const hashing_1 = require("../helpers/hashing");
const token_1 = require("../helpers/token");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const loginResult = yield (0, AuthService_1.findEmployeeByEmail)({ email });
        const passwordComparationResult = yield (0, hashing_1.comparePassword)({
            passwordClient: password,
            passwordDb: loginResult.password,
        });
        if (!passwordComparationResult)
            throw new Error("Wrong password");
        const accessToken = yield (0, token_1.createToken)({ uid: loginResult.uid });
        res.status(201).send({
            error: false,
            message: "Login success",
            data: {
                accesstoken: accessToken,
                fullname: loginResult.fullname,
                imageUrl: (_a = loginResult.EmployeeProfile) === null || _a === void 0 ? void 0 : _a.EmployeeImagesProfile[0].url,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.logout = logout;
