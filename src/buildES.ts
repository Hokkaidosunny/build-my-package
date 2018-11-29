import gulp from 'gulp'
import babel from 'gulp-babel'
import path from 'path'
import createBabelConfig from './createBabelConfig'

const ctx = process.cwd()

const outputPath = path.join(ctx, './es')

function buildES(cusConfig: any) {
  const { entry } = cusConfig

  const babelrc = createBabelConfig({ commonjs: false }) as any

  const src = path.join(entry, '**/*.js')

  return gulp
    .src(src)
    .pipe(babel(babelrc))
    .pipe(gulp.dest(outputPath))
}

export default buildES
