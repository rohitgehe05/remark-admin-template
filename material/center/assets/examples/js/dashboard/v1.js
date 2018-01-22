(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/dashboard/v1', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.dashboardV1 = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();

    // Widget Linearea One
    // ---------------------
    (function () {
      //chart-linearea-one
      new Chartist.Line('#widgetLineareaOne .ct-chart', {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        series: [[0, 1, 3, 2, 3.5, 1.2, 1.5, 0]]
      }, {
        low: 0,
        showArea: true,
        showPoint: false,
        showLine: false,
        fullWidth: true,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        axisX: {
          showLabel: false,
          showGrid: false,
          offset: 0
        },
        axisY: {
          showLabel: false,
          showGrid: false,
          offset: 0
        }
      });
    })();

    // Widget Linearea Two
    // ---------------------
    (function () {
      //chart-linearea-two
      new Chartist.Line('#widgetLineareaTwo .ct-chart', {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        series: [[0, 0.5, 2.2, 2, 2.8, 2.3, 3.3, 2.5, 0]]
      }, {
        low: 0,
        showArea: true,
        showPoint: false,
        showLine: false,
        fullWidth: true,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        axisX: {
          showLabel: false,
          showGrid: false,
          offset: 0
        },
        axisY: {
          showLabel: false,
          showGrid: false,
          offset: 0
        }
      });
    })();

    // Widget Linearea Three
    // ---------------------
    (function () {
      //chart-linearea-three
      new Chartist.Line('#widgetLineareaThree .ct-chart', {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        series: [[0, 2, 1.5, 3.5, 2.2, 3, 0.8, 0]]
      }, {
        low: 0,
        showArea: true,
        showPoint: false,
        showLine: false,
        fullWidth: true,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        axisX: {
          showLabel: false,
          showGrid: false,
          offset: 0
        },
        axisY: {
          showLabel: false,
          showGrid: false,
          offset: 0
        }
      });
    })();

    // Widget Linearea Four
    // ---------------------
    (function () {
      //chart-linearea-four
      new Chartist.Line('#widgetLineareaFour .ct-chart', {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        series: [[0, 1.2, 2.4, 2.5, 3.5, 2, 2.5, 1.2, 0]]
      }, {
        low: 0,
        showArea: true,
        showPoint: false,
        showLine: false,
        fullWidth: true,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        axisX: {
          showLabel: false,
          showGrid: false,
          offset: 0
        },
        axisY: {
          showLabel: false,
          showGrid: false,
          offset: 0
        }
      });
    })();

    // Widget VectorMap
    // ----------------
    (function () {
      var defaults = Plugin.getDefaults('vectorMap');
      var options = $$$1.extend({}, defaults, {
        markers: [{
          latLng: [39.9, 116.3],
          name: '1,512 Visits'
        }, {
          latLng: [40.43, -75],
          name: '940 Visits'
        }, {
          latLng: [-33.55, 151],
          name: '340 Visits'
        }]
      }, true);

      $$$1('#widgetJvmap').vectorMap(options);
    })();

    // Widget Current Chart
    // --------------------
    (function () {
      //chart-bar-withfooter
      new Chartist.Bar('#widgetCurrentChart .ct-chart', {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [[160, 390, 280, 440, 410, 360, 200], [600 - 160, 600 - 390, 600 - 280, 600 - 440, 600 - 410, 600 - 360, 600 - 200]]
      }, {
        stackBars: true,
        fullWidth: true,
        seriesBarDistance: 0,
        axisX: {
          showLabel: true,
          showGrid: false,
          offset: 30
        },
        axisY: {
          showLabel: true,
          showGrid: false,
          offset: 30,
          labelOffset: {
            x: 0,
            y: 15
          }
        }
      });
    })();

    Waves.attach('.page-content .btn-floating', ['waves-light']);
  });
});