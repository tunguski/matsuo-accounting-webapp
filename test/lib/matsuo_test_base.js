toastr = {
  success: function (msg) {
    console.log(msg);
  },
  info: function (msg) {
    console.log(msg);
  }
};


function containsAll() {
  var args = arguments;
  return function (data) {
    var isValid = true;

    angular.forEach(args, function (argument) {
      expect(data).toContain(argument);
      isValid = isValid && data.indexOf(argument) >= 0;
    });

    return isValid;
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

