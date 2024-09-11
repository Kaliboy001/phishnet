"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
const bot_1 = __importDefault(require("../config/bot"));
const version = (msg) => {
    const chatId = msg.chat.id;
    const version = process.env.VERSION;
    bot_1.default.sendMessage(chatId, `Bot version: ${version}`);
};
exports.version = version;
