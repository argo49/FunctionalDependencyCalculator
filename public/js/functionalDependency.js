
define([], function () {

    var getUniqueID = function() {
        var UNIQUE_ID = 0;
        return function () {
            return UNIQUE_ID++;
        }
    }();

    return function fd(indy, dep) {

        var that = {};

        var _dependent   = (isArray(dep))?  dep  : [];
        var _independent = (isArray(indy))? indy : [];
        var _id          = getUniqueID();

        that.getDependent = function () {
            return _dependent;
        }

        that.getIndependent = function () {
            return _independent;
        }

        that.addDependent = function (str) {
            add(_dependent, str);
        }

        that.removeDependent = function (stridx) {
            remove(_dependent, stridx);
        }

        that.addIndependent = function (str) {
            add(_dependent, str);
        }

        that.removeIndependent = function (stridx) {
            remove(_dependent, stridx);
        }

        that.getId = function () {
            return _id;
        }

        function add(arr, str) {
            if (typeof str !== "string") {
                return false;
            } else {
                arr.push(str);
                return that;
            }
        }

        function remove(arr, stridx) {
            if (typeof stridx === "string") {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == stridx) {
                        arr.splice(stridx, 1);
                    }
                }
            } else if (typeof stridx === "number") {
                arr.splice(stridx, 1);
            }
        }

        function isArray (arr) {
            return Object.prototype.toString.call() === '[object Array]';
        }

        return that;
    }

});