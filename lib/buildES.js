"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const gulp_babel_1 = __importDefault(require("gulp-babel"));
const path_1 = __importDefault(require("path"));
const createBabelConfig_1 = __importDefault(require("./createBabelConfig"));
const ctx = process.cwd();
const outputPath = path_1.default.join(ctx, './es');
function buildES(cusConfig) {
    const { entry } = cusConfig;
    const babelrc = createBabelConfig_1.default({ commonjs: false });
    const src = path_1.default.join(entry, '**/*.js');
    return gulp_1.default
        .src(src)
        .pipe(gulp_babel_1.default(babelrc))
        .pipe(gulp_1.default.dest(outputPath));
}
exports.default = buildES;
