import gulp from 'gulp'
import babel from 'gulp-babel'
import path from 'path'
import createBabelConfig from './config/createBabelConfig'
import createTSConfig from './config/createTSConfig'
import tsc from 'gulp-typescript'
import { CusConfig } from '.'
import _ from 'lodash'
import ora from 'ora'

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
    tsconfig
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

  // compile config
  const config = isTypescript
    ? createTSConfig({ commonjs, tsconfig })
    : createBabelConfig({ commonjs, runtime: true })

  // task
  async function complileTask() {
    const spin = ora().start('start build')

    await new Promise((resolve, reject) => {
      gulp
        .src(src)
        .pipe(compiler(config))
        .pipe(gulp.dest(outputPath as string))
        .on('error', reject)
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
