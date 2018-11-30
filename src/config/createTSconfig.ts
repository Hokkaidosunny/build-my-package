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
    esModuleInterop: true,
    target: 'es6',
    declaration: true,
    keyofStringsOnly: true,
    ...tsconfig
  }
}

export default createTSConfig
