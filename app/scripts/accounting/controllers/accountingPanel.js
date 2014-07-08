'use strict';

/**
 * @ngdoc function
 * @name mt.accounting.controller:AccountingPanelCtrl
 * @description
 * # AccountingPanelCtrl
 * Controller of the mt.accounting
 */
angular.module('mt.accounting')
    .controller('AccountingPanelCtrl', function ($scope, $http, $location, CashRegister, CashRegisterReport) {
      $scope.setTitle("Panel administracji księgowej");

      $scope.firstPercent = 32;
      $scope.firstOptions = {
        animate:{
          duration:1000,
          enabled:true
        },
        barColor:'#2C3E50',
        scaleColor:'#aaa',
        lineWidth:4,
        lineCap:'circle'
      };

      $scope.secondPercent = 44;
      $scope.secondOptions = {
        animate:{
          duration:1000,
          enabled:true
        },
        barColor:'#ef1e25',
        scaleColor:'#aaa',
        lineWidth:4,
        lineCap:'circle'
      };

      $scope.thirdPercent = 17;
      $scope.thirdOptions = {
        animate:{
          duration:1000,
          enabled:true
        },
        barColor:'#2C3E50',
        scaleColor:'#aaa',
        lineWidth:4,
        lineCap:'circle'
      };

    });
