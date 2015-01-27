'use strict';

angular.module('mt.accounting')
    .config(function($translateProvider) {
      // english translation
      $translateProvider.translations('en', {

        cashDocument: {
          shortName: {
            invoice: 'Inv.',
            invoice_receipt: 'Rec.',
            //withdrawSlip: 'KW',
            //depositSlip: 'KP',
            correctiveInvoice: 'Corr. inv.',
            correctiveInvoice_receipt: 'Corr rec.',
            generalPrint: 'General',
            recipe: 'Recipe'
          },

          title: {
            invoice: 'Invoice details',
            invoice_receipt: 'Receipt details',
            //withdrawSlip: 'Szczegóły KW',
            //depositSlip: 'Szczegóły KP',
            correctiveInvoice: 'Corrective invoice details',
            correctiveInvoice_receipt: 'Corrective receipt details',
            recipe: 'Recipe'
          },

          newTitle: {
            invoice: 'Creating new invoice',
            invoice_receipt: 'Creating new receipt',
            //withdrawSlip: 'Tworzenie nowego KW',
            //depositSlip: 'Tworzenie nowego KP',
            correctiveInvoice: 'Creating new corrective invoice',
            correctiveInvoice_receipt: 'Creating new corrective receipt'
          },

          saved: {
            invoice: 'Invoice created',
            invoice_receipt: 'Receipt created',
            //withdrawSlip: 'Utworzono KW',
            //depositSlip: 'Utworzono KP',
            correctiveInvoice: 'Corrective invoice created',
            correctiveInvoice_receipt: 'Corrective receipt created'
          },

          updated: {
            invoice: 'Invoice changes saved',
            invoice_receipt: 'Receipt changes saved',
            //withdrawSlip: 'Zapisano zmiany KW',
            //depositSlip: 'Zapisano zmiany KP',
            correctiveInvoice: 'Corrective invoice changes saved',
            correctiveInvoice_receipt: 'Corrective receipt changes saved'
          },

          positions: {
            invoice_receipt: 'Receipt positions',
            invoice: 'Invoice positions',
            corrective_receipt: 'Positions after corrections',
            corrective: 'Positions after corrections'
          }
        },

        issuanceDate: 'Issuance date',
        sellDate: 'Sell date',
        sellPlace: 'Sell place',
        dueDate: 'Due date',
        paymentType: 'Payment type',
        bankAccountNumber: 'Bank account no.',

        enum: {
          PaymentType: {
            CASH: 'Cash',
            TRANSFER: 'Transfer'
          }
        },

        entity: {
          fields: {
            number: 'Number',
            comments: 'Comment'
          },
          buyer: {
            id: 'Buyer'
          },
          seller: {
            id: 'Seller'
          }
        }

      });
    });
