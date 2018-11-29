function createBabelConfig({ commonjs }: { commonjs: boolean }) {
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
  }
}

export default createBabelConfig
