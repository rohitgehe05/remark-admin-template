(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/tables/footable', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.tablesFootable = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // Example Row Toggler
  // -------------------
  (function () {
    (0, _jquery2.default)('#exampleRowToggler').footable({
      "toggleColumn": "first",
      "showToggle": true,
      "expandFirst": true
    });
  })();

  // Accordion
  // ---------
  (function () {
    (0, _jquery2.default)('#exampleFooAccordion').footable();
  })();

  // Collapse
  // --------------------------
  (function () {
    (0, _jquery2.default)('#exampleFooCollapse').footable();
  })();

  // NO HEADERS
  // ----------
  (function () {
    (0, _jquery2.default)('#exampleNoHeaders').footable();
  })();

  // Pagination
  // ----------
  (function () {
    (0, _jquery2.default)('#examplePagination').footable();
    (0, _jquery2.default)('#exampleShow [data-page-size]').on('click', function (e) {
      e.preventDefault();
      var pagesize = (0, _jquery2.default)(this).data('pageSize');
      FooTable.get('#examplePagination').pageSize(pagesize);
    });
  })();

  // Custom filter UI
  // ----------
  (function () {
    (0, _jquery2.default)('#exampleCustomFilter').footable();
    (0, _jquery2.default)('.filter-ui-status').on('change', function () {
      var filtering = FooTable.get('#exampleCustomFilter').use(FooTable.Filtering),
          // get the filtering component for the table
      filter = (0, _jquery2.default)(this).val(); // get the value to filter by
      if (filter === 'none') {
        // if the value is "none" remove the filter
        filtering.removeFilter('status');
      } else {
        // otherwise add/update the filter.
        filtering.addFilter('status', filter, ['status']);
      }
      filtering.filter();
    });
  })();

  // Modal
  // ----------
  (function () {
    (0, _jquery2.default)('#exampleModal').footable({
      "useParentWidth": true
    });
  })();

  // Loading Rows
  // ----------
  (function () {
    (0, _jquery2.default)('#exampleLoading').footable();
    var loading = FooTable.get('#exampleLoading');

    (0, _jquery2.default)('.append-rows').on('click', function (e) {
      e.preventDefault();
      // get the url to load off the button
      var url = (0, _jquery2.default)(this).data('url');
      // ajax fetch the rows
      _jquery2.default.get(url).then(function (rows) {
        // and then load them using either
        loading.rows.load(rows);
        // or
        // ft.loadRows(rows);
      });
    });
  })();

  // Filtering
  // ---------
  (function () {
    FooTable.MyFiltering = FooTable.Filtering.extend({
      construct: function construct(instance) {
        this._super(instance);
        this.statuses = ['Active', 'Disabled', 'Suspended'];
        this.def = 'Any Status';
        this.$status = null;
      },
      $create: function $create() {
        this._super();
        var self = this,
            $form_grp = (0, _jquery2.default)('<div/>', {
          'class': 'form-group'
        }).append((0, _jquery2.default)('<label/>', {
          'class': 'sr-only',
          text: 'Status'
        })).prependTo(self.$form);

        self.$status = (0, _jquery2.default)('<select/>', {
          'class': 'form-control'
        }).on('change', {
          self: self
        }, self._onStatusDropdownChanged).append((0, _jquery2.default)('<option/>', {
          text: self.def
        })).appendTo($form_grp);

        _jquery2.default.each(self.statuses, function (i, status) {
          self.$status.append((0, _jquery2.default)('<option/>').text(status));
        });
      },
      _onStatusDropdownChanged: function _onStatusDropdownChanged(e) {
        var self = e.data.self,
            selected = (0, _jquery2.default)(this).val();
        if (selected !== self.def) {
          self.addFilter('status', selected, ['status']);
        } else {
          self.removeFilter('status');
        }
        self.filter();
      },
      draw: function draw() {
        this._super();
        var status = this.find('status');
        if (status instanceof FooTable.Filter) {
          this.$status.val(status.query.val());
        } else {
          this.$status.val(this.def);
        }
      }
    });

    FooTable.components.register('filtering', FooTable.MyFiltering);
    var filtering = (0, _jquery2.default)('#exampleFootableFiltering');
    filtering.footable();
  })();

  // Editing Row
  // ----------------
  (function () {
    var _editing;

    var $modal = (0, _jquery2.default)('#editor-modal'),
        $editor = (0, _jquery2.default)('#editor'),
        $editorTitle = (0, _jquery2.default)('#editor-title'),
        ft = FooTable.init('#exampleFooEditing', {
      editing: (_editing = {
        enabled: true,
        addRow: function addRow() {
          $modal.removeData('row');
          $editor[0].reset();
          $editorTitle.text('Add a new row');
          $modal.modal('show');
        },
        editRow: function editRow(row) {
          var values = row.val();
          $editor.find('#id').val(values.id);
          $editor.find('#firstName').val(values.firstName);
          $editor.find('#lastName').val(values.lastName);
          $editor.find('#jobTitle').val(values.jobTitle);
          $editor.find('#startedOn').val(values.startedOn.format('YYYY-MM-DD'));
          $editor.find('#dob').val(values.dob.format('YYYY-MM-DD'));

          $modal.data('row', row); // set the row data value for use later
          $editorTitle.text('Edit row #' + values.id); // set the modal title
          $modal.modal('show'); // display the modal
        },
        deleteRow: function deleteRow(row) {
          if (confirm('Are you sure you want to delete the row?')) {
            row.delete();
          }
        },
        $buttonShow: function $buttonShow() {
          return '<button type="button" class="btn btn-primary mr-10 footable-show">' + this.showText + "</button>";
        },
        $buttonHide: function $buttonHide() {
          return '<button type="button" class="btn btn-default footable-hide">' + this.hideText + "</button>";
        },
        $buttonAdd: function $buttonAdd() {
          return '<button type="button" class="btn btn-primary mr-15 footable-add">' + this.addText + "</button> ";
        }
      }, babelHelpers.defineProperty(_editing, '$buttonShow', function $buttonShow() {
        return '<button type="button" class="btn btn-primary mr-10 footable-show">' + this.showText + "</button>";
      }), babelHelpers.defineProperty(_editing, '$buttonHide', function $buttonHide() {
        return '<button type="button" class="btn btn-default footable-hide">' + this.hideText + "</button>";
      }), babelHelpers.defineProperty(_editing, '$buttonAdd', function $buttonAdd() {
        return '<button type="button" class="btn btn-primary mr-15 footable-add">' + this.addText + "</button> ";
      }), _editing)
    }),
        uid = 10;

    $editor.on('submit', function (e) {
      if (this.checkValidity && !this.checkValidity()) return;
      e.preventDefault();
      var row = $modal.data('row'),
          values = {
        id: $editor.find('#id').val(),
        firstName: $editor.find('#firstName').val(),
        lastName: $editor.find('#lastName').val(),
        jobTitle: $editor.find('#jobTitle').val(),
        startedOn: moment($editor.find('#startedOn').val(), 'YYYY-MM-DD'),
        dob: moment($editor.find('#dob').val(), 'YYYY-MM-DD')
      };

      if (row instanceof FooTable.Row) {
        row.val(values);
      } else {
        values.id = uid++;
        ft.rows.add(values);
      }
      $modal.modal('hide');
    });
  })();
});