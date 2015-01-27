'use strict';

angular.module('mt.accounting')
    .config(function($translateProvider) {
      // polish translation
      $translateProvider.translations('pl', {

        cashDocument: {
          shortName: {
            invoice: 'FV',
            invoice_receipt: 'Par.',
            withdrawSlip: 'KW',
            depositSlip: 'KP',
            correctiveInvoice: 'FV koryg.',
            correctiveInvoice_receipt: 'Par. koryg.',
            generalPrint: 'Ogólny',
            recipe: 'Recepta'
          },

          title: {
            invoice: 'Szczegóły faktury',
            invoice_receipt: 'Szczegóły paragonu',
            withdrawSlip: 'Szczegóły KW',
            depositSlip: 'Szczegóły KP',
            correctiveInvoice: 'Szczegóły faktury korygującej',
            correctiveInvoice_receipt: 'Szczegóły paragonu korygującego',
            recipe: 'Recepta'
          },

          newTitle: {
            invoice: 'Tworzenie nowej faktury',
            invoice_receipt: 'Tworzenie nowego paragonu',
            withdrawSlip: 'Tworzenie nowego KW',
            depositSlip: 'Tworzenie nowego KP',
            correctiveInvoice: 'Tworzenie nowej faktury korygującej',
            correctiveInvoice_receipt: 'Tworzenie nowego paragonu korygującego'
          },

          saved: {
            invoice: 'Utworzono fakturę',
            invoice_receipt: 'Utworzono paragon',
            withdrawSlip: 'Utworzono KW',
            depositSlip: 'Utworzono KP',
            correctiveInvoice: 'Utworzono fakturę korygującą',
            correctiveInvoice_receipt: 'Utworzono paragon korygujący'
          },

          updated: {
            invoice: 'Zapisano zmiany faktury',
            invoice_receipt: 'Zapisano zmiany paragonu',
            withdrawSlip: 'Zapisano zmiany KW',
            depositSlip: 'Zapisano zmiany KP',
            correctiveInvoice: 'Zapisano zmiany faktury korygującej',
            correctiveInvoice_receipt: 'Zapisano zmiany paragonu korygującego'
          },

          positions: {
            invoice_receipt: 'Pozycje paragonu',
            invoice: 'Pozycje faktury',
            corrective_receipt: 'Pozycje po korekcie',
            corrective: 'Pozycje po korekcie'
          }
        },

        issuanceDate: 'Data wystawienia',
        sellDate: 'Data sprzedaży',
        sellPlace: 'Miejsce sprzedaży',
        dueDate: 'Termin płatności',
        paymentType: 'Typ płatności',
        bankAccountNumber: 'Nr konta bankowego',

        enum: {
          PaymentType: {
            CASH: 'Gotówka',
            TRANSFER: 'Przelew'
          }
        },

        entity: {
          fields: {
            number: 'Numer',
            comments: 'Komentarz'
          },
          buyer: {
            id: 'Kupujący'
          },
          seller: {
            id: 'Sprzedający'
          }
        }

      });
    });
