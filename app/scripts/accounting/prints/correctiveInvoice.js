'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:CorrectiveInvoiceCtrl
 * @description
 * # CorrectiveInvoiceCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .controller('CorrectiveInvoiceCtrl', function ($scope, $routeParams, $http, abstractInvoiceCtrl, CashDocument) {
      abstractInvoiceCtrl($scope);

      var addInvoicePosition = $scope.addInvoicePosition;

      $scope.addInvoicePosition = function() {
        addInvoicePosition({
          isAfterCorrection: true
        });
      };


      function createEmptyEntity(scope) {
        scope.entity = new CashDocument();

        return $http.get('/api/correctiveInvoices/for_invoice/' + $routeParams.idCorrectedPrint).then(function(data) {
          $.extend(true, scope.entity, data.data);
          scope.recalculateSummaries();
          scope.isInvoice = $scope.entity.fields.isReceipt !== 'true';

          scope.loadBuyer(scope.entity.fields['buyer.id']);
        });
      }


      $scope.correctionValue = function() {
        return $scope.positions['corrective'].summaryBrutto - $scope.positions['invoice'].summaryBrutto;
      }


      $scope.pluginPrintLogic(function (scope) {
        scope.documentType = 'correctiveInvoice';
        scope.recalculateSummaries = $scope.recalculateSummaries;
        scope.createEmptyEntity = createEmptyEntity;
      });
    });
