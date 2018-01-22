(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/advanced/context-menu', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.advancedContextMenu = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // Demo 1
  // ------
  (function () {
    _jquery2.default.contextMenu({
      selector: '#simpleContextMenu',
      // callback: function(key, options) {
      //   var m = "clicked: " + key;
      //   window.console && console.log(m) || alert(m);
      // },
      items: {
        "edit": {
          name: "Edit",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-edit';
          }
        },
        "cut": {
          name: "Cut",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-scissors';
          }
        },
        "copy": {
          name: "Copy",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-copy';
          }
        },
        "paste": {
          name: "Paste",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-collection-item';
          }
        },
        "delete": {
          name: "Delete",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-delete';
          }
        },
        "sep1": "---------",
        "share": {
          name: "Share",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-share';
          }
        }
      }
    });
  })();

  // Demo 2
  // ------
  (function () {
    _jquery2.default.contextMenu({
      selector: '.contextMenu-example2 > span',
      // callback: function(key, options) {
      //   var m = "clicked: " + key;
      //   window.console && console.log(m) || alert(m);
      // },
      items: {
        "edit": {
          name: "Edit",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-edit';
          }
        },
        "cut": {
          name: "Cut",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-scissors';
          }
        },
        "copy": {
          name: "Copy",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-copy';
          }
        },
        "paste": {
          name: "Paste",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-collection-item';
          }
        },
        "delete": {
          name: "Delete",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-delete';
          }
        },
        "sep1": "---------",
        "share": {
          name: "Share",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-share';
          }
        }
      }
    });
  })();

  // Demo 3
  // ------
  (function () {
    _jquery2.default.contextMenu({
      selector: '.contextMenu-example3',
      callback: function callback(key, options) {
        var m = "clicked: " + key;
        window.console && console.log(m) || alert(m);
      },
      items: {
        "edit": {
          name: "Edit",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-edit';
          }
        },
        "cut": {
          name: "Cut",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-scissors';
          }
        },
        "copy": {
          name: "Copy",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-copy';
          }
        },
        "paste": {
          name: "Paste",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-collection-item';
          }
        },
        "delete": {
          name: "Delete",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-delete';
          }
        },
        "sep1": "---------",
        "share": {
          name: "Share",
          icon: function icon() {
            return 'context-menu-icon context-menu-extend-icon md-share';
          }
        }
      }
    });
  })();
});