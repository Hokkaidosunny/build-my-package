import gulp from 'gulp'
import babel from 'gulp-babel'
import path from 'path'
import createBabelConfig from '../config/createBabelConfig'
import createTSConfig from '../config/createTSConfig'
import tsc from 'gulp-typescript'
import { CusConfig } from '../buildUMD'

interface Option extends CusConfig {
  commonjs: boolean
}

function buildTS(option: Option) {
  const { entry, outputPath, commonjs, tsconfig } = option

  const tsConfig = createTSConfig({ commonjs, tsconfig })
  const src = path.join(entry, '**/*.{ts,tsx}')

  return gulp
    .src(src)
    .pipe(tsc(tsConfig))
    .pipe(gulp.dest(outputPath as string))
}

function buildJS(option: Option) {
  const { entry, outputPath, commonjs } = option

  const babelrc = createBabelConfig({ commonjs }) as any
  const src = path.join(entry, '**/*.{js,jsx}')

  return gulp
    .src(src)
    .pipe(babel(babelrc))
    .pipe(gulp.dest(outputPath as string))
}

function buildModule(option: Option) {
  const { language } = option

  if (language === 'typescript') {
    return buildTS(option)
  }

  return buildJS(option)
}

export default buildModule
