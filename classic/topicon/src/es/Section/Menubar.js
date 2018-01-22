import $ from 'jquery';
import Component from 'Component';

const $BODY = $('body');
const $HTML = $('html');

class Scrollable {
  constructor($el) {
    this.$el = $el;
    this.native = false;
    this.api = null;
  }

  init() {
    if ($BODY.is('.site-menubar-native')) {
      this.native = true;
      return;
    }

    if (!this.api) {
      this.api = this.$el.asScrollable({
        namespace: 'scrollable',
        skin: 'scrollable-inverse',
        direction: 'vertical',
        contentSelector: '>',
        containerSelector: '>'
      }).data('asScrollable');
    }
  }

  destroy() {
    if (this.api) {
      this.api.destroy();
      this.api = null;
    }
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
  constructor(...args) {
    super(...args);

    this.$menuBody = this.$el.children('.site-menubar-body');
    this.$menu = this.$el.find('[data-plugin=menu]');

    this.type = 'hide'; // open, hide;
  }

  initialize() {
    if (this.$menuBody.length > 0) {
      this.initialized = true;
    } else {
      this.initialized = false;
      return;
    }

    this.scrollable = new Scrollable(this.$menuBody);

    $HTML.removeClass('css-menubar').addClass('js-menubar');

    this.change(this.type);
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
    $BODY.removeClass('site-menubar-hide site-menubar-open');
  }

  open() {
    this.animate(() => {
      $BODY.addClass('site-menubar-open');
      $HTML.addClass('disable-scrolling');
    }, function() {
      this.scrollable.init();
    });

    this.type = 'open';
  }

  hide() {
    this.animate(() => {
      $BODY.addClass('site-menubar-hide');
      $HTML.removeClass('disable-scrolling');
    }, function() {
      this.scrollable.destroy();
    });

    this.type = 'hide';
  }
}
