import buildCommonjs from './buildCommonjs'
import buildES from './buildES'
import buildUMD from './buildUMD'
import { Settings } from 'gulp-typescript'
import { ExternalsElement } from 'webpack'

export interface CusConfig {
  entry: string
  outputPath?: string
  filename?: string
  mode: 'development' | 'production' | 'none' | undefined
  language: 'typescript' | 'javascript' | undefined
  tsconfig?: Settings
  library?: string | string[] | undefined
  externals?: ExternalsElement | ExternalsElement[]
  watch?: boolean
  module?: 'es module' | 'commonjs' | 'umd'
}

export { buildCommonjs, buildES, buildUMD }

export default (config: CusConfig) => {
  const { module } = config

  let compiler: any
  switch (module) {
    case 'es module':
      compiler = buildES
      break

    case 'commonjs':
      compiler = buildCommonjs
      break

    case 'umd':
      compiler = buildUMD
      break

    default:
      break
  }

  if (!compiler) {
    throw new Error('module must be one of es module | commonjs | umd')
  }

  compiler(config)
}
