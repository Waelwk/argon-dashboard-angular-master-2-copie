module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-jasmine-html-reporter')
    ],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    reporters: ['progress', 'kjhtml'],
    client: {
      clearContext: false
    },
    browserDisconnectTimeout: 10000,  // Temps d'attente avant de déconnecter un navigateur
    browserNoActivityTimeout: 30000,  // Délai avant de déconnecter si aucune activité
    captureTimeout: 120000  // Délai d'attente pour capturer le navigateur
  });
};
