# build-my-package

Help you to build 3 types(UMD, Commonjs, ES Module) of module, support js and ts.

## Install

```shell
yarn add -D build-my-package
```

## Usage

```javascript
const { buildUMD, buildES, buildCommonjs } = require('build-my-package')
const path = require('path')

buildUMD({
  entry: path.join(__dirname, './src/onEnter.js'),
  filename: 'onEnter.js'
})

buildCommonjs({
  entry: path.join(__dirname, './src')
})
```

## Options

### entry

- absolute path of entry file/dir

### module?

- 'es module' | 'commonjs' | 'umd'

### outputPath?

- absolute path of output dir

```shell
# default outputpath
├── dist  # umd module
├── es    # es module
├── lib   # commonjs module
```

### mode?

- default 'production'
- webpack mode

### filename?

- webpack output.filename
- filename of umd module file

### library?

- webpack output.library
- library name of umd module file

### language?

- default 'javascript'
- 'typescript' | 'javascript' | undefined

### tsconfig?

- gulp-typescript settings
- will be used only when `language = 'typescript'`

### watch?

- default false
- webpack watch

## Roadmap

- [x] support cjs
- [x] support es module
- [x] support umd
- [x] support ts
- [x] custom ts config
- [x] support watch
- [ ] custom babel config
- [ ] cli interface
