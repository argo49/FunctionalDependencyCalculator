define([], function () {
    var that = {};

    that.isArray = function(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    return that;
});