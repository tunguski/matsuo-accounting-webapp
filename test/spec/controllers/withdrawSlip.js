'use strict';

describe('WithdrawSlipCtrl', function () {
  var controller, documentCtrl;

  describe('with print', function () {

    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      var routeParams = {
        idEntity: 1
      };

      var kw = {
        'id': 4,
        'createdTime': '2014-01-10T21:35:57Z',
        'fields': {
          'approvingPerson': 'Maciej Gołębiowski',
          'authenticityText': 'ORYGINAŁ',
          'number': '123551/125',
          'buyer.address': ' Legionowo, Sielankowa',
          'seller.name': 'Mediq sp. z o.o.',
          'cashRegisterAmount': '16.57',
          'seller.address': ' Legionowo, Piłsudskiego 20',
          'cashReportReference': 'Nr 123, poz. 12',
          'creator': 'Maciej Stępień',
          'totalAmountInWords': 'szesnaście złotych pięćdziesiąt siedem groszy',
          'seller.id': '898',
          'totalAmount': '16.57',
          'buyer.name': 'PHU REMONT',
          'buyer.id': '912',
          'sellPlace': 'Warszawa',
          'sellDate': '2013-09-08T22:00:00Z'
        },
        'printClass': 'pl.matsuo.clinic.model.print.cash.WithdrawSlip',
        'idEntity': 1,
        'idCashRegisterReport': 1,
        'elements': [
          {'id': 10, 'fields': {'accountNumber': '12345', 'price': '3.21', 'serviceName': 'Morfologia'}},
          {'id': 11, 'fields': {'accountNumber': '12345', 'price': '5.24', 'serviceName': 'APTT'}},
          {'id': 12, 'fields': {'accountNumber': '12345', 'price': '8.12', 'serviceName': 'OB'}}
        ]};

      http.expectGET('/api/cashRegisters/actualCashRegister').respond({});
      http.expectGET('/api/cashDocuments/1').respond(kw);
      http.expectGET('/api/payers/912').respond({});
      http.expectGET('/api/payers/898').respond({});


      controller = $controller('CashDocumentCtrl', { $scope: scope, $routeParams: routeParams });
      documentCtrl = $controller('WithdrawSlipCtrl', {$scope: scope, $routeParams: routeParams });

      http.flush();
    }));


    it('summaries are correct', function () {
      expect(scope.positions.invoice.elements.length).toBe(3);
      expect(scope.positions.invoice.summaryBrutto).toBe(16);
      expect(scope.positions.corrective).not.toBeDefined();
    });
  });

  describe('without print', function () {
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      var routeParams = {
        type: 'withdrawSlip'
      };

      http.expectGET('/api/cashRegisters/actualCashRegister').respond({});

      controller = $controller('CashDocumentCtrl', { $scope: scope, $routeParams: routeParams });
      documentCtrl = $controller('WithdrawSlipCtrl', {$scope: scope, $routeParams: routeParams });

      http.flush();
    }));


    it('summaries are correct', function () {
      expect(scope.positions.invoice.elements.length).toBe(0);
      expect(scope.positions.invoice.summaryBrutto).toBe(0);
      expect(scope.positions.corrective).not.toBeDefined();
    });
  });
});
