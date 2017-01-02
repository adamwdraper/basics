module.exports = {
  entry: {
    tests: './src/tests.js',
    router: './src/router.js'
  },
  output: {
    filename: '[name].js',
    path: './dist'
  }
};
