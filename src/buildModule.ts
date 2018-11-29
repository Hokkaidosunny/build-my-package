import gulp from 'gulp'
import babel from 'gulp-babel'
import path from 'path'
import createBabelConfig from './createBabelConfig'

interface Option {
  entry: string
  outputPath: string
  commonjs: boolean
}

function buildModule({ entry, outputPath, commonjs }: Option) {
  const babelrc = createBabelConfig({ commonjs }) as any

  const src = path.join(entry, '**/*.(js,jsx)')

  return gulp
    .src(src)
    .pipe(babel(babelrc))
    .pipe(gulp.dest(outputPath))
}

export default buildModule
