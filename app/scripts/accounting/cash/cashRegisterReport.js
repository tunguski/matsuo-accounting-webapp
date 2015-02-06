'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:CashRegisterReportCtrl
 * @description
 * # CashRegisterReportCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .controller('CashRegisterReportCtrl', function ($scope, $rootScope, $routeParams, $location, printTypeService,
                                                    CashRegisterReport, User) {
      $scope.printTypeService = printTypeService;


      $scope.sumCashDocuments = function () {
        var sum = 0.0;

        if ($scope.entity) {
          angular.forEach($scope.entity.prints, function (print) {
            var value = parseFloat(print.cashRegisterAmount);
            sum = sum + value;
          });
        }

        return sum;
      };


      $scope.save = function () {
        $scope.entity.cashRegister.reckoningParty = null;
        $scope.entity.$save(function (entity, headers) {
          $location.replace();
          $location.url('/cash/cashRegisterReport/' + _.lastUrlElement(headers));
        });
      };


      function configureReport(report) {
        $scope.entity = report;
        angular.forEach(report.prints, function (print) {
          print.printSimpleClassName = print.printClass.split('.').pop();
        });
        loadAndInject(report.prints, User, 'userCreated', 'id');
      }


      if ($routeParams.idEntity) {
        $scope.setTitle("<span><span class='comment'>Raport kasowy kasy </span>{{entity.cashRegister.code}} " +
            "<span class='comment'>z dnia</span> {{entity.createdTime | formatDate}}</span>", $scope);

        CashRegisterReport.get({ idCashRegisterReport : $routeParams.idEntity }, configureReport);

      } else if ($routeParams.idCashRegister) {
        $scope.setTitle("<span><span class='comment'>Nowy raport kasowy dla: </span>{{entity.cashRegister.code}}</span>", $scope);

        CashRegisterReport.reportForCashRegister({ idCashRegister : $routeParams.idCashRegister }, configureReport);
      }
    });
