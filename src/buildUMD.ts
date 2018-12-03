import path from 'path'
import webpack, { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import createBabelConfig from './config/createBabelConfig'

export interface CusConfig {
  entry: string
  outputPath?: string
  filename?: string
  mode: 'development' | 'production' | 'none' | undefined
  language: string
  tsconfig?: any
}

const ctx = process.cwd()

function getWebpackConfig(cusConfig: CusConfig): Configuration {
  const { entry, mode, filename } = cusConfig

  const outputPath = cusConfig.outputPath || path.join(ctx, './dist')

  const babelrc = createBabelConfig({ commonjs: true })

  const config: Configuration = {
    entry,
    mode: mode || 'production',
    output: {
      path: outputPath,
      libraryTarget: 'umd',
      filename
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

function buildUMD(cusConfig: CusConfig) {
  const webpackConfig = getWebpackConfig(cusConfig)

  const compiler = webpack(webpackConfig)

  compiler.run((err: Error, stats: any) => {
    if (err) {
      console.error(err.stack || err)
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
  })
}

export default buildUMD
