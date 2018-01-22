import $ from 'jquery';
import * as Site from 'Site';

$(document).ready(function($) {
  Site.run();
});

// Set tablesaw config
// -------------------
(function() {
  window.TablesawConfig = {
    i18n: {
      modeStack: 'Stack',
      modeSwipe: 'Swipe',
      modeToggle: 'Toggle',
      modeSwitchColumnsAbbreviated: 'Cols',
      modeSwitchColumns: 'Columns',
      columnToggleButton: 'Columns',
      columnToggleError: 'No eligible columns.',
      sort: 'Sort',
      swipePreviousColumn: '',
      swipeNextColumn: ''
    }
  };
})();
