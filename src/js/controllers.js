define([
  'app/fdSet',
  'app/fdFormatter',
  'app/utils',
  'app/fdClosure',
  'app/fdCanonical'],
  function (fdSet, fdFormatter, utils, closure, canonical) {

  var fdCalculator = angular.module('fdCalculator',[]);

  fdCalculator.controller('InputController', [
    '$scope',
    function InputController ($scope) {

      $scope.fdSet = fdSet().addNewFd();

      var fset2 = fdSet()
      /*
        .addFd(['a'],['b','c'])
        .addFd(['c'],['a','d'])
        .addFd(['e'],['a','b','c'])
        .addFd(['f'],['c','d'])
        .addFd(['c','d'],['b','e','f'])
        .addFd(['a','b'],['d'])*/
/*
        .addFd(['a'],['c','b'])
        .addFd(['c','d'],['e'])
        .addFd(['b'],['d'])
        .addFd(['e'],['a'])
*/
/*
        .addFd(['a','b'],['c'])
        .addFd(['b'],['e'])
        .addFd(['c','f'],['d'])
        .addFd(['c'],['a'])
        .addFd(['b'],['f'])
        .addFd(['c','e'],['f'])
        .addFd(['c','d'],['b'])
        .addFd(['b'],['c'])
*/
/*
        .addFd(['a'],['b'])
        .addFd(['a','b'],['c'])
        .addFd(['d'],['a','c'])
        .addFd(['d'],['e'])
*/
      console.log(closure(fset2, ['c']));

      canonical(fset2, 'a');


      $scope.getFD = function (id, callback) {
        fdSet.getFd(id);
      };
      $scope.removeFd = function (id) {
        $scope.fdSet.removeFd(id, function (idx, fdi) {
          document.getElementById('fd-' + fdi.getId()).remove();
        });
      }
      $scope.addNewFd = function () {
        $scope.fdSet.addNewFd();
      }
      $scope.calculateCanonical = function () {

      }
    }
  ]);

  fdCalculator.controller('FdController', [
    '$scope',
    function InputController ($scope) {
      $scope.record = function (id) {

        var dep  = fdFormatter.split($scope.dependent);
        var indy = fdFormatter.split($scope.independent);

        var fd   = $scope.fdSet.getFd(id);

        fd.setDependent(dep);
        fd.setIndependent(indy);

      };
    }
  ]);

  fdCalculator.controller('SchemaController', [
    '$scope',
    function SchemaController ($scope) {
      $scope.attributes = [];
      $scope.record = function () {
        $scope.attributes = fdFormatter.split($scope.schema);
      };
    }
  ]);

});