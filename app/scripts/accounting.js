'use strict';

angular.module('mt.accounting', ['mt.webapp', 'mt.cashRegisterService'])
    .config(function (restFactoryProvider) {
      restFactoryProvider
          .define('CashDocument')
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
          })
          .define('CorrectiveInvoice')
          .define('DepositSlip')
          .define('WithdrawSlip')
          .define('Invoice');
    })
;
