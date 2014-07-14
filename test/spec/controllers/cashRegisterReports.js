'use strict';

describe('CashRegisterReportsCtrl', function () {
  var controller;

  beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
    controller = $controller('CashRegisterReportsCtrl', { $scope: scope });
  }));


  it('', function () {
    http.expectGET('/api/cashRegisterReports').respond([{ id: 1 }]);
    http.expectGET('/api/cashRegisters').respond([{ id: 1 }]);

    http.flush();
  });
});
