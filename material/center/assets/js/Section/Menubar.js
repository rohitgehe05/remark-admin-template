(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Section/Menubar', ['exports', 'jquery', 'Component'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('Component'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.Component);
    global.SectionMenubar = mod.exports;
  }
})(this, function (exports, _jquery, _Component2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _Component3 = babelHelpers.interopRequireDefault(_Component2);

  var $BODY = (0, _jquery2.default)('body');
  var $HTML = (0, _jquery2.default)('html');

  var Scrollable = function () {
    function Scrollable($el) {
      babelHelpers.classCallCheck(this, Scrollable);

      this.$el = $el;
      this.native = false;
      this.api = null;

      this.init();
    }

    babelHelpers.createClass(Scrollable, [{
      key: 'init',
      value: function init() {
        if ($BODY.is('.site-menubar-native')) {
          this.native = true;
          return;
        }

        this.api = this.$el.asScrollable({
          namespace: 'scrollable',
          skin: 'scrollable-inverse',
          direction: 'vertical',
          contentSelector: '>',
          containerSelector: '>'
        }).data('asScrollable');
      }
    }, {
      key: 'update',
      value: function update() {
        if (this.api) {
          this.api.update();
        }
      }
    }, {
      key: 'enable',
      value: function enable() {
        if (this.native) {
          return;
        }
        if (!this.api) {
          this.init();
        }
        if (this.api) {
          this.api.enable();
        }
      }
    }, {
      key: 'disable',
      value: function disable() {
        if (this.api) {
          this.api.disable();
        }
      }
    }]);
    return Scrollable;
  }();

  var Menubar = function (_Component) {
    babelHelpers.inherits(Menubar, _Component);

    function Menubar() {
      var _ref;

      babelHelpers.classCallCheck(this, Menubar);

      for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
        props[_key] = arguments[_key];
      }

      var _this = babelHelpers.possibleConstructorReturn(this, (_ref = Menubar.__proto__ || Object.getPrototypeOf(Menubar)).call.apply(_ref, [this].concat(props)));

      _this.$menuBody = _this.$el.children('.site-menubar-body');
      _this.$menu = _this.$el.find('[data-plugin=menu]');

      if (_this.$menuBody.length > 0) {
        _this.initialized = true;
      } else {
        _this.initialized = false;
        return babelHelpers.possibleConstructorReturn(_this);
      }
      _this.scrollable = new Scrollable(_this.$menuBody);

      if ($BODY.hasClass('site-menubar-fold')) {
        _this.isFold = true;
      } else {
        _this.isFold = false;
      }

      if (!_this.isFold) {
        _this.bindHover();
      }

      $HTML.removeClass('css-menubar').addClass('js-menubar');

      // states
      _this.type = 'hide'; // open, hide;

      _this.change(_this.type);
      return _this;
    }

    babelHelpers.createClass(Menubar, [{
      key: 'process',
      value: function process() {
        babelHelpers.get(Menubar.prototype.__proto__ || Object.getPrototypeOf(Menubar.prototype), 'process', this).call(this);

        if (!this.isFold) {
          this.bindHover();
        }
      }
    }, {
      key: 'bindHover',
      value: function bindHover() {
        var _this2 = this;

        this.$el.on('mouseenter', function () {
          if ($BODY.hasClass('site-menubar-fixed') || $BODY.hasClass('site-menubar-disable-hover') || $BODY.hasClass('site-menubar-changing')) {
            return;
          }

          _this2.change('open');
        }).on('mouseleave', function () {
          if ($BODY.hasClass('site-menubar-fixed') || $BODY.hasClass('site-menubar-disable-hover')) {
            return;
          }

          _this2.change('hide');
        });
      }
    }, {
      key: 'setMenuData',
      value: function setMenuData() {
        var api = this.getMenuApi();

        api.folded = !(this.type === 'open') && this.isFold;
        api.foldAlt = false;
        api.outerHeight = this.$el.outerHeight();
      }
    }, {
      key: 'getMenuApi',
      value: function getMenuApi() {
        return this.$menu.data('menuApi');
      }
    }, {
      key: 'update',
      value: function update() {
        this.scrollable.update();
      }
    }, {
      key: 'change',
      value: function change(type) {
        if (this.initialized) {
          this.reset();
          this[type]();
          this.setMenuData();
        }

        this.type = type;
      }
    }, {
      key: 'animate',
      value: function animate(doing) {
        var _this3 = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        $BODY.addClass('site-menubar-changing');

        setTimeout(function () {
          doing.call(_this3);
          _this3.$el.trigger('changing.site.menubar');
          var menuApi = _this3.getMenuApi();
          if (menuApi) {
            menuApi.refresh();
          }
        }, 10);

        setTimeout(function () {
          callback.call(_this3);
          $BODY.removeClass('site-menubar-changing');
          _this3.update();
          _this3.$el.trigger('changed.site.menubar');
        }, 250);
      }
    }, {
      key: 'reset',
      value: function reset() {
        $BODY.removeClass('site-menubar-hide site-menubar-open');
      }
    }, {
      key: 'open',
      value: function open() {
        this.animate(function () {
          $BODY.addClass('site-menubar-open');
        }, function () {
          this.scrollable.enable();
          this.triggerResize();
        });
        this.type = 'open';
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.scrollable.disable();
        this.animate(function () {
          $BODY.addClass('site-menubar-hide');
        }, function () {
          this.triggerResize();
        });
      }
    }, {
      key: 'update',
      value: function update() {
        this.scrollable.update();
      }
    }]);
    return Menubar;
  }(_Component3.default);

  exports.default = Menubar;
});