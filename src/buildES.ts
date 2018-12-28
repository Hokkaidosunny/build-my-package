import buildModule from './lib/buildModule'
import path from 'path'
import { CusConfig } from '.'
import withWatch from './util/withWatch'

const ctx = process.cwd()

function buildCommonjs(cusConfig: CusConfig) {
  const outputPath = cusConfig.outputPath || path.join(ctx, './es')

  return new Promise((resolve, reject) => {
    buildModule({
      outputPath,
      commonjs: false,
      ...cusConfig
    })
      .on('error', reject)
      .on('end', resolve)
  })
}

export default withWatch(buildCommonjs)
