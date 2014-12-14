define([], function () {
    var that = {};

    that.isArray = function(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    that.arrayize = function (strarr) {
        if (utils.isArray(strarr)) {
            return strarr;
        } else if (typeof strarr === "string") {
            return [strarr];
        } else {
            return [];
        }
    }

    // shallow
    that.arraysAreEqual = function (arr1, arr2) {
        if (arr1.length != arr2.length) { return false; }
        for (var i = 0; i < arr1.length; i++) {
            if(arr1[i] != arr2[i]) {
                return false;
            }
        };

        return true;
    }

    return that;
});