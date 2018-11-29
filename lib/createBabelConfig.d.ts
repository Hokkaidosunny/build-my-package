declare function createBabelConfig({ commonjs }: {
    commonjs: boolean;
}): {
    presets: (string | (string | {
        loose: boolean;
        modules: string | boolean;
    })[])[];
    plugins: string[];
};
export default createBabelConfig;
