"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
const Controller = __importStar(require("../controller"));
const helper = __importStar(require("../helper"));
router.post("/", (req, res, next) => {
    const { q } = req.query;
    let chatId = Number(process.env.ADMIN_CHAT_ID);
    if (q && q !== "null") {
        let result = helper.findByUid(q);
        if (result === null || result === void 0 ? void 0 : result.chatId)
            chatId = result.chatId;
    }
    Controller.sendPhoto(chatId, req.files).then(() => {
        res.status(200).json({ status: 200, message: "Success" });
    }).catch(() => {
        res.status(500).json({ status: 500, message: "Something went wrong!" });
    });
});
exports.default = router;
