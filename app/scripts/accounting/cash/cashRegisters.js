'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:CashRegistersCtrl
 * @description
 * # CashRegistersCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .controller('CashRegistersCtrl', function ($scope, $http, $location, CashRegister, CashRegisterReport) {
      $scope.setTitle("Lista kas");

      CashRegister.query({}, function (cashRegisters) {
        $scope.cashRegisters = cashRegisters;

        CashRegisterReport.query({ last: true }, function (reports) {
          angular.forEach(reports, function (report) {
            $scope.cashRegisters.byProp('id',report.cashRegister.id).report = report;
          });
        });

        angular.forEach($scope.cashRegisters, function (cashRegister) {
          $http.get('/api/cashRegisterReports/cashRegisterPrintsSummary/' + cashRegister.id).success(function (result) {
            cashRegister.notReckonedSummary = result;
          });
        });
      });

      $scope.showActualCashRegisterReport = function (cashRegister) {
        $location.path("/cash/cashRegisterReport/" + cashRegister.value.id);
      }
    });
