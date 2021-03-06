'use strict';

describe('CashRegistersCtrl', function () {
  var controller;

  beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
    controller = $controller('CashRegistersCtrl', { $scope: scope });
  }));


  it('', function () {
    http.expectGET('/api/cashRegisters').respond([{ id: 1 }]);
    http.expectGET('/api/cashRegisterReports?last=true').respond([{
      id: 2,
      cashRegister: {
        id: 1
      }
    }]);
    http.expectGET('/api/cashRegisterReports/cashRegisterPrintsSummary/1').respond({ id: 3 });
    http.flush();
  });
});
