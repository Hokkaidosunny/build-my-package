import buildModule from './buildModule'
import path from 'path'

const ctx = process.cwd()

function buildCommonjs(cusConfig: any) {
  const { entry } = cusConfig
  const outputPath = path.join(ctx, './es')

  buildModule({
    entry,
    outputPath,
    commonjs: false
  })
}

export default buildCommonjs
