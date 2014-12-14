define([], function () {
    that = {};

    that.setDifference = function (arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr2.length; j++) {
                if (arr1[i] = arr2[j]) {
                    arr1.splice(i,1);
                    i--; j = -1;
                }
            };
        };

        return arr1;
    }

    that.isIn = function (arr, attr) {
        return arr.indexOf(attr) > -1;
    }

    that.isSubset = function (arr1, arr2) {
        if (arr1.length > arr2.length) { return false }

        var isIn;

        for (var i = 0; i < arr1.length; i++) {
            isIn = false;
            for (var j = 0; j < arr2.length; j++) {
                if (arr2[j] == arr1[i]) {
                    isIn = true;
                    j = arr2.length;
                }
            };
            if (!isIn) {
                return false;
            }
        };

        return true;

    }

    // Only adds the element if it's not already in there
    that.setCombine = function (arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                arr1.push(arr2[i]);
            }
        };

        return arr1;
    }

    // shallow, assumes both are sets (unique elements only)
    that.areEqual = function (arr1, arr2) {
        if (arr1.length != arr2.length) { return false; }

        for (var i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) == -1) {
                return false;
            }
        }

        return true;

    }

    return that;
});