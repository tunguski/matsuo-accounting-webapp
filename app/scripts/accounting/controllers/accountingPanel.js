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
    });
