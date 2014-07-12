'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:AccountingPanelCtrl
 * @description
 * # AccountingPanelCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .controller('AccountingPanelCtrl', function ($scope, $http, $location, CashRegister, CashRegisterReport) {
      $scope.setTitle("Panel administracji księgowej");

      $scope.flotChartData = [[ ["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9] ]];
      $scope.optionsForFlot = {
        series: {
          bars: {
            show: true,
            barWidth: 0.6,
            align: "center"
          }
        },
        xaxis: {
          mode: "categories",
          tickLength: 0
        }
      };
    });
