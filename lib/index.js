"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildCommonjs_1 = __importDefault(require("./buildCommonjs"));
exports.buildCommonjs = buildCommonjs_1.default;
const buildES_1 = __importDefault(require("./buildES"));
exports.buildES = buildES_1.default;
const buildUMD_1 = __importDefault(require("./buildUMD"));
exports.buildUMD = buildUMD_1.default;
