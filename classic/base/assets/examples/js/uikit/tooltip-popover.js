(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/uikit/tooltip-popover', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.uikitTooltipPopover = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // Example bootstrap v4b tooltip (popper.js)
  // -----------------------------------------
  (function () {
    (0, _jquery2.default)('[data-toggle="tooltip"]').tooltip();
  })();

  // Example bootstrap v4b popper.js
  // -------------------------------
  (function () {
    (0, _jquery2.default)('[data-toggle="popover"]').popover();
  })();

  (function () {
    (0, _jquery2.default)('.example-popover').popover({
      container: 'body'
    });
  })();

  // Example Webui Popover
  // =====================
  var defaults = Plugin.getDefaults("webuiPopover");

  // Example Webui Popover Pop with Table
  // ------------------------------------
  (function () {
    var tableContent = (0, _jquery2.default)('#examplePopoverTable').html(),
        tableSettings = {
      title: 'WebUI Popover',
      content: tableContent,
      width: 500
    };

    (0, _jquery2.default)('#examplePopWithTable').webuiPopover(_jquery2.default.extend({}, defaults, tableSettings));
  })();

  // Example Webui Popover Pop with List
  // -----------------------------------
  (function () {
    var listContent = (0, _jquery2.default)('#examplePopoverList').html(),
        listSettings = {
      content: listContent,
      title: '',
      padding: false
    };

    (0, _jquery2.default)('#examplePopWithList').webuiPopover(_jquery2.default.extend({}, defaults, listSettings));
  })();

  // Example Webui Popover Pop with Large Content
  // --------------------------------------------
  (function () {
    var largeContent = (0, _jquery2.default)('#examplePopoverLargeContent').html(),
        largeSettings = {
      title: 'WebUI Popover',
      content: largeContent,
      width: 400,
      height: 350,
      closeable: true
    };

    (0, _jquery2.default)('#examplePopWithLargeContent').webuiPopover(_jquery2.default.extend({}, defaults, largeSettings));
  })();
});