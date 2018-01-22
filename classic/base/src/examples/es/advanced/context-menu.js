import $ from 'jquery';
import * as Site from 'Site';

$(document).ready(function($) {
  Site.run();
});

// Demo 1
// ------
(function() {
  $.contextMenu({
    selector: '#simpleContextMenu',
    // callback: function(key, options) {
    //   var m = "clicked: " + key;
    //   window.console && console.log(m) || alert(m);
    // },
    items: {
      "edit": {
        name: "Edit",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-edit';
        }
      },
      "cut": {
        name: "Cut",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-scissor';
        }
      },
      "copy": {
        name: "Copy",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-copy';
        }
      },
      "paste": {
        name: "Paste",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-clipboard';
        }
      },
      "delete": {
        name: "Delete",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-close';
        }
      },
      "sep1": "---------",
      "share": {
        name: "Share",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-share';
        }
      }
    }
  });
})();

// Demo 2
// ------
(function() {
  $.contextMenu({
    selector: '.contextMenu-example2 > span',
    // callback: function(key, options) {
    //   var m = "clicked: " + key;
    //   window.console && console.log(m) || alert(m);
    // },
    items: {
      "edit": {
        name: "Edit",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-edit';
        }
      },
      "cut": {
        name: "Cut",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-scissor';
        }
      },
      "copy": {
        name: "Copy",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-copy';
        }
      },
      "paste": {
        name: "Paste",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-clipboard';
        }
      },
      "delete": {
        name: "Delete",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-close';
        }
      },
      "sep1": "---------",
      "share": {
        name: "Share",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-share';
        }
      }
    }
  });
})();

// Demo 3
// ------
(function() {
  $.contextMenu({
    selector: '.contextMenu-example3',
    callback: function(key, options) {
      var m = "clicked: " + key;
      window.console && console.log(m) || alert(m);
    },
    items: {
      "edit": {
        name: "Edit",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-edit';
        }
      },
      "cut": {
        name: "Cut",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-scissor';
        }
      },
      "copy": {
        name: "Copy",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-copy';
        }
      },
      "paste": {
        name: "Paste",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-clipboard';
        }
      },
      "delete": {
        name: "Delete",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-close';
        }
      },
      "sep1": "---------",
      "share": {
        name: "Share",
        icon: function() {
          return 'context-menu-icon context-menu-extend-icon wb-share';
        }
      }
    }
  });
})();

// // Demo 4
// // ------
// (function() {
//   $.contextMenu({
//     selector: '.contextMenu-example4',
//     // callback: function(key, options) {
//     //   var m = "clicked: " + key;
//     //   window.console && console.log(m) || alert(m);
//     // },
//     items: {
//       "edit": {
//         name: "Edit",
//         icon: "wb-edit"
//       },
//       "copy": {
//         name: "Copy",
//         icon: "wb-copy"
//       }
//     }
//   });
// })();

// // Demo 5
// // ------
// (function() {
//   $.contextMenu({
//     selector: '.contextMenu-example5',
//     // callback: function(key, options) {
//     //   var m = "clicked: " + key;
//     //   window.console && console.log(m) || alert(m);
//     // },
//     items: {
//       "edit": {
//         name: "Edit",
//         icon: "fa-edit"
//       },
//       "cut": {
//         name: "Cut",
//         icon: "fa-cut"
//       }
//     }
//   });
// })();
