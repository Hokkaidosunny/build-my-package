import path from 'path'
import fs from 'fs'
import webpack, { Configuration } from 'webpack'
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
}

const ctx = process.cwd()
const tsconfigPath = path.join(__dirname, './config/tsconfig.json')

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

// create tsconfig json file
function createTSConfigJson(cusConfig: CusConfig, outputPath: string) {
  deleteTSConfigJson()

  const json = {
    compilerOptions: createTSConfig({
      commonjs: true,
      tsconfig: {
        ...cusConfig.tsconfig,
        outDir: outputPath // make declaration file in right place
      }
    })
  }

  fs.writeFileSync(tsconfigPath, JSON.stringify(json), 'utf8')
}

// delete tsconfig json file
function deleteTSConfigJson() {
  if (fs.existsSync(tsconfigPath)) {
    fs.unlinkSync(tsconfigPath)
  }
}

function getWebpackConfig(cusConfig: CusConfig): Configuration {
  const { entry, mode, filename } = cusConfig

  const outputPath = cusConfig.outputPath || path.join(ctx, './dist')

  // create configs
  const babelrc = createBabelConfig({ commonjs: true })
  createTSConfigJson(cusConfig, outputPath)

  const config: Configuration = {
    entry,
    mode: mode || 'production',
    output: {
      path: outputPath,
      libraryTarget: 'umd',
      filename
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [new CheckerPlugin()],
    externals: [nodeExternals()], // exclude everything in node_modules
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            ...babelrc
          }
        },
        {
          test: /\.tsx?$/,
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: tsconfigPath
          }
        }
      ]
    }
  }

  return config
}
