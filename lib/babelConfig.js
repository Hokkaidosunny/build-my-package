"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createBabelConfig({ commonjs }) {
    return {
        presets: [
            [
                require.resolve('@babel/preset-env'),
                {
                    loose: true,
                    modules: commonjs ? 'cjs' : false
                }
            ],
            require.resolve('@babel/preset-react')
        ],
        plugins: [require.resolve('@babel/plugin-proposal-class-properties')]
    };
}
exports.default = createBabelConfig;
