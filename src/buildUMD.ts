import path from 'path'
import webpack, { Configuration } from 'webpack'

const ctx = process.cwd()

const outputPath = path.join(ctx, './dist')

function getWebpackConfig(cusConfig: Configuration): Configuration {
  const { entry } = cusConfig

  return {
    entry: path.join(ctx, entry as string),
    output: {
      path: outputPath,
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader'
        }
      ]
    }
  }
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
