#!/usr/bin/env node
import getopts from 'getopts'
import { bmp } from '.'

const args = process.argv.slice(2)

const opts = getopts(args, {
  alias: {
    w: 'watch',
    l: 'language',
    m: 'module',
    h: 'help'
  }
})

function run() {
  if (!opts._[0] || opts.h) {
    console.log(`
    Syntax: bmp [entry] [options]

    Example: bmp src -l typescript -w

    Options:
      -h, --help
      -w, --watch
      -m, --module
      -l, --language
    `)
    return
  }

  const config = {
    entry: opts._[0],
    language: opts.l || 'javascript',
    module: opts.m || 'commonjs',
    watch: opts.w || false,
    mode: undefined
  }

  bmp(config)
}

run()
