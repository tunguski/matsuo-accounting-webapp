'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:DepositSlipCtrl
 * @description
 * # DepositSlipCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .controller('DepositSlipCtrl', function ($scope, $routeParams, CashRegisterReport, CashDocument) {
      function createEmptyEntity(scope) {
        scope.entity = new CashDocument({
          issuanceDate: moment().toISOString(),
          sellDate: moment().toISOString(),
          dueDate: moment().toISOString(),
          fields: {},
          elements: []
        });

        if($routeParams.idCashReport) {
          CashRegisterReport.get({idCashRegisterReport: $routeParams.idCashReport}, function(report) {
            $scope.addDepositSlipPosition({
              fields : {
                serviceName : 'Przeniesiono do sejfu',
                price : report.endingBalance,
                accountNumber : 0
              }
            });
          });
        }
      }


      $scope.addDepositSlipPosition = function(position) {
        $scope.entity.elements.push(position ? position : {
          fields : {
            serviceName : '',
            price : 0,
            accountNumber: ''
          }
        });
        $scope.recalculateSummaries();
      };


      function recalculateSummaries() {
        var summary = 0;
        angular.forEach($scope.entity.elements, function(value) {
          summary = summary + parseInt(value.fields.price);
        });

        $scope.positions = {
          invoice: {
            elements: $scope.entity.elements,
            summaryBrutto: summary
          }
        };
      };


      $scope.pluginPrintLogic(function (scope) {
        scope.documentType = 'depositSlip';
        scope.recalculateSummaries = recalculateSummaries;
        scope.createEmptyEntity = createEmptyEntity;
      });
    });
