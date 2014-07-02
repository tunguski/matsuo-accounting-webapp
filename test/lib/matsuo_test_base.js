toastr = {
  success: function (msg) {
    console.log(msg);
  },
  info: function (msg) {
    console.log(msg);
  }
}

beforeEach(function () {
  jasmine.addMatchers({
    toEqualData: function (expected) {
      return angular.equals(this.actual, expected);
    }
  });
});

angular.module('mt.webapp')
    .config(function (mtRouteConfig) {
      delete mtRouteConfig.apiRedirects.api;
    })

beforeEach(module('mt.accounting'));

var rootScope, scope, http, compile;

beforeEach(inject(function ($httpBackend, $rootScope, $compile) {
  http = $httpBackend;
  rootScope = $rootScope;
  scope = $rootScope.$new();
  compile = $compile;
}));

