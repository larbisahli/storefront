module.exports = {
  presets: [require('@dropgala/luma/tailwind')],
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './containers/**/*.tsx',
    // Add the external packages that are using Tailwind CSS
    './node_modules/@dropgala/luma/**/*.js'
  ]
}
