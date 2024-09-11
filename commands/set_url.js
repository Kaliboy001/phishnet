"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_url = void 0;
const bot_1 = __importDefault(require("../config/bot"));
const state_1 = require("../config/state");
const set_url = (msg) => {
    var _a;
    const chatId = msg.chat.id;
    state_1.userStates[chatId] = {
        step: "awaiting_url",
        url: "",
        title: "",
        uid: ((_a = state_1.userStates[chatId]) === null || _a === void 0 ? void 0 : _a.uid) || ""
    };
    bot_1.default.sendMessage(chatId, "Enter the URL for the iframe [include http:// or https://].\n<b>Note: The website must have a clickjacking vulnerability</b>", { parse_mode: "HTML" });
};
exports.set_url = set_url;
