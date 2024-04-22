"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Define Router
const bebas = (0, express_1.Router)();
// Import Controller
const LibraryController_1 = require("../controllers/LibraryController");
bebas.post('/', LibraryController_1.createLibraryAndStaff);
exports.default = bebas;
