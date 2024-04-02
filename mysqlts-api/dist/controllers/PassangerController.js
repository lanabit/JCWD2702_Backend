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
exports.findPassangers = void 0;
const PassangerService_1 = require("../services/PassangerService");
const findPassangers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Survived, Pclass } = req.query;
        if (!Name && !(Survived && Pclass))
            throw { status: 404, message: 'Req Query Must Valid!' };
        const findPassangers = yield (0, PassangerService_1.findPassangersQuery)({ Name, Survived, Pclass });
        res.status(200).send({
            error: false,
            message: 'Success',
            data: findPassangers
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findPassangers = findPassangers;
