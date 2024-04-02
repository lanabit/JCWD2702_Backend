"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PassangerController_1 = require("../controllers/PassangerController");
const router = (0, express_1.Router)();
router.get('/', PassangerController_1.findPassangers);
exports.default = router;
