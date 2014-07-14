'use strict';

describe('Invoice Table', function () {


  it('basic example', function () {
    http.expectGET('views/prints/invoiceTable.html').respond('');

    var template = compile('<div invoice-table></div>')(scope);
    scope.$digest();
    http.flush();
    expect(template.html()).toBe('');
  });
});
