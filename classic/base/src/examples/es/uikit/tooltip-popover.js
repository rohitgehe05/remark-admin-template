import $ from 'jquery';
import * as Site from 'Site';

$(document).ready(function($) {
  Site.run();
});

// Example bootstrap v4b tooltip (popper.js)
// -----------------------------------------
(function() {
  $('[data-toggle="tooltip"]').tooltip();
})();

// Example bootstrap v4b popper.js
// -------------------------------
(function() {
  $('[data-toggle="popover"]').popover();
})();

(function() {
  $('.example-popover').popover({
    container: 'body'
  });
})();

// Example Webui Popover
// =====================
var defaults = Plugin.getDefaults("webuiPopover");

// Example Webui Popover Pop with Table
// ------------------------------------
(function() {
  var tableContent = $('#examplePopoverTable').html(),
    tableSettings = {
      title: 'WebUI Popover',
      content: tableContent,
      width: 500
    };

  $('#examplePopWithTable').webuiPopover($.extend({}, defaults, tableSettings));
})();

// Example Webui Popover Pop with List
// -----------------------------------
(function() {
  var listContent = $('#examplePopoverList').html(),
    listSettings = {
      content: listContent,
      title: '',
      padding: false
    };

  $('#examplePopWithList').webuiPopover($.extend({}, defaults, listSettings));

})();

// Example Webui Popover Pop with Large Content
// --------------------------------------------
(function() {
  var largeContent = $('#examplePopoverLargeContent').html(),
    largeSettings = {
      title: 'WebUI Popover',
      content: largeContent,
      width: 400,
      height: 350,
      closeable: true
    };

  $('#examplePopWithLargeContent').webuiPopover($.extend({}, defaults, largeSettings));
})();
