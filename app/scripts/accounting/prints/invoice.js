'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:InvoiceCtrl
 * @description
 * # InvoiceCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .controller('InvoiceCtrl', function ($scope, $routeParams, abstractInvoiceCtrl, CashDocument) {
      abstractInvoiceCtrl($scope);


      $scope.addInvoicePosition = function() {
        $scope.entity.elements.push({ fields: {
          jm: 'szt.',
          count: 1,
          price: 0,
          taxRate: 0
        }});
        $scope.recalculateSummaries();
      };


      $scope.pluginPrintLogic(function (scope) {
        scope.documentType = 'invoice';
        scope.recalculateSummaries = $scope.recalculateSummaries;
        scope.createEmptyEntity = function (scope) {
          scope.isInvoice = !$routeParams.receipt;

          scope.entity = new CashDocument({
            issuanceDate: moment().toISOString(),
            sellDate: moment().toISOString(),
            dueDate: moment().toISOString(),
            fields: {
              paymentType: 'CASH',
              isReceipt: !scope.isInvoice
            },
            elements: []
          });
        };
      });
    })
    .service('abstractInvoiceCtrl', function () {
      return function ($scope) {


        $scope.calculateValue = function(position, fn) {
          var fields = position.fields;
          try {
            var value = fn(fields);
            if (value) {
              return value;
            }
          } catch (e) {}
          return 0.0;
        };

        $scope.priceNetto = function(position) {
          return $scope.calculateValue(position, function(fields) {
            return parseFloat(fields.price) * parseFloat(fields.count); });
        };

        $scope.taxValue = function(position) {
          return $scope.calculateValue(position, function(fields) {
            return parseInt(fields.taxRate) * parseFloat(fields.price) * parseFloat(fields.count) / 100; });
        };

        $scope.priceBrutto = function(position) {
          return $scope.calculateValue(position, function(fields) {
            return $scope.priceNetto(position) + $scope.taxValue(position); });
        }


        $scope.positions = {};
        function positionsModel(type) { $scope.positions[type] = { elements: [], taxSummaries: {} }; }
        positionsModel('invoice');
        positionsModel('corrective');


        $scope.recalculateSummaries = function() {
          $scope.positions['invoice'].elements.length = 0;
          $scope.positions['corrective'].elements.length = 0;

          angular.forEach($scope.entity.elements, function (position) {
            $scope.positions[position.fields.isAfterCorrection ? 'corrective' : 'invoice'].elements.push(position);
          });

          recalculateSummary($scope.positions['invoice']);
          recalculateSummary($scope.positions['corrective']);
        }


        function summary(taxSummaries, fieldName) {
          return _.reduce(taxSummaries, function(memo, element) { return memo + element[fieldName]; }, 0.0);
        }


        function recalculateSummary(positions) {
          var taxSummaries = positions.taxSummaries;
          _.clearObject(taxSummaries);

          angular.forEach(positions.elements, function(position) {
            var fields = position.fields;
            if (!taxSummaries[fields.taxRate]) {
              taxSummaries[fields.taxRate] = {};
              var summary = taxSummaries[fields.taxRate];
              summary.tax = fields.taxRate;
              summary.summaryNetto = 0.0;
              summary.summaryTaxValue = 0.0;
              summary.summaryBrutto = 0.0;
            }
            var summary = taxSummaries[fields.taxRate];

            summary.summaryNetto = summary.summaryNetto + $scope.priceNetto(position);
            summary.summaryTaxValue = summary.summaryTaxValue + $scope.taxValue(position);
            summary.summaryBrutto = summary.summaryBrutto + $scope.priceBrutto(position);
          });

          positions.summaryNetto = summary(positions.taxSummaries, 'summaryNetto');
          positions.summaryBrutto = summary(positions.taxSummaries, 'summaryBrutto');
        }


        $scope.$watch('entity.fields.paymentType', function() {
          if (!$scope.entity || !$scope.entity.fields || $scope.entity.fields.paymentType == 'CASH') {
            $('.entity_fields_bankAccountNumber').hide();
          } else {
            $('.entity_fields_bankAccountNumber').show();
          }
        });
      };
    });
