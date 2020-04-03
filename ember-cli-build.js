'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { WatchedDir } = require('broccoli-source');
const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = function (defaults) {
  const options = {
    'ember-bootstrap': {
      bootstrapVersion: 4,
      importBootstrapCSS: false
    },
    sassOptions: {
      extension: 'sass'
    }
  };
  let app = new EmberApp(defaults, options);

  const optionsApp = new EmberApp(defaults, {
    ...options,
    trees: {
      app: new WatchedDir('app-options')
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return mergeTrees([
    funnel(app.toTree(), {
      destDir: 'sidebar',
      annotation: 'Funnel: sidebar output'
    }),
    funnel(optionsApp.toTree(), {
      destDir: 'options',
      annotation: 'Funnel: options output'
    }),
    'manifest'
  ]);
};
