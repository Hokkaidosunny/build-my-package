export interface BabelConfigOption {
  commonjs: boolean
  runtime?: boolean
}

function createBabelConfig({ commonjs, runtime }: BabelConfigOption) {
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
    plugins: [
      runtime && [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          useESModules: !commonjs
        }
      ],
      require.resolve('@babel/plugin-proposal-class-properties')
    ]
  }
}

export default createBabelConfig
