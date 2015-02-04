'use strict';

angular.module('mt.accounting').
    controller('UserInfoPanelCtrl', function ($scope, $rootScope, $http, $interval, $dialog, cashRegisterService) {
      $scope.cashRegisterService = cashRegisterService;

      $scope.loadLoginTime = function () {
        $http.get('/api/login/loginTime').success(function (time) {
          $scope.loginTime = moment(parseInt(time));
        });
      };
      $scope.loadLoginTime();

      $rootScope.$on('loggedIn', function (event) {
        $scope.loadLoginTime();
      });

      $scope.loginDuration = '-';

      // FIXME: powoduje odświeżanie innych scope'ów - przez to nie da się debugować
    //  $interval(function () {
    //    var newTime = $scope.loginTime ? $scope.loginTime.from(moment()) : '-';
    //    if (newTime !== $scope.loginDuration) {
    //      $scope.loginDuration = newTime;
    //    }
    //  }, 1000, 0, false);

      $scope.groups = function () {
        if ($scope.user) {
          return _.foldl($scope.user.groups, function (memo, group) {
            return memo + (memo ? ', ' : '') + group.name;
          }, '');
        }
      };

      $scope.editCashRegister = $dialog.simpleDialog(
          'cash/editCashRegister.html', 'EditCashRegisterController', cashRegisterService.getCashRegister);
    })

    .controller('EditCashRegisterController', function ($scope, $http, $location, $modalInstance, cashRegisterService, CashRegister) {
      $scope.cashRegisterService = cashRegisterService;

      // $scope.cashRegisters must be initialized before initializeSelect2 invocation
      $scope.cashRegisters = CashRegister.query({}, function (cashRegisters) {
        $scope.cashRegister.value = cashRegisterService.cashRegister;
        $scope.actualCashRegister = cashRegisterService.cashRegister;
      });

      initializeSelect2($scope, 'cashRegister', null, 'cashRegister', { definedElements: $scope.cashRegisters });

      $scope.close = function(result) {
        if(result === 'CHANGE_CASH_REGISTER') {
          if ($scope.cashRegister.value) {
            $http.post('/api/cashRegisters/chooseCashRegister/' + $scope.cashRegister.value.id).success(function(data) {
              toastr.success('Wybrano kasę: ' + $scope.cashRegister.value.code);
              $modalInstance.close();
            });
          }
        } else {
          if (result === 'REPORT') {
            $location.path('/cash/cashRegisterReport');
            $location.search('idCashRegister', $scope.cashRegister.value.id);
          }

          $modalInstance.close();
        }
      };
    });

