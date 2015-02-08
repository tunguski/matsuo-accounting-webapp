'use strict';

describe('CashRegisterReportCtrl', function () {
  var controller;

  describe('basic', function () {
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      controller = $controller('CashRegisterReportCtrl', { $scope: scope });
    }));


    function createPrint(seller, idBucket, value) {
      return {
        fields: {
          'seller.id': '' + seller
        },
        cost: seller === idBucket,
        idBucket: '' + idBucket,
        value: value,
        cashRegisterAmount: seller === idBucket ? value : - value
      };
    }


    it('save', function () {
      scope.entity = {
        cashRegister: {
        },
        prints: [
          createPrint(17, 17, 11),
          createPrint(17, 17, 23),
          createPrint(17, 31, 4)
        ]
      };

      expect(scope.sumCashDocuments()).toBe(30);
    });


    it('save', function () {
      scope.entity = {
        cashRegister: {

        },
        $save: function (fn) {
          fn({}, function () { return '/prints/cashDocument/11'; });
        }
      };

      scope.save();
    });
  });


  describe('with idEntity', function () {
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      var routeParams = {
        idEntity: 11
      };
      controller = $controller('CashRegisterReportCtrl', { $scope: scope, $routeParams: routeParams });
    }));


    it('load', function () {
      http.expectGET('/api/cashRegisterReports/11').respond({
        id: 11,
        prints: [
          { printClass: 'com.test.Print' },
          { printClass: 'com.test.Print' }
        ]
      });

      http.flush();
    });
  });


  describe('with idCashRegister', function () {
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
      var routeParams = {
        idCashRegister: 11
      };
      controller = $controller('CashRegisterReportCtrl', { $scope: scope, $routeParams: routeParams });
    }));


    it('load', function () {
      http.expectGET('/api/cashRegisterReports/reportForCashRegister/11').respond({
        id: 11
      });

      http.flush();
    });
  });
});
