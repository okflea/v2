"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from local file (optional in production)
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.SERVICE1_PORT || 3001;
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Service 1!' });
});
app.listen(port, () => {
    console.log(`Service 1 listening on port ${port}`);
});
