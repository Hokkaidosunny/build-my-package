import gulp from 'gulp'
import babel from 'gulp-babel'
import path from 'path'
import createBabelConfig from './config/createBabelConfig'
import createTSConfig from './config/createTSConfig'
import tsc from 'gulp-typescript'
import { CusConfig } from '.'
import _ from 'lodash'
import ora from 'ora'
import chokidar from 'chokidar'

interface Option extends CusConfig {
  commonjs: boolean
}

async function buildModule(option: Option) {
  const { watch, entry } = option

  if (watch) {
    const listener = _.debounce(async path => {
      console.log(path + ' has changed')

      const spinner = ora().start('start build')
      await compile(option)
      spinner.succeed('build success')
    }, 500)

    chokidar
      .watch(entry)
      .on('ready', listener)
      .on('change', listener)
      .on('addDir', listener)
      .on('add', listener)
  } else {
    const spinner = ora().start('start build')
    await compile(option)
    spinner.succeed('build success')
  }
}

function compile(option: Option) {
  const { language } = option

  let res: any
  if (language === 'typescript') {
    res = buildTS(option)
  } else {
    res = buildJS(option)
  }

  return new Promise((resolve, reject) => {
    res.on('error', reject).on('end', resolve)
  })
}

// build ts
function buildTS(option: Option) {
  const { entry, outputPath, commonjs, tsconfig } = option

  const tsConfig = createTSConfig({ commonjs, tsconfig })
  const src = path.join(entry, '**/*.{ts,tsx}')

  return gulp
    .src(src)
    .pipe(tsc(tsConfig))
    .pipe(gulp.dest(outputPath as string))
}

// build js
function buildJS(option: Option) {
  const { entry, outputPath, commonjs } = option

  const babelrc = createBabelConfig({ commonjs, runtime: true }) as any
  const src = path.join(entry, '**/*.{js,jsx}')

  return gulp
    .src(src)
    .pipe(babel(babelrc))
    .pipe(gulp.dest(outputPath as string))
}

export default buildModule
