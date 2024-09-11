"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_useragent_1 = __importDefault(require("express-useragent"));
// import logger from 'morgan';
const initBot_1 = __importDefault(require("./config/initBot"));
const index_1 = __importDefault(require("./routes/index"));
const phone_info_1 = __importDefault(require("./routes/phone_info"));
const photo_info_1 = __importDefault(require("./routes/photo_info"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
let adminChatId = Number(process.env.ADMIN_CHAT_ID);
// app.use(logger("dev"))
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_useragent_1.default.express());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)());
// Set up Handlebars view engine
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("hbs", (0, express_handlebars_1.engine)({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path_1.default.join(__dirname, "/views/layouts"),
    partialsDir: path_1.default.join(__dirname, "/views/partials"),
}));
(0, initBot_1.default)();
//===> End configure
//======> Router configuration
app.use("/api/v1/photo", photo_info_1.default);
app.use("/api/v1/phoneInfo", phone_info_1.default);
app.use("/", index_1.default);
// Error handling
app.use(function (err, req, res, next) {
    console.error("From Error handler: ", err.message);
    res.status(err.status || 500).json({ status: err.status || 500, message: err.message });
});
app.listen(port, () => {
    console.log(`[server]: listening on http://localhost:${port}`);
});
