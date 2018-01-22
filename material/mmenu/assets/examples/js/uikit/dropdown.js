(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/uikit/dropdown', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.uikitDropdown = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();

    Waves.attach('.dropdown-menu:not([class*="dropdown-menu-"]) .dropdown-item', ['waves-classic']);
    Waves.attach('[class*="dropdown-menu-"]:not(.dropdown-menu-right):not(.dropdown-menu-left) .dropdown-item', ['waves-light']);
    Waves.attach('.dropdown-menu-right .dropdown-item', ['waves-classic']);
    Waves.attach('.dropdown-menu-left .dropdown-item', ['waves-classic']);
  });

  (0, _jquery2.default)(".example-dropdown-js select").dropdown();
});