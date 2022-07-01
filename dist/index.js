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
const config_1 = require("./config");
const database_1 = require("./database");
const router_1 = require("./router");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectToMongodb)();
    const server = (0, express_1.default)();
    server.use(express_1.default.json());
    (0, router_1.router)(server);
    server.listen(config_1.PORT, () => {
        console.log('The application is listening on port ' + config_1.PORT);
    });
});
main();
