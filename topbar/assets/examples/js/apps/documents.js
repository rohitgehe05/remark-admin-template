(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/apps/documents', ['jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery);
    global.appsDocuments = mod.exports;
  }
})(this, function (_jquery) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  // (function(document, window, $) {
  //   'use strict';
  //   window.AppDocuments = App.extend({
  //     scrollHandle: function() {
  //       $('body').scrollspy({
  //         target: '#articleSticky',
  //         offset: 80
  //       });
  //     },
  //     run: function(next) {
  //       this.scrollHandle();
  //
  //       next();
  //     }
  //   });
  //
  //   $(document).ready(function() {
  //     AppDocuments.run();
  //     $('#articleSticky').Stickyfill();
  //
  //     $(window).on('resize orientationchange', function() {
  //       if ($(this).width() > 767) {
  //         Stickyfill.init();
  //       } else {
  //         Stickyfill.stop();
  //       }
  //     }).resize();
  //   });
  // 

  (0, _jquery2.default)(document).ready(function () {
    AppDocuments.run();
  });
});