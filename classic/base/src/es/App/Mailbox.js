import BaseApp from 'BaseApp';

class AppMailbox extends BaseApp {
  initialize() {
    super.initialize();

    this.$actionBtn = $('.site-action');
    this.$actionToggleBtn = this.$actionBtn.find('.site-action-toggle');
    this.$addMainForm = $('#addMailForm').modal({
      show: false,
    });
    this.$content = $('#mailContent');

    // states
    this.states = {
      checked: false,
    };
  }
  process() {
    super.process();

    this.setupActionBtn();
    this.bindListChecked();
  }

  listChecked(checked) {
    let api = this.$actionBtn.data('actionBtn');
    if (checked) {
      api.show();
    } else {
      api.hide();
    }

    this.states.checked = checked;
  }

  setupActionBtn() {
    this.$actionToggleBtn.on('click', (e) => {
      if (!this.states.checked) {
        this.$addMainForm.modal('show');
        e.stopPropagation();
      }
    });
  }

  bindListChecked() {
    this.$content.on('asSelectable::change', (e, api, checked) => {
      this.listChecked(checked);
    });
  }
}

let instance = null;

function getInstance() {
  if (!instance) {
    instance = new AppMailbox();
  }
  return instance;
}

function run() {
  let app = getInstance();
  app.run();
}

export default AppMailbox;
export {
  AppMailbox,
  run,
  getInstance,
};
