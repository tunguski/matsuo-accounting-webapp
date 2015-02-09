'use strict';


describe('Controller: UserInfoPanelCtrl (accounting)', function () {

  var UserInfoPanelCtrl,
    rootScope,
    scope,
    http;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    http = $httpBackend;
    rootScope = $rootScope;
    UserInfoPanelCtrl = $controller('UserInfoPanelCtrl', {
      $scope: scope
    });
  }));

  it('groups', function () {
    scope.user = {
      groups: [
        {
          name: 'one'
        }, {
          name: 'two'
        }
      ]
    };
    expect(scope.groups()).toBe('one, two');
  });

  it('loadLoginTime', function () {
    expect(scope.loginTime).not.toBeDefined();

    http.expectGET('/api/cashRegisters/actualCashRegister').respond('');
    http.expectGET('/api/login/loginTime').respond('1393822800000');
    scope.$digest();
    http.flush();

    expect(scope.loginTime).toBeDefined();
  });

  it('loggedIn event', function () {

    http.expectGET('/api/cashRegisters/actualCashRegister').respond('');
    http.expectGET('/api/login/loginTime').respond('1393822800000');
    scope.$digest();
    http.flush();

    http.expectPOST('/api/login/permissions').respond([]);
    http.expectGET('/api/cashRegisters/actualCashRegister').respond('');
    http.expectGET('/api/login/loginTime').respond('1393822800000');

    rootScope.$emit('loggedIn');
    http.flush();
  });

  it('groups', function () {
    scope.user = {
      groups: [
        {
          name: 'one'
        }, {
          name: 'two'
        }
      ]
    };
    expect(scope.groups()).toBe('one, two');
  });
});
