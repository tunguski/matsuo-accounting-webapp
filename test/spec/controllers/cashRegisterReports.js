'use strict';

describe('CashRegisterReportsCtrl', function () {
  var controller;

  beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
    controller = $controller('CashRegisterReportsCtrl', { $scope: scope });
  }));


  it('', function () {
    http.expectGET('/api/cashRegisterReports').respond(angular.toJson([{ id: 1 }]));
    http.expectGET('/api/cashRegisters').respond(angular.toJson([{ id: 1 }]));

    http.flush();
  });
});
