define([
  'app/fdSet',
  'app/fdFormatter',
  'app/utils',
  'app/fdClosure',
  'app/fdCanonical',
  'please/please.min'],
  function (fdSet, fdFormatter, utils, closure, canonical, please) {

  var fdCalculator = angular.module('fdCalculator',[]);

  Please.make_scheme({
    scheme_type: 'analogous', //set scheme type
    format: 'rgb-string' //give it to us in rgb
  });

  fdCalculator.controller('InputController', [
    '$scope',
    function InputController ($scope) {

      $scope.fdSet = fdSet().addNewFd();
      $scope.canonicalCover;

/*
        .addFd(['a'],['b'])
        .addFd(['a','b'],['c'])
        .addFd(['d'],['a','c'])
        .addFd(['d'],['e'])
*/


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
        addNewColor();
      }
      $scope.calculateCanonical = function () {
        $scope.canonicalCover = canonical($scope.fdSet);
      }

      $scope.calculateClosure = function () {
        var clo = $scope.closure.split('');
        console.log(closure($scope.fdSet, clo));
      }

      function addNewColor () {
        $scope.$watch('fdSet', function() {
            var uls = document.querySelectorAll('.fd-values')
            var lastUl  = uls[uls.length - 1];

            lastUl.style.borderColor = Please.make_color();

        }, true);
      }

    }
  ]);

  fdCalculator.controller('FdController', [
    '$scope',
    function InputController ($scope) {
      $scope.record = function (id, $event) {

        var dep  = fdFormatter.split($scope.dependent);
        var indy = fdFormatter.split($scope.independent);

        var fd   = $scope.fdSet.getFd(id);

        fd.setDependent(dep);
        fd.setIndependent(indy);

        if ($event) {
          if ($event.which == 13) {
            $scope.addNewFd();
          } else if ($event.which == 9) {
            $scope.addNewFd();
          }
        }

      };

      $scope.analyzeInput = function ($event) {
        if ($event.which == 9) {
          $scope.addNewFd();
        }
      }
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