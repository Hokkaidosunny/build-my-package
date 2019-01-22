export interface TSConfigOption {
  commonjs: boolean
  runtime: boolean
  tsconfig?: any
}

function createTSConfig({ commonjs, tsconfig, runtime }: TSConfigOption) {
  return {
    module: commonjs ? 'CommonJS' : 'ES6',
    allowSyntheticDefaultImports: true,
    experimentalDecorators: true,
    jsx: 'react',
    lib: ['dom', 'es7'],
    esModuleInterop: true,
    declaration: true,
    keyofStringsOnly: true,
    moduleResolution: 'node',
    importHelpers: runtime,
    ...tsconfig
  }
}

export default createTSConfig
