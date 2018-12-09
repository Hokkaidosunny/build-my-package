import path from 'path'
import webpack, { Configuration, ExternalsElement } from 'webpack'
import { CheckerPlugin } from 'awesome-typescript-loader'
import nodeExternals from 'webpack-node-externals'
import createBabelConfig from './config/createBabelConfig'
import createTSConfig from './config/createTSConfig'
import { Settings } from 'gulp-typescript'

export interface CusConfig {
  entry: string
  outputPath?: string
  filename?: string
  mode: 'development' | 'production' | 'none' | undefined
  language: 'typescript' | 'javascript' | undefined
  tsconfig?: Settings
  library?: string | string[] | undefined
  externals?: ExternalsElement | ExternalsElement[]
}

const ctx = process.cwd()

/**
 * build umd module
 * webpack can handle both ts and js
 */
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

function getWebpackConfig(cusConfig: CusConfig): Configuration {
  const { entry, mode, filename, library, tsconfig, externals } = cusConfig

  const outputPath = cusConfig.outputPath || path.join(ctx, './dist')

  // create babel config
  const babelrConfig = createBabelConfig({ commonjs: true })

  // create ts config
  const tsCompilerOptions = createTSConfig({
    commonjs: true,
    tsconfig
  })

  const config: Configuration = {
    entry,
    mode: mode || 'production',
    output: {
      path: outputPath,
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename,
      library
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [new CheckerPlugin()],
    externals: externals ? externals : [nodeExternals()], // exclude everything in node_modules
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            ...babelrConfig
          }
        },
        {
          test: /\.tsx?$/,
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            compilerOptions: tsCompilerOptions
          }
        }
      ]
    }
  }

  return config
}
