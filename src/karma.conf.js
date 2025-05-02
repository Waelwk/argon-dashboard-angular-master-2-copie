module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress', 'coverage'], // Include 'coverage' here
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      subdir: '.'
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
