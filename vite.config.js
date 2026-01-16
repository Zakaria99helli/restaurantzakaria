"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const path_1 = __importDefault(require("path"));
const vite_plugin_meta_images_1 = require("./vite-plugin-meta-images");
exports.default = (0, vite_1.defineConfig)(async () => {
    const plugins = [
        (0, plugin_react_1.default)(),
        (0, vite_plugin_meta_images_1.metaImagesPlugin)(),
    ];
    return {
        plugins,
        root: process.cwd(),
        resolve: {
            alias: {
                "@": path_1.default.resolve(__dirname, "client/src"),
                "@shared": path_1.default.resolve(__dirname, "shared"),
            },
        },
        server: {
            middlewareMode: true,
            // السماح بجميع الروابط المحتملة من Manus
            allowedHosts: [
                "localhost",
                "127.0.0.1",
                ".manus.computer",
                ".us2.manus.computer",
                "46409-i3atsxqtfk8xok8yy51eu-9d979ecf.us2.manus.computer",
            ],
        },
    };
});
