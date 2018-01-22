(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/forms/editable', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.formsEditable = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
    //enable / disable
    $$$1('#editableEnable').click(function () {
      $$$1('#editableUser .editable').editable('toggleDisabled');
    });

    var init_x_editable = function init_x_editable() {

      $$$1.fn.editableform.buttons = '<button type="submit" class="btn btn-primary btn-sm editable-submit">' + '<i class="icon md-check" aria-hidden="true"></i>' + '</button>' + '<button type="button" class="btn btn-default btn-sm editable-cancel">' + '<i class="icon md-close" aria-hidden="true"></i>' + '</button>';

      $$$1.fn.editabletypes.datefield.defaults.inputclass = "form-control input-sm";

      //error classes
      $$$1.fn.editableform.errorGroupClass = 'has-danger';

      //defaults
      $$$1.fn.editable.defaults.url = '/post';

      //editables
      $$$1('#editableSuperuser').editable({
        url: '/post',
        type: 'text',
        pk: 1,
        name: 'username',
        title: 'Enter username'
      });

      $$$1('#editableFirstname').editable({
        validate: function validate(value) {
          if ($$$1.trim(value) === '') return 'This field is required';
        }
      });

      $$$1('#editableSex').editable({
        prepend: "not selected",
        source: [{
          value: 1,
          text: 'Male'
        }, {
          value: 2,
          text: 'Female'
        }],
        display: function display(value, sourceData) {
          var colors = {
            "": "gray",
            1: "green",
            2: "blue"
          },
              elem = $$$1.grep(sourceData, function (o) {
            return o.value === value;
          });

          if (elem.length) {
            $$$1(this).text(elem[0].text).css("color", colors[value]);
          } else {
            $$$1(this).empty();
          }
        }
      });

      $$$1('#editableVacation').editable({
        datepicker: {
          todayBtn: 'linked'
        }
      });

      $$$1('#editableDob').editable();

      $$$1('#editableEvent').editable({
        placement: 'right',
        combodate: {
          firstItem: 'name'
        }
      });

      $$$1('#editableMeetingStart').editable({
        format: 'yyyy-mm-dd hh:ii',
        viewformat: 'dd/mm/yyyy hh:ii',
        validate: function validate(v) {
          if (v && v.getDate() === 10) return 'Day cant be 10!';
        },
        datetimepicker: {
          todayBtn: 'linked',
          weekStart: 1
        }
      });

      $$$1('#editableComments').editable({
        showbuttons: 'bottom'
      });

      $$$1('#editableNote').editable();
      $$$1('#editablePencil').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        $$$1('#editableNote').editable('toggle');
      });

      $$$1('#editableState').editable({
        source: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
      });

      var editableStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
          states = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: editableStates
      });

      $$$1('#editableState2').editable({
        value: 'California',
        typeahead: {
          name: 'states',
          source: states
        }
      });

      $$$1('#editableFruits').editable({
        pk: 1,
        limit: 3,
        source: [{
          value: 1,
          text: 'banana'
        }, {
          value: 2,
          text: 'peach'
        }, {
          value: 3,
          text: 'apple'
        }, {
          value: 4,
          text: 'watermelon'
        }, {
          value: 5,
          text: 'orange'
        }]
      });

      $$$1('#editableAddress').editable({
        url: '/post',
        value: {
          city: "Moscow",
          street: "Lenina",
          building: "12"
        },
        validate: function validate(value) {
          if (value.city === '') return 'city is required!';
        },
        display: function display(value) {
          if (!value) {
            $$$1(this).empty();
            return;
          }
          var html = '<b>' + $$$1('<div>').text(value.city).html() + '</b>, ' + $$$1('<div>').text(value.street).html() + ' st., bld. ' + $$$1('<div>').text(value.building).html();
          $$$1(this).html(html);
        }
      });

      // $("#editableUser").find(".form-control").addClass(".input-sm");
    };

    $$$1.fn.editable.defaults.mode = 'inline';
    init_x_editable();

    // $('#editableControls').on("click", "label", function() {
    //   xMode = $(this).find("input").val();
    //   $.fn.editable.defaults.mode = xMode;
    //   destroy_x_editable();
    //   init_x_editable();
    // });
  });
});