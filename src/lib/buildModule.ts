import gulp from 'gulp'
import babel from 'gulp-babel'
import path from 'path'
import createBabelConfig from '../config/createBabelConfig'
import createTSconfig from '../config/createTSconfig'
import tsc from 'gulp-typescript'
import { CusConfig } from '../buildUMD'

interface Option extends CusConfig {
  commonjs: boolean
}

function buildModule(option: Option) {
  const { entry, outputPath, commonjs, language, tsconfig } = option

  if (language === 'typescript') {
    const tsConfig = createTSconfig({ commonjs, tsconfig })
    const src = path.join(entry, '**/*.{ts,tsx}')

    return gulp
      .src(src)
      .pipe(tsc(tsConfig))
      .pipe(gulp.dest(outputPath as string))
  }

  if (language === 'js') {
    const babelrc = createBabelConfig({ commonjs }) as any
    const src = path.join(entry, '**/*.{js,jsx}')

    return gulp
      .src(src)
      .pipe(babel(babelrc))
      .pipe(gulp.dest(outputPath as string))
  }
}

export default buildModule
