define(['app/fdSet', 'app/fdFormatter'], function (fdSet, format) {

  var fdCalculator = angular.module('fdCalculator',[]);

  fdCalculator.controller('InputController', [
    '$scope',
    function InputController ($scope) {

      $scope.fdSet = fdSet().addNewFd();

      $scope.getFD = function (id, callback) {
        fdSet.getFd(id);
      };
      $scope.removeFD = function (id) {
        $scope.fdSet.removeFd(id, function () {
          document.getElementById('fd-' + id).remove();
        });
      }
      $scope.calculateCanonical = function () {

      }

    }
  ]);

  fdCalculator.controller('FdController', [
    '$scope',
    function InputController ($scope) {
      $scope.record = function (id) {
        $scope.fdSet.getFd(id).setDependent($scope.dependent);
        $scope.fdSet.getFd(id).setIndependent($scope.independent);
      };
    }
  ]);

  fdCalculator.controller('SchemaController', [
    '$scope',
    function SchemaController ($scope) {
      $scope.attributes = [];
      $scope.record = function () {
        $scope.attributes = format.split($scope.schema);
      };
    }
  ]);

});