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

    this.api = this.$el.asScrollable({
      namespace: 'scrollable',
      skin: 'scrollable-inverse',
      direction: 'vertical',
      contentSelector: '>',
      containerSelector: '>'
    }).data('asScrollable');
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

export default class extends Component {
  constructor(...props) {
    super(...props);

    this.$menuBody = this.$el.children('.site-menubar-body');
    this.$menu = this.$el.find('[data-plugin=menu]');

    if (this.$menuBody.length > 0) {
      this.initialized = true;
    } else {
      this.initialized = false;
      return;
    }
    this.scrollable = new Scrollable(this.$menuBody);

    if ($BODY.hasClass('site-menubar-fold')) {
      this.isFold = true;
    } else {
      this.isFold = false;
    }

    if (!this.isFold) {
      this.bindHover();
    }

    $HTML.removeClass('css-menubar').addClass('js-menubar');


    // states
    this.type = 'hide' // open, hide;

    this.change(this.type);
  }

  process() {
    super.process();

    if (!this.isFold) {
      this.bindHover();
    }
  }

  bindHover() {
    this.$el.on('mouseenter', () => {
      if ($BODY.hasClass('site-menubar-fixed') || $BODY.hasClass('site-menubar-disable-hover') || $BODY.hasClass('site-menubar-changing')) {
        return;
      }

      this.change('open');
    }).on('mouseleave', () => {
      if ($BODY.hasClass('site-menubar-fixed') || $BODY.hasClass('site-menubar-disable-hover')) {
        return;
      }

      this.change('hide');
    });
  }

  setMenuData() {
    let api = this.getMenuApi();

    api.folded = !(this.type === 'open') && this.isFold;
    api.foldAlt = false;
    api.outerHeight = this.$el.outerHeight();
  }

  getMenuApi() {
    return this.$menu.data('menuApi');
  }

  update() {
    this.scrollable.update();
  }

  change(type) {
    if (this.initialized) {
      this.reset();
      this[type]();
      this.setMenuData();
    }

    this.type = type;
  }

  animate(doing, callback = function() {}) {
    $BODY.addClass('site-menubar-changing');

    setTimeout(() => {
      doing.call(this);
      this.$el.trigger('changing.site.menubar');
      let menuApi = this.getMenuApi();
      if (menuApi) {
        menuApi.refresh();
      }
    }, 10);

    setTimeout(() => {
      callback.call(this);
      $BODY.removeClass('site-menubar-changing');
      this.update();
      this.$el.trigger('changed.site.menubar');
    }, 250);
  }

  reset() {
    $BODY.removeClass('site-menubar-hide site-menubar-open');
  }

  open() {
    this.animate(() => {
      $BODY.addClass('site-menubar-open');
    }, function() {
      this.scrollable.enable();
      this.triggerResize();
    });
    this.type = 'open';
  }

  hide() {
    this.scrollable.disable();
    this.animate(() => {
      $BODY.addClass('site-menubar-hide');
    }, function() {
      this.triggerResize();
    });
  }
  update() {
    this.scrollable.update();
  }
}
