module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],
    files: [
      './dist/tests.js'
    ],
    exclude: [],
    // preprocessors: {
    //   './(src|test)/*.js': [
    //     'webpack'
    //   ]
    // },
    // // webpack configuration
    // webpack: require('./webpack.config.js'),
    // webpackMiddleware: {
    //   stats: 'errors-only'
    // },
    reporters: [
      'progress'
    ],
    browsers: [
      'Chrome',
      'Safari',
      'Firefox'
    ],
    singleRun: true
  });
};
