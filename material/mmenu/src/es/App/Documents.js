import Site from 'Site';

class AppDocuments extends Site {
  initialize() {
    super.initialize();

    this.scrollHandle();
    this.stickyfillHandle();
  }

  process() {
    super.process();

    this.handleResize();
  }

  scrollHandle() {
    $('body').scrollspy({
      target: '#articleSticky',
      offset: 80
    });
  }

  stickyfillHandle() {
    if (!window.Stickyfill) {
      return false;
    }
    Stickyfill.add($('#articleSticky'));
    // $('#articleSticky').Stickyfill();
  }

  handleResize() {
    $(window).on('resize orientationchange', function() {
      $(this).width() > 767 ? Stickyfill.refreshAll() : Stickyfill.removeAll();
    }).resize();
  }
}

let instance = null;

function getInstance() {
  if (!instance) {
    instance = new AppDocuments();
  }

  return instance;
}

function run() {
  let app = getInstance();
  app.run();
}

export default AppDocuments;
export {
  AppDocuments,
  run,
  getInstance
};
