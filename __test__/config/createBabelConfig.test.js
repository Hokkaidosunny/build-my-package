const cbc = require('../../lib/config/createBabelConfig').default

test('create babel defalut config', () => {
  const { presets, plugins } = cbc({
    commonjs: false,
    runtime: false
  })

  expect(presets.length).toBe(2)
  expect(plugins.length).toBe(1)
})

test('create babel config runtime', () => {
  const { presets, plugins } = cbc({
    commonjs: false,
    runtime: true
  })

  expect(presets.length).toBe(2)
  expect(plugins.length).toBe(2)
})
