import $ from 'jquery';
import {
  getDefaults,
}
from 'Plugin';
import Site from 'Site';

class BaseApp extends Site {
  initialize() {
    super.initialize();

    this.handlSlidePanelPlugin();
  }
  process() {
    super.process();

    this.bindSlidePanelPlugin();
  }

  handlSlidePanelPlugin() {
    const self = this;
    this.slidepanelOptions = $.extend({}, getDefaults('slidePanel'), {
      template(options) {
        return `<div class="${options.classes.base} ${options.classes.base}-${options.direction}">
                  <div class="${options.classes.base}-scrollable">
                    <div><div class="${options.classes.content}"></div></div>
                  </div>
                  <div class="${options.classes.base}-handler"></div>
                </div>`;
      },
      afterLoad() {
        this.$panel.find(`.${this.options.classes.base}-scrollable`).asScrollable({
          namespace: 'scrollable',
          contentSelector: '>',
          containerSelector: '>',
        });
        self.initializePlugins(this.$panel);
      },
      afterShow() {
        $(document).on('click.slidePanelShow', (e) => {
          if ($(e.target).closest('.slidePanel').length === 0 && $(e.target).closest('html').length === 1) {
            this.hide();
          }
        });
      },
      afterHide() {
        $(document).off('click.slidePanelShow');
        $(document).off('click.slidePanelDatepicker');
      },
    }, this.getSlidePanelOptions());
  }

  bindSlidePanelPlugin() {
    const self = this;
    $(document).on('click', '[data-toggle="slidePanel"]', function(e) {
      self.openSlidePanel($(this).data('url'));

      e.stopPropagation();
    });
  }

  getSlidePanelOptions() {
    return {};
  }

  openSlidePanel(url = '') {
    $.slidePanel.show({
      url,
      settings: {
        cache: false,
      },
    }, this.slidepanelOptions);
  }
}

export default BaseApp;
