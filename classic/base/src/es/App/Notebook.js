import Site from 'Site';

class AppNotebook extends Site {
  initialize() {
    super.initialize();

    this.$listItem = $('.list-group-item');
    this.$actionBtn = $('.site-action');
    this.$toggle = this.$actionBtn.find('.site-action-toggle');
    this.$newNote = $('#addNewNote');
    this.$mdEdit = $('#mdEdit');
    this.window = $(window);

    // states
    this.states = {
      listItemActive: false,
    };
  }
  process() {
    super.process();

    this.handleResize();
    this.steupListItem();
    this.steupActionBtn();
  }

  initEditer() {
    this.$mdEdit.markdown({
      autofocus: false,
      savable: false,
    });
  }

  listItemActive(active) {
    let api = this.$actionBtn.data('actionBtn');
    if (active) {
      api.show();
    } else {
      this.$listItem.removeClass('active');
    }

    this.states.listItemActive = active;
  }

  steupListItem() {
    let self = this;
    this.$listItem.on('click', function() {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      self.listItemActive(true);
    });
  }

  steupActionBtn() {
    this.$toggle.on('click', (e) => {
      if (this.states.listItemActive) {
        this.listItemActive(false);
      } else {
        this.$newNote.modal('show');
        e.stopPropagation();
      }
    });
  }

  handleResize() {
    this.window.on('resize', this.initEditer());
  }
}

let instance = null;

function getInstance() {
  if (!instance) {
    instance = new AppNotebook();
  }
  return instance;
}

function run() {
  let app = getInstance();
  app.run();
}

export default AppNotebook;
export {
  AppNotebook,
  run,
  getInstance,
};
