'use strict';

describe('CorrectiveInvoiceCtrl', function () {
  var controller, documentCtrl;

  var checkRequest = containsAll('"issuanceDate"', '"sellDate"', '"dueDate', '"paymentType":"TRANSFER"');

  describe('new', function () {
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      var routeParams = {
        idCorrectedPrint: 31
      };

      http.expectGET('/api/cashRegisters/actualCashRegister').respond({});
      http.expectGET('/api/cashDocuments/31').respond({
        id: 31,
        printClass: 'com.test.Invoice',
        elements: [
          {}
        ]
      });

      controller = $controller('CashDocumentCtrl', { $scope: scope, $routeParams: routeParams });

      http.flush();

      http.expectGET('/api/correctiveInvoices/for_invoice/31').respond({
        printClass: 'com.test.CorrectiveInvoice',
        fields: {
          isReceipt: false,
          dueDate: '2013-09-18T22:00:00Z',
          issuanceDate: '2013-09-08T22:00:00Z',
          paymentType: 'TRANSFER',
          sellDate: '2013-09-08T22:00:00Z'
        },
        elements: [
          { fields: { isAfterCorrection: false } }
        ]
      });
      http.expectGET('/api/payers').respond({});

      documentCtrl = $controller('CorrectiveInvoiceCtrl', {$scope: scope, $routeParams: routeParams });

      http.flush();
    }));


    it('save', function () {
      http.expectPOST('/api/cashDocuments/correctiveInvoice', checkRequest).respond('', { Location: '/cashDocuments/invoice/7' });

      scope.save();

      http.flush();
    });
  });

  describe('existing', function () {
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      var routeParams = {
        idEntity: 1
      };

      var invoice = {
        id: 1,
        createdTime: '2014-01-11T11:59:31Z',
        fields: {
          areCommentsVisible: 'true',
          paymentType: 'TRANSFER',
          'seller.nip': '5361188849',
          number: 'LEG/FV/2013/123456',
          authenticityText: 'ORYGINAŁ',
          'buyer.address': ' Legionowo, Sielankowa',
          'seller.name': 'Mediq sp. z o.o.',
          'buyer.pesel': '0',
          cashRegisterAmount: '13.55',
          'seller.address': ' Legionowo, Piłsudskiego 20',
          amountAlreadyPaid: '13.55',
          'seller.id': '898',
          issuanceDate: '2013-09-08T22:00:00Z',
          totalAmount: '30.1312',
          'buyer.name': 'PHU REMONT',
          amountDueInWords: 'szesnaście złotych pięćdziesiąt osiem groszy',
          bankAccountNumber: '26 1050 1445 1000 0022 7647 0461',
          amountDue: '16.5812',
          sellPlace: 'Warszawa',
          'buyer.id': '912',
          'buyer.nip': '1230826891',
          dueDate: '2013-09-18T22:00:00Z',
          sellDate: '2013-09-08T22:00:00Z',
          comments: 'komentarz'
        },

        printClass: 'pl.matsuo.clinic.model.print.cash.Invoice',
        idEntity: 1,
        idCashRegisterReport: 1,
        elements: [
          {id: 1, fields: {price: '3.21', taxRate: '22', count: '2', serviceName: 'APTT'}},
          {id: 2, fields: {price: '5.21', taxRate: '7', count: '4', serviceName: 'OB'}}
        ]};

      http.expectGET('/api/cashRegisters/actualCashRegister').respond({});
      http.expectGET('/api/cashDocuments/1').respond(invoice);
      http.expectGET('/api/payers/912').respond({});
      http.expectGET('/api/payers/898').respond({});


      controller = $controller('CashDocumentCtrl', { $scope: scope, $routeParams: routeParams });
      documentCtrl = $controller('CorrectiveInvoiceCtrl', {$scope: scope, $routeParams: routeParams });

      http.flush();
    }));


    it('summaries are correct', function () {
      expect(scope.positions.invoice.elements.length).toBe(2);
      expect(scope.positions.invoice.summaryBrutto).toBe(30.1312);
      expect(scope.positions.corrective.elements.length).toBe(0);
    });


    it('save', function () {
      http.expectPUT('/api/cashDocuments?documentType=correctiveInvoice', checkRequest).respond('', { Location: '/cashDocuments/invoice/7' });

      scope.save();

      http.flush();
    });
  });
});
