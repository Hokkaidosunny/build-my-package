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

async function buildModule(option: Option) {
  const spinner = ora().start('start build')
  await compile(option)
  spinner.succeed('build success')
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
  const { entry, outputPath, commonjs, tsconfig, exclude } = option

  const tsConfig = createTSConfig({ commonjs, tsconfig })

  let src = [path.join(entry, '**/*.{ts,tsx}')]

  if (exclude) {
    src = src.concat(exclude.map(e => '!' + e))
  }

  return gulp
    .src(src)
    .pipe(tsc(tsConfig))
    .pipe(gulp.dest(outputPath as string))
}

// build js
function buildJS(option: Option) {
  const { entry, outputPath, commonjs, exclude } = option

  const babelConfig = createBabelConfig({ commonjs, runtime: true }) as any
  let src = [path.join(entry, '**/*.{js,jsx}')]

  if (exclude) {
    src = src.concat(exclude.map(e => '!' + e))
  }

  return gulp
    .src(src)
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(outputPath as string))
}

export default buildModule
