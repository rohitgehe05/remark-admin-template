(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/uikit/panel-structure', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.uikitPanelStructure = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // Example Button Random
  // ---------------------
  (function () {
    (0, _jquery2.default)('#exampleButtonRandom').on('click', function (e) {
      e.preventDefault();

      (0, _jquery2.default)('[data-plugin="progress"]').each(function () {
        var number = Math.round(Math.random(1) * 100) + '%';
        (0, _jquery2.default)(this).asProgress('go', number);
      });
    });
  })();

  // Example Panel With Tool
  // -----------------------
  window.customRefreshCallback = function (done) {
    var $panel = (0, _jquery2.default)(this);
    setTimeout(function () {
      done();
      $panel.find('.panel-body').html('Lorem ipsum In nostrud Excepteur velit reprehenderit quis consequat veniam officia nisi labore in est.');
    }, 1000);
  };
});