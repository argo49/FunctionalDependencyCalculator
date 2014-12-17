define([
  'app/fdSet',
  'app/fdFormatter',
  'app/utils',
  'app/fdClosure',
  'app/fdCanonical',
  'please/please.min'],
  function (fdSet, fdFormatter, utils, closure, canonical, please) {

  // Define the app module
  var fdCalculator = angular.module('fdCalculator',[]);

  // Define a servide for the user's fdSet
  fdCalculator.factory('UserFdSet', function () {
    return fdSet().addNewFd();
  });

  fdCalculator.controller('SchemaController', ['$scope',
    function SchemaController ($scope) {
      $scope.attributes = [];
      $scope.record = function () {
        $scope.attributes = fdFormatter.split($scope.schema);
      };
    }
  ]);

  fdCalculator.controller('InputController', ['$scope', 'UserFdSet',
    function InputController ($scope, UserFdSet) {

      $scope.fdSet = UserFdSet;

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

        // After it's inserted into DOM
        $scope.$watch('fdSet', function() {
          addNewColor();
        }, true);
      }

      $scope.calculateClosure = function () {
        var clo = $scope.closure.split('');
        console.log(closure($scope.fdSet, clo));
      }

      function addNewColor () {
        var uls    = document.querySelectorAll('.fd-values')
        var lastUl = uls[uls.length - 1];

        lastUl.style.borderColor = Please.make_color();
      }

    }
  ]);

  fdCalculator.controller('FdController', ['$scope','UserFdSet',
    function FdController ($scope, UserFdSet) {

      // Sync it up with the model
      $scope.record = function (id) {

        var dep  = fdFormatter.split($scope.dependent);
        var indy = fdFormatter.split($scope.independent);

        var fd   = UserFdSet.getFd(id);

        fd.setDependent(dep);
        fd.setIndependent(indy);

      };

      // Watch for the tab press to add a new fd
      $scope.analyzeInput = function ($event) {
        if ($event.which == 9) {
          $scope.addNewFd();
        }
      }
    }
  ]);

  fdCalculator.controller('CanonicalController', ['$scope', 'UserFdSet',
    function CanonicalController ($scope, UserFdSet) {
      $scope.canonicalCover;

      $scope.calculateCanonical = function () {
        $scope.canonicalCover = canonical(UserFdSet);
      }
    }
  ]);

  fdCalculator.controller('ClosureController', ['$scope', 'UserFdSet',
    function ClosureController ($scope, UserFdSet) {
      $scope.closure;

      $scope.record = function () {
        $scope.splitClosure = fdFormatter.split($scope.userClosure);
      };

      $scope.calculateClosure = function () {
        var parsedClosure = fdFormatter.split($scope.userClosure);
        $scope.closure = closure(UserFdSet, parsedClosure);
      }
    }
  ]);

});