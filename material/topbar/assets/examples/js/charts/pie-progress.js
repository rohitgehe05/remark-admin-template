(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/charts/pie-progress', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.chartsPieProgress = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // Example Api Methods
  // -------------------
  (function () {
    var $example = (0, _jquery2.default)('#examplePieApi');

    (0, _jquery2.default)('.pie-api-start').on('click', function () {
      $example.asPieProgress('start');
    });
    (0, _jquery2.default)('.pie-api-finish').on('click', function () {
      $example.asPieProgress('finish');
    });
    (0, _jquery2.default)('.pie-api-go').on('click', function () {
      $example.asPieProgress('go', 200);
    });
    (0, _jquery2.default)('.pie-api-go_percentage').on('click', function () {
      $example.asPieProgress('go', '50%');
    });
    (0, _jquery2.default)('.pie-api-stop').on('click', function () {
      $example.asPieProgress('stop');
    });
    (0, _jquery2.default)('.pie-api-reset').on('click', function () {
      $example.asPieProgress('reset');
    });
  })();
});