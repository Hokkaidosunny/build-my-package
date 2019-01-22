import gulp from 'gulp'
import babel from 'gulp-babel'
import path from 'path'
import createBabelConfig from './config/createBabelConfig'
import createTSConfig from './config/createTSConfig'
import tsc from 'gulp-typescript'
import { CusConfig } from '.'
import _ from 'lodash'
import ora from 'ora'
import { getRuntime } from './util'

interface Option extends CusConfig {
  commonjs: boolean
}

/**
 * build by language
 * @param option
 * @param src gulp src
 * @param compiler gulp-babel \ gulp-typscrilpt
 */
function build(option: Option) {
  const {
    outputPath,
    exclude,
    watch,
    language,
    entry,
    commonjs,
    tsconfig,
    runtime
  } = option

  const isTypescript = language === 'typescript'

  // gulp src
  let src = isTypescript
    ? [path.join(entry, '**/*.{ts,tsx}')]
    : [path.join(entry, '**/*.{js,jsx}')]

  if (exclude) {
    src = src.concat(exclude.map(e => '!' + e))
  }

  // compiler
  const compiler = language === 'typescript' ? tsc : babel

  const _runtime = getRuntime(runtime)

  // compile config
  const config = isTypescript
    ? createTSConfig({ commonjs, tsconfig, runtime: _runtime })
    : createBabelConfig({ commonjs, runtime: _runtime })

  // task
  async function complileTask() {
    const spin = ora().start('start build')

    await new Promise((resolve, reject) => {
      gulp
        .src(src)
        .pipe(
          compiler(config).on('error', error => {
            spin.fail('build fail')
            reject(error)
          })
        )
        .pipe(gulp.dest(outputPath as string))
        .on('end', resolve)
    })

    spin.succeed('build success')
  }

  complileTask()

  if (watch) {
    gulp.watch(src, complileTask)
  }
}

export default build
