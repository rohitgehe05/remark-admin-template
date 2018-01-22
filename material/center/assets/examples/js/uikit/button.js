(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/uikit/button', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.uikitButton = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();

    Waves.attach('.page-content .btn-flat');
    Waves.attach('.page-content .btn-round', ['waves-round', 'waves-light']);
    Waves.attach('.page-content .btn-pure', ['waves-circle', 'waves-classic']);
    Waves.attach('.page-content .btn-floating', ['waves-float', 'waves-light']);
  });
});