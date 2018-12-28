import chokidar from 'chokidar'
import { CusConfig } from '..'

function withWatch(fn: any) {
  return function(config: CusConfig) {
    const { watch, entry } = config

    if (watch) {
      chokidar.watch(entry).on('all', () => {
        fn(config)
      })
    } else {
      fn(config)
    }
  }
}

export default withWatch
