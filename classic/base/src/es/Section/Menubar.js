import $ from 'jquery';
import Component from 'Component';

const $BODY = $('body');
const $HTML = $('html');

class Scrollable {
  constructor($el) {
    this.$el = $el;
    this.native = false;
    this.api = null;

    this.init();
  }

  init() {
    if ($BODY.is('.site-menubar-native')) {
      this.native = true;
      return;
    }

    this.api = this
      .$el
      .asScrollable({
        namespace: 'scrollable',
        skin: 'scrollable-inverse',
        direction: 'vertical',
        contentSelector: '>',
        containerSelector: '>',
      })
      .data('asScrollable');
  }

  update() {
    if (this.api) {
      this.api.update();
    }
  }

  enable() {
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

  disable() {
    if (this.api) {
      this.api.disable();
    }
  }
}

class Hoverscroll {
  constructor($el) {
    this.$el = $el;
    this.api = null;

    this.init();
  }

  init() {
    this.api = this
      .$el
      .asHoverScroll({
        namespace: 'hoverscorll',
        direction: 'vertical',
        list: '.site-menu',
        item: '> li',
        exception: '.site-menu-sub',
        fixed: false,
        boundary: 100,
        onEnter() {
          // $(this).siblings().removeClass('hover'); $(this).addClass('hover');
        },
        onLeave() {
          // $(this).removeClass('hover');
        },
      })
      .data('asHoverScroll');
  }

  update() {
    if (this.api) {
      this
        .api
        .update();
    }
  }

  enable() {
    if (!this.api) {
      this.init();
    }
    if (this.api) {
      this
        .api
        .enable();
    }
  }

  disable() {
    if (this.api) {
      this
        .api
        .disable();
    }
  }
}

export default class extends Component {
  constructor(...args) {
    super(...args);

    this.top = false;
    this.folded = false;
    this.foldAlt = false;
    this.$menuBody = this.$el.children('.site-menubar-body');
    this.$menu = this.$el.find('[data-plugin=menu]');

    if ($BODY.data('autoMenubar') === false || $BODY.is('.site-menubar-keep')) {
      if ($BODY.hasClass('site-menubar-fold')) {
        this.auto = 'fold';
      } else if ($BODY.hasClass('site-menubar-unfold')) {
        this.auto = 'unfold';
      }
    } else {
      this.auto = true;
    }

    let breakpoint = Breakpoints.current();
    if (this.auto === true) {
      if (breakpoint) {
        switch (breakpoint.name) {
          case 'lg':
            this.type = 'unfold';
            break;
          case 'md':
          case 'sm':
            this.type = 'fold';
            break;
          case 'xs':
            this.type = 'hide';
            break;
        }
      }
    } else {
      switch (this.auto) {
        case 'fold':
          if (breakpoint.name == 'xs') {
            this.type = 'hide';
          } else {
            this.type = 'fold';
          }
          break;
        case 'unfold':
          if (breakpoint.name == 'xs') {
            this.type = 'hide';
          } else {
            this.type = 'unfold';
          }
          break;
      }
    }
  }

  initialize() {
    if (this.$menuBody.length > 0) {
      this.initialized = true;
    } else {
      this.initialized = false;
      return;
    }

    this.scrollable = new Scrollable(this.$menuBody);
    this.hoverscroll = new Hoverscroll(this.$menuBody);

    $HTML.removeClass('css-menubar').addClass('js-menubar');

    if ($BODY.is('.site-menubar-top')) {
      this.top = true;
    }

    if ($BODY.is('.site-menubar-fold-alt')) {
      this.foldAlt = true;
    }

    this.change(this.type);
  }

  process() {
    $('.site-menu-sub').on('touchstart', function(e) {
      e.stopPropagation();
    }).on('ponitstart', function(e) {
      e.stopPropagation();
    });
  }

  getMenuApi() {
    return this.$menu.data('menuApi');
  }

  setMenuData() {
    let api = this.getMenuApi();

    if (api) {
      api.folded = this.folded;
      api.foldAlt = this.foldAlt;
      api.outerHeight = this.$el.outerHeight();
    }
  }

  update() {
    this.scrollable.update();
    this.hoverscroll.update();
  }

  change(type) {
    if (this.initialized) {
      this.reset();
      this[type]();
      this.setMenuData();
    }
  }

  animate(doing, callback = function() {}) {
    $BODY.addClass('site-menubar-changing');

    doing.call(this);

    this.$el.trigger('changing.site.menubar');

    let menuApi = this.getMenuApi();
    if (menuApi) {
      menuApi.refresh();
    }

    setTimeout(() => {
      callback.call(this);
      $BODY.removeClass('site-menubar-changing');
      this.update();
      this.$el.trigger('changed.site.menubar');
    }, 500);
  }

  reset() {
    $BODY.removeClass('site-menubar-hide site-menubar-open site-menubar-fold site-menubar-unfold');
    $HTML.removeClass('disable-scrolling');
  }

  open() {
    this.animate(() => {
      $BODY.addClass('site-menubar-open site-menubar-unfold');

      $HTML.addClass('disable-scrolling');
    }, function() {
      this.scrollable.enable();
    });

    this.type = 'open';
  }

  hide() {
    this.hoverscroll.disable();

    this.animate(() => {
      $BODY.addClass('site-menubar-hide site-menubar-unfold');
    }, function() {
      this.scrollable.enable();
    });

    this.type = 'hide';
  }

  unfold() {
    this.hoverscroll.disable();

    this.animate(function() {
      $BODY.addClass('site-menubar-unfold');
      this.folded = false;
    }, function() {
      this.scrollable.enable();

      this.triggerResize();
    });

    this.type = 'unfold';
  }

  fold() {
    this.scrollable.disable();

    this.animate(function() {
      $BODY.addClass('site-menubar-fold');
      this.folded = true;
    }, function() {
      this.hoverscroll.enable();

      this.triggerResize();
    });

    this.type = 'fold';
  }
}
