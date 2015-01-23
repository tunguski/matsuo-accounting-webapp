'use strict';

describe('CashRegisterReportsCtrl', function () {
  var controller;

  describe('no idCashRegister', function () {
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      controller = $controller('CashRegisterReportsCtrl', { $scope: scope });
    }));


    it('base functions', function () {
      http.expectGET('/api/cashRegisterReports').respond([{ id: 1 }]);
      http.expectGET('/api/cashRegisters').respond([{ id: 1 }]);

      http.flush();
    });
  });

  describe('with idCashRegister', function () {
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      controller = $controller('CashRegisterReportsCtrl', {
        $scope: scope,
        $routeParams: {
          idCashRegister: 17
        }
      });
    }));


    it('base functions', function () {
      http.expectGET('/api/cashRegisterReports').respond([{ id: 1, cashRegister: 1 }]);
      http.expectGET('/api/cashRegisters').respond([{ id: 1 }, { id: 17, name: 'test' }]);

      http.flush();

      expect(scope.cashRegister.value.name).toBe('test');
    });
  });
});
