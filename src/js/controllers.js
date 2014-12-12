define(['app/fdSet'], function (fdSet) {

  var fdCalculator = angular.module('fdCalculator',[]);

  fdCalculator.controller('InputController', [
    '$scope',
    function InputController ($scope) {
      $scope.uniqueID = 0;

      $scope.FDs = [];

      $scope.getFD = function (id, callback) {
        for (var i = 0; i < $scope.FDs.length; i++) {
          if ($scope.FDs[i].id == id) {
            if (typeof callback == "function") {
              callback(i, $scope.FDs[i]);
            }
            return $scope.FDs[i];
          }
        }
      };
      $scope.addNewFD = function () {
        $scope.FDs.push({
          id: $scope.uniqueID++,
          dependent: [],
          independent: []
        });
      };
      $scope.removeFD = function (id) {
        $scope.getFD(id, function (idx) {
          $scope.FDs.splice(idx, 1);
          document.getElementById('fd-' + id).remove();
        });
      }
      $scope.calculateCanonical = function () {

      }

      $scope.addNewFD();

    }
  ]);

  fdCalculator.controller('FdController', [
    '$scope',
    function InputController ($scope) {
      var fdSplit = /\,\s*/;
      $scope.breakUpFD = function (fds) {
        return fds? fds.split(fdSplit) : [];
      };
      $scope.record = function (id) {
        $scope.getFD(id).dependent   = $scope.breakUpFD($scope.dependent);
        $scope.getFD(id).independent = $scope.breakUpFD($scope.independent);
      };
    }
  ]);

});