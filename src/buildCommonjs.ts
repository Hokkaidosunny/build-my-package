import buildModule from './buildModule'
import path from 'path'

const ctx = process.cwd()

function buildCommonjs(cusConfig: any) {
  const { entry } = cusConfig
  const outputPath = path.join(ctx, './lib')

  buildModule({
    entry,
    outputPath,
    commonjs: true
  })
}

export default buildCommonjs
