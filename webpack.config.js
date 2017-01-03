module.exports = {
  entry: {
    ajax: './src/ajax.js',
    router: './src/router.js',
    tests: './src/tests.js'
  },
  output: {
    filename: '[name].js',
    path: './dist'
  }
};
