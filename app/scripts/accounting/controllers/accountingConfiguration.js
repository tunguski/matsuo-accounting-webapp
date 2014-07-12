'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:AccountingConfigurationCtrl
 * @description
 * # AccountingConfigurationCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .controller('AccountingConfigurationCtrl', function ($scope, $http, CashRegister, User, OrganizationUnit) {
      $scope.configuration = {
        manyCashRegisters: false,
        divisionsEnabled: false
      };

      $scope.groups = function (user) {
        return _.pluck(user.groups, 'name').join(', ');
      };

      CashRegister.query({}, function (cashRegisters) {
        $scope.cashRegisters = cashRegisters;
      });

      User.query({}, function (users) {
        $scope.users = users;
      });

      OrganizationUnit.query({}, function (organizationUnits) {
        $scope.organizationUnits = organizationUnits;
      });
    });

