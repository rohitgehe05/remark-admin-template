import $ from 'jquery';
import * as Site from 'Site';

$(document).ready(function($) {
  Site.run();

  Waves.attach('.page-content .btn-flat');
  Waves.attach('.page-content .btn-round', ['waves-round', 'waves-light']);
  Waves.attach('.page-content .btn-pure', ['waves-circle', 'waves-classic']);
  Waves.attach('.page-content .btn-floating', ['waves-float', 'waves-light']);
});
