"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Serve static files
app.use(express_1.default.static(__dirname + '../../../public'));
// Serve precipitation food app folder
app.get('/food', (_, res) => {
    res.sendFile(__dirname + '../../../public/food/index.html');
});
// Serve your app
console.log('Served: http://localhost:' + port);
app.listen(port);
