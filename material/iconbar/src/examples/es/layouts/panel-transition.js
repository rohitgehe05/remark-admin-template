import $ from 'jquery';
import * as Site from 'Site';

$(document).ready(function($) {
  Site.run();

  var $example = $('#exampleTransition');

  $(document).on('click.panel.transition', '[data-type]', function() {
    var type = $(this).data('type');

    $example.data('animateList').run(type);
  });

  $(document).on('close.uikit.panel', '[class*=blocks-] > li > .panel', function() {
    $(this).parent().hide();
  });
});
