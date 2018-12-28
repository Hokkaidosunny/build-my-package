import chokidar from 'chokidar'
import { CusConfig } from '..'
import ora from 'ora'
import _ from 'lodash'

function withWatch(fn: any) {
  async function build(config: CusConfig) {
    const { watch, entry } = config

    if (watch) {
      const listener = _.debounce(async () => {
        const spinner = ora().start('start build')
        await fn(config)
        spinner.succeed('build success')
      }, 500)

      chokidar.watch(entry).on('all', listener)
    } else {
      const spinner = ora().start('start build')
      await fn(config)
      spinner.succeed('build success')
    }
  }

  return build
}

export default withWatch
