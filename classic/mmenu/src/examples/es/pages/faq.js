import $ from 'jquery';
import * as Site from 'Site';

$(document).ready(function() {
  Site.run();

  if ($('.faq-list').length) {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
      $(e.target).addClass('active').siblings().removeClass('active');
    });
  }
});
