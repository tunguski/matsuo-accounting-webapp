'use strict';

angular.module('mt.accounting', ['mt.webapp', 'mt.cashRegisterService'])
    .run(function (mtFormConfig) {
      mtFormConfig.namesMap.invoice = 'pl.matsuo.accounting.model.print.Invoice';
      mtFormConfig.namesMap.accountingPrint = 'pl.matsuo.accounting.model.print.AccountingPrint';
      mtFormConfig.namesMap.depositSlip = 'pl.matsuo.accounting.model.print.DepositSlip';
    })
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
