# build-my-package

Help you to build 3 types(UMD, Commonjs, ES Module) of module, support js and ts.

## Install

```shell
yarn add -D build-my-package
```

## Usage

```javascript
const buidMyPackage = require('build-my-package')
const path = require('path')

const { buildUMD, buildES, buildCommonjs } = buidMyPackage

buildUMD({
  entry: path.join(__dirname, './src/onEnter.js'),
  filename: 'onEnter.js'
})

buildES({
  entry: path.join(__dirname, './src')
})

buildCommonjs({
  entry: path.join(__dirname, './src')
})
```

## Options

### entry

- absolute path of entry file/dir

### outputPath

- absolute path of output dir

```shell
# outputpath
├── dist  # umd module
├── es    # es module
├── lib   # commonjs module
```

### mode

- webpack mode

### filename

- webpack output.filename
- filename of umd module file

### library

- webpack output.library
- library name of umd module file

### language

- 'typescript' | 'javascript' | undefined

### tsconfig

- gulp-typescript settings
- will be used only when `language = 'typescript'`

## Roadmap

- [x] support cjs
- [x] support es module
- [x] support umd
- [x] support ts
- [ ] watch file change
- [ ] custom output dir
- [ ] cli interface
