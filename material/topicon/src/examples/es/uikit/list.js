import $ from 'jquery';
import * as Site from 'Site';

$(document).ready(function($) {
  Site.run();

  Waves.attach('.list-group > a:not(.disabled)', ['waves-block', 'waves-classic']);
});
