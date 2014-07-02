'use strict';

angular.module('mt.ui')
    .factory('userGroupConfiguration', ['$route', '$rootScope', '$location', 'mtRouteConfig',
      function($route, $rootScope, $location, mtRouteConfig) {

        var userGroupConfiguration = {
          refreshAppUserConfiguration: function () {
            var groups = _.pluck($rootScope.user.groups, 'name');
            if (_.contains(groups, 'ADMIN')) {
              mtRouteConfig.defaultRoute = '/base/registration';
            } else if (_.contains(groups, 'DOCTOR')) {
              mtRouteConfig.defaultRoute = '/doctors/schedule_today';
            } else {
              mtRouteConfig.defaultRoute = '/base/registration';
            }

            $route.routes['null'] = mtRouteConfig.defaultRoute;
            $location.url(mtRouteConfig.defaultRoute);
          }
        };
        return userGroupConfiguration;
      }]);

angular.module('mt.accounting')
    .run(function (menuService) {
          menuService.menu.push({
            title: 'Księgowość',
            elements: [
              { title: 'Kasa wyda', href: '#/prints/withdrawSlip' },
              { title: 'Kasa przyjmie', href: '#/prints/depositSlip' },
              { title: 'Faktura', href: '#/prints/invoice' },
              { title: 'Faktura korygująca', href: '#/prints/correctiveInvoice' },
              { title: 'Kasy', href: '#/cash/cashRegisters' },
              { title: 'Raporty kasowe', href: '#/cash/cashRegisterReports' }
            ]
          });
        });
