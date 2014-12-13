define(['app/utils', 'app/fdSet'], function (utils, fdSets) {

    return function closure (fdSet, attr) {
        var closure = arrayize(attr);

        var fds = fdSet.getFds();
        for (var i = 0; i < fds.length; i++) {
            if (isSubsetOf(fds[i].getIndependent(), closure)) {
                if (!isSubsetOf(fds[i].getDependent(), closure)) {
                    setConcat(closure, fds[i].getDependent());
                    i = -1;
                }
            }
        };

        return closure;
    }

    function arrayize (strarr) {
        if (utils.isArray(strarr)) {
            return strarr;
        } else if (typeof strarr === "string") {
            return [strarr];
        } else {
            return [];
        }
    }

    // Only adds the element if it's not already in there
    function setConcat (arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                arr1.push(arr2[i]);
            }
        };

        return arr1;
    }

    // Shallow
    function isSubsetOf(arr1, arr2) {
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



});