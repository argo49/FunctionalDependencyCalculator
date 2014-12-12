define(['app/fdSet', 'app/fdFormatter', 'app/utils'], function (fdSet, fdFormatter, utils) {

  var fdCalculator = angular.module('fdCalculator',[]);

  fdCalculator.controller('InputController', [
    '$scope',
    function InputController ($scope) {

      $scope.fdSet = fdSet().addNewFd();

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