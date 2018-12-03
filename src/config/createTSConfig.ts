export interface TSConfigOption {
  commonjs: boolean
  tsconfig?: any
}

function createTSConfig({ commonjs, tsconfig }: TSConfigOption) {
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
    ...tsconfig
  }
}

export default createTSConfig
