import path from 'path'
import webpack, { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import createBabelConfig from './createBabelConfig'

const ctx = process.cwd()

const outputPath = path.join(ctx, './dist')

const babelrc = createBabelConfig({ commonjs: true })

function getWebpackConfig(cusConfig: Configuration): Configuration {
  const { entry, output, mode } = cusConfig

  const config: Configuration = {
    entry,
    mode: mode || 'production',
    output: {
      path: outputPath,
      libraryTarget: 'umd',
      ...output
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            ...babelrc
          }
        }
      ]
    },
    externals: [nodeExternals()]
  }

  return config
}

function buildUMD(cusConfig: Configuration) {
  const webpackConfig = getWebpackConfig(cusConfig)

  const compiler = webpack(webpackConfig)

  compiler.run((err: Error, stats: any) => {
    if (err) {
      console.warn(err, stats)
    }
  })
}

export default buildUMD
