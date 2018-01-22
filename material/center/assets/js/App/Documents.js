(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/App/Documents', ['exports', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Site);
    global.AppDocuments = mod.exports;
  }
})(this, function (exports, _Site2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getInstance = exports.run = exports.AppDocuments = undefined;

  var _Site3 = babelHelpers.interopRequireDefault(_Site2);

  var AppDocuments = function (_Site) {
    babelHelpers.inherits(AppDocuments, _Site);

    function AppDocuments() {
      babelHelpers.classCallCheck(this, AppDocuments);
      return babelHelpers.possibleConstructorReturn(this, (AppDocuments.__proto__ || Object.getPrototypeOf(AppDocuments)).apply(this, arguments));
    }

    babelHelpers.createClass(AppDocuments, [{
      key: 'initialize',
      value: function initialize() {
        babelHelpers.get(AppDocuments.prototype.__proto__ || Object.getPrototypeOf(AppDocuments.prototype), 'initialize', this).call(this);

        this.scrollHandle();
        this.stickyfillHandle();
      }
    }, {
      key: 'process',
      value: function process() {
        babelHelpers.get(AppDocuments.prototype.__proto__ || Object.getPrototypeOf(AppDocuments.prototype), 'process', this).call(this);

        this.handleResize();
      }
    }, {
      key: 'scrollHandle',
      value: function scrollHandle() {
        $('body').scrollspy({
          target: '#articleSticky',
          offset: 80
        });
      }
    }, {
      key: 'stickyfillHandle',
      value: function stickyfillHandle() {
        if (!window.Stickyfill) {
          return false;
        }
        Stickyfill.add($('#articleSticky'));
        // $('#articleSticky').Stickyfill();
      }
    }, {
      key: 'handleResize',
      value: function handleResize() {
        $(window).on('resize orientationchange', function () {
          $(this).width() > 767 ? Stickyfill.refreshAll() : Stickyfill.removeAll();
        }).resize();
      }
    }]);
    return AppDocuments;
  }(_Site3.default);

  var instance = null;

  function getInstance() {
    if (!instance) {
      instance = new AppDocuments();
    }

    return instance;
  }

  function run() {
    var app = getInstance();
    app.run();
  }

  exports.AppDocuments = AppDocuments;
  exports.run = run;
  exports.getInstance = getInstance;
  exports.default = AppDocuments;
});