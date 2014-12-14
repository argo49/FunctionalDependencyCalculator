define(['app/utils', 'app/fdSet', 'app/setOperations'],
    function (utils, fdSets, sets) {

    return function closure (fdSet, attr) {
        var closure = arrayize(attr);

        var fds = fdSet.getFds();
        for (var i = 0; i < fds.length; i++) {
            if (sets.isSubset(fds[i].getIndependent(), closure)) {
                if (!sets.isSubset(fds[i].getDependent(), closure)) {
                    sets.setCombine(closure, fds[i].getDependent());
                    i = -1;
                }
            }
        };

        return closure;
    }

    function arrayize (strarr) {
        if (utils.isArray(strarr)) {
            return strarr.slice(0);
        } else if (typeof strarr === "string") {
            return [strarr];
        } else {
            return [];
        }
    }

});