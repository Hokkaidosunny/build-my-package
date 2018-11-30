import buildModule from './lib/buildModule'
import path from 'path'
import { CusConfig } from './buildUMD'

const ctx = process.cwd()

function buildCommonjs(cusConfig: CusConfig) {
  const outputPath = cusConfig.outputPath || path.join(ctx, './lib')

  buildModule({
    outputPath,
    commonjs: true,
    ...cusConfig
  })
}

export default buildCommonjs
