
define([], function () {

    var getUniqueID = function() {
        var UNIQUE_ID = 0;
        return function () {
            return UNIQUE_ID++;
        }
    }();

    return function fd(indy, dep) {

        var that = {};

        var _dependent   = (isValid(dep))?  dep  : [];
        var _independent = (isValid(indy))? indy : [];
        var _id          = getUniqueID();

        var _fdSplit = /\,\s*/;

        that.getDependent = function () {
            return _dependent;
        }

        that.setDependent = function (dep) {
            if (isArray(dep)) {
                _dependent = dep;
            }
            return this;
        }

        that.addDependent = function (str) {
            add(_dependent, str);
        }

        that.removeDependent = function (stridx) {
            remove(_dependent, stridx);
        }

        that.getIndependent = function () {
            return _independent;
        }

        that.setIndependent = function (indy) {
            if (isArray(indy)) {
                _independent = indy;
            }
            return this;
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

        function splitFdString (str) {
            if (typeof str !== "string") {
                return str;
            } else {
                return str.split(_fdSplit);
            }
        }

        function isArray (arr) {
            return Object.prototype.toString.call() === '[object Array]';
        }

        function isValid (strarr) {
            if (isArray(strarr)) {
                return true;
            } else if (typeof strarr === "string") {
                dep = splitFdString(strarr);
                return true;
            }
        }

        return that;
    }

});