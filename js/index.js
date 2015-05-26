require.config({
  baseUrl: '//rawgit.com/dbkaplun/jsonresume-theme-timeline-fixed/master/bower_components',
  paths: {
    modernizr: 'modernizr/modernizr',
    jquery: 'jquery/dist/jquery',
    bootstrap: 'bootstrap/dist/js/bootstrap',
    'bootstrap-progressbar': 'bootstrap-progressbar/bootstrap-progressbar',
    easypie: 'easypie/dist/jquery.easypiechart',

    theme: '../js',
  },
  shim: {
    bootstrap: ['jquery'],
    'bootstrap-progressbar': ['bootstrap'],
  }
});

require([
  'modernizr',

  'theme/chart',
  'theme/scripts',
  'theme/spy',
]);
