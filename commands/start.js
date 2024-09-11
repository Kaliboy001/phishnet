"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const bot_1 = __importDefault(require("../config/bot"));
const start = (msg) => {
    const chatId = msg.chat.id;
    bot_1.default.sendMessage(chatId, "Welcome to Phishnet bot! Type /help to see the available commands");
};
exports.start = start;
