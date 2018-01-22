// (function(document, window, $) {
//   'use strict';

//   var Site = window.Site;

//   $(document).ready(function($) {
//     Site.run();

//     hljs.initHighlighting();
//   });

//

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("/advanced/highlight", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.advancedHighlight = mod.exports;
  }
})(this, function () {
  "use strict";
});