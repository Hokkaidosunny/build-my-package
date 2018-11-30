# build-my-package

Help you to build 3 types of module

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
  // ts support
  // language: 'typescript'
})
```

## CusConfig

```javascript
interface CusConfig {
  entry: string
  outputPath?: string
  filename?: string
  mode: 'development' | 'production' | 'none' | undefined
  language: string
  tsconfig?: any
}
```
