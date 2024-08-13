"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const http_1 = __importDefault(require("http"));
const router_1 = require("./router");
const PORT = 3000;
const server = http_1.default.createServer((req, res) => {
    (0, router_1.handleRequest)(req, res);
});
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
