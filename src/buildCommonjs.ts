import buildModule from './buildModule'
import path from 'path'
import { CusConfig } from '.'

const ctx = process.cwd()

function buildCommonjs(cusConfig: CusConfig) {
  const outputPath = cusConfig.outputPath || path.join(ctx, './lib')

  return buildModule({
    outputPath,
    commonjs: true,
    ...cusConfig
  })
}

export default buildCommonjs
