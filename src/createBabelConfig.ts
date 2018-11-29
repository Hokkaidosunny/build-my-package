interface Option {
  commonjs: boolean
}

function createBabelConfig({ commonjs }: Option) {
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
      [
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
