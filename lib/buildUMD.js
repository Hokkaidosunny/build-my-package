"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_node_externals_1 = __importDefault(require("webpack-node-externals"));
const createBabelConfig_1 = __importDefault(require("./createBabelConfig"));
const ctx = process.cwd();
const outputPath = path_1.default.join(ctx, './dist');
const babelrc = createBabelConfig_1.default({ commonjs: true });
function getWebpackConfig(cusConfig) {
    const { entry, output, mode } = cusConfig;
    const config = {
        entry,
        mode: mode || 'production',
        output: Object.assign({ path: outputPath, libraryTarget: 'umd' }, output),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: require.resolve('babel-loader'),
                    options: Object.assign({ babelrc: false }, babelrc)
                }
            ]
        },
        externals: [webpack_node_externals_1.default()]
    };
    return config;
}
function buildUMD(cusConfig) {
    const webpackConfig = getWebpackConfig(cusConfig);
    const compiler = webpack_1.default(webpackConfig);
    compiler.run((err, stats) => {
        if (err) {
            console.warn(err, stats);
        }
    });
}
exports.default = buildUMD;
