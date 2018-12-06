export interface BabelConfigOption {
  commonjs: boolean
  runtime?: boolean
}

function createBabelConfig({ commonjs, runtime }: BabelConfigOption) {
  const plugins: any[] = [
    require.resolve('@babel/plugin-proposal-class-properties')
  ]

  if (runtime) {
    plugins.push([
      require.resolve('@babel/plugin-transform-runtime'),
      {
        useESModules: !commonjs
      }
    ])
  }

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
    plugins
  }
}

export default createBabelConfig
