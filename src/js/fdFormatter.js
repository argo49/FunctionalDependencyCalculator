define([], function () {
    var that = {};

    _fdSplit = /\,\s*/;

    that.split = function (str) {
        if (typeof str === "string") {
            return str.split(_fdSplit);
        }
    }

    return that;
});