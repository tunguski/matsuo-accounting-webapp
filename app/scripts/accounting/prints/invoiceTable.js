'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:InvoiceTableController
 * @description
 * # InvoiceTableController
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .directive('invoiceTable', function () {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          readonly: '='
        },
        templateUrl: 'views/prints/invoiceTable.html',
        link: function(scope, element, attrs) {
          //var props = scope.$eval(attrs.myComponentScope);

          angular.forEach(props, function(value, key) {
            scope[key] = value;
          });
        }
      };
    });
