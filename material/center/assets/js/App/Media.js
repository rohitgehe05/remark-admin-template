(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/App/Media', ['exports', 'BaseApp'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('BaseApp'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.BaseApp);
    global.AppMedia = mod.exports;
  }
})(this, function (exports, _BaseApp2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getInstance = exports.run = exports.AppMedia = undefined;

  var _BaseApp3 = babelHelpers.interopRequireDefault(_BaseApp2);

  var AppMedia = function (_BaseApp) {
    babelHelpers.inherits(AppMedia, _BaseApp);

    function AppMedia() {
      babelHelpers.classCallCheck(this, AppMedia);
      return babelHelpers.possibleConstructorReturn(this, (AppMedia.__proto__ || Object.getPrototypeOf(AppMedia)).apply(this, arguments));
    }

    babelHelpers.createClass(AppMedia, [{
      key: 'initialize',
      value: function initialize() {
        babelHelpers.get(AppMedia.prototype.__proto__ || Object.getPrototypeOf(AppMedia.prototype), 'initialize', this).call(this);

        this.$arrGrid = $('#arrangement-grid');
        this.$arrList = $('#arrangement-list');
        this.$actionBtn = $('.site-action');
        this.$actionToggleBtn = this.$actionBtn.find('.site-action-toggle');
        this.$content = $('#mediaContent');
        this.$fileupload = $('#fileupload');

        // states
        this.states = {
          list: false,
          checked: false
        };
      }
    }, {
      key: 'process',
      value: function process() {
        babelHelpers.get(AppMedia.prototype.__proto__ || Object.getPrototypeOf(AppMedia.prototype), 'process', this).call(this);

        this.steupArrangement();
        this.setupActionBtn();
        this.bindListChecked();
        this.bindAction();
        this.bindDropdownAction();
      }
    }, {
      key: 'list',
      value: function list(active) {
        if (active) {
          this.$arrGrid.removeClass('active');
          this.$arrList.addClass('active');
          $('.media-list').removeClass('is-grid').addClass('is-list');
          $('.media-list>ul>li').removeClass('animation-scale-up').addClass('animation-fade');
        } else {
          this.$arrList.removeClass('active');
          this.$arrGrid.addClass('active');
          $('.media-list').removeClass('is-list').addClass('is-grid');
          $('.media-list>ul>li').removeClass('animation-fade').addClass('animation-scale-up');
        }

        this.states.list = active;
      }
    }, {
      key: 'checked',
      value: function checked(_checked) {
        var api = this.$actionBtn.actionBtn().data('actionBtn');
        if (_checked) {
          api.show();
        } else {
          api.hide();
        }

        this.states.checked = _checked;
      }
    }, {
      key: 'steupArrangement',
      value: function steupArrangement() {
        var self = this;
        this.$arrGrid.on('click', function () {
          if ($(this).hasClass('active')) {
            return;
          }

          self.list(false);
        });
        this.$arrList.on('click', function () {
          if ($(this).hasClass('active')) {
            return;
          }

          self.list(true);
        });
      }
    }, {
      key: 'setupActionBtn',
      value: function setupActionBtn() {
        var _this2 = this;

        this.$actionToggleBtn.on('click', function (e) {
          if (!_this2.states.checked) {
            _this2.$fileupload.trigger('click');
            e.stopPropagation();
          }
        });
      }
    }, {
      key: 'bindListChecked',
      value: function bindListChecked() {
        var _this3 = this;

        this.$content.on('asSelectable::change', function (e, api, checked) {
          _this3.checked(checked);
        });
      }
    }, {
      key: 'bindDropdownAction',
      value: function bindDropdownAction() {
        $('.info-wrap>.dropdown').on('show.bs.dropdown', function () {
          $(this).closest('.media-item').toggleClass('item-active');
        }).on('hidden.bs.dropdown', function () {
          $(this).closest('.media-item').toggleClass('item-active');
        });

        $('.info-wrap .dropdown-menu').on('`click', function (e) {
          e.stopPropagation();
        });
      }
    }, {
      key: 'bindAction',
      value: function bindAction() {
        $('[data-action="trash"]', '.site-action').on('click', function () {
          console.log('trash');
        });

        $('[data-action="download"]', '.site-action').on('click', function () {
          console.log('download');
        });
      }
    }]);
    return AppMedia;
  }(_BaseApp3.default);

  var instance = null;

  function getInstance() {
    if (!instance) {
      instance = new AppMedia();
    }
    return instance;
  }

  function run() {
    var app = getInstance();
    app.run();
  }

  exports.AppMedia = AppMedia;
  exports.run = run;
  exports.getInstance = getInstance;
  exports.default = AppMedia;
});