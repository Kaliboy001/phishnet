"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
const bot_1 = __importDefault(require("../config/bot"));
const clone = (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Instagram", callback_data: "instagram.com" },
                    { text: "Facebook", callback_data: "facebook.com" },
                ],
                [
                    { text: "X", callback_data: "x.com" },
                    { text: "Amazon", callback_data: "amazon.com" },
                ],
            ],
        }
    };
    bot_1.default.sendMessage(chatId, 'Choose an options:', options);
};
exports.clone = clone;
