'use strict';

angular.module('mt.accounting')
    .config(function(userGroupConfigurationProvider) {
      userGroupConfigurationProvider.groupToDefaultRoute.pushArray(
          [{ groupName: 'ADMIN', defaultRoute: '/base/accountingPanel'},
            { groupName: 'DOCTOR', defaultRoute: '/doctors/schedule_today'},
            { groupName: '', defaultRoute: '/base/accountingPanel'}]);
    })

    .run(function (menuService) {
      menuService.menu.push({
        title: 'Księgowość',
        elements: [
          { title: 'Kasa wyda', href: '#/prints/cashDocument?type=withdrawSlip' },
          { title: 'Kasa przyjmie', href: '#/prints/cashDocument?type=depositSlip' },
          { title: 'Faktura', href: '#/prints/cashDocument?type=invoice' },
          { title: 'Faktura korygująca', href: '#/prints/cashDocument?type=correctiveInvoice' },
          { title: 'Kasy', href: '#/cash/cashRegisters' },
          { title: 'Raporty kasowe', href: '#/cash/cashRegisterReports' }
        ]
      });
    });
