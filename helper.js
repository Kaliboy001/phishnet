"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUid = findByUid;
const state_1 = require("./config/state");
function findByUid(uid) {
    for (const key in state_1.userStates) {
        if (state_1.userStates[key].uid === uid) {
            return Object.assign(Object.assign({}, state_1.userStates[key]), { chatId: key });
        }
    }
    return null;
}
