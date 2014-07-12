'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:InvoiceTableCtrl
 * @description
 * # InvoiceTableCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .directive('invoiceTable', function () {
      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'views/prints/invoiceTable.html',
        link: function(scope, element, attrs) {
          scope.data = scope.$eval(attrs.data);
          scope.readonly = scope.$eval(attrs.readonly);
//          var props = scope.$eval(attrs.myComponentScope);
//          angular.forEach(props, function(value, key) {
//            scope[key] = value;
//          });
        }
      };
    });
