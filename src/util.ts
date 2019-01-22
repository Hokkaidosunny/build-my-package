export const getRuntime = (runtime?: boolean) => {
  const _runtime = typeof runtime !== 'undefined' ? runtime : false

  if (runtime) {
    console.log(`
      runtime = true,
      that means you should add 'tslib' in your ts object dependencies,
      or '@babel/plugin-transform-runtime' in your js object dependencies
    `)
  }

  return _runtime
}
