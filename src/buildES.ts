import buildModule from './buildModule'
import path from 'path'
import { CusConfig } from '.'

const ctx = process.cwd()

function buildCommonjs(cusConfig: CusConfig) {
  const outputPath = cusConfig.outputPath || path.join(ctx, './es')

  return buildModule({
    outputPath,
    commonjs: false,
    ...cusConfig
  })
}

export default buildCommonjs
