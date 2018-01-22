(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/pages/fb_wall', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.pagesFb_wall = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // Example Popup Gallery
  // ---------------------
  var galleryNum = (0, _jquery2.default)('.imgs-gallery').length;
  for (var i = 0; i < galleryNum; i++) {
    (0, _jquery2.default)((0, _jquery2.default)('.imgs-gallery')[i]).magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function titleSrc(item) {
          return item.el.attr('title') + '<small>by amazingSurge</small>';
        }
      }
    });
  }

  //bind input focus
  (0, _jquery2.default)('.wall-comment-reply .form-control').on('focus', function (event) {
    var $this = (0, _jquery2.default)(this);
    $operation = $this.closest('form').find('.reply-opration');
    if (!$operation.hasClass('is-show')) {
      $operation.addClass('is-show');
    }
    event.stopPropagation();
  });
});