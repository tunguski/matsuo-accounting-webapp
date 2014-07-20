'use strict';

angular.module('mt.accounting', ['mt.webapp', 'mt.cashRegisterService'])
    .config(function (restFactoryProvider) {
      restFactoryProvider
          .define('CashDocument', {
            additionalFunctions: {
              save: {
                url: '/:documentType',
                method: 'POST'
              }
            }
          })
          .define('Payer')
          .define('CashRegister', {
            additionalFunctions: {
              actualCashRegister: {
                url: '/actualCashRegister/:idCashRegister'
              }
            }
	        })
          .define('CashRegisterReport', {
            additionalFunctions: {
              reportForCashRegister: {
                url: '/reportForCashRegister/:idCashRegister'
              }
            }
          });
    })
;
