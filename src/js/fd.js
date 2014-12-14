
define(['app/fdFormatter', 'app/utils'], function (format, utils) {

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

        that.getDependent = function () {
            return _dependent.slice(0);
        }

        that.setDependent = function (dep) {
            if (utils.isArray(dep)) {
                _dependent = dep;
            }
            return this;
        }

        that.addDependent = function (str) {
            add(_dependent, str);
        }

        that.removeDependent = function (stridx) {
            return remove(_dependent, stridx);
        }

        that.getIndependent = function () {
            return _independent.slice(0);
        }

        that.setIndependent = function (indy) {
            if (utils.isArray(indy)) {
                _independent = indy;
            }
            return this;
        }

        that.addIndependent = function (str) {
            add(_independent, str);
        }

        that.removeIndependent = function (stridx) {
            return remove(_independent, stridx);
        }

        that.getId = function () {
            return _id;
        }

        that.print = function () {
            console.log(_independent, " -> ", _dependent);
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
            var attrToReturn;
            if (typeof stridx === "string") {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == stridx) {
                        attrToReturn = arr[i];
                        arr.splice(stridx, 1);
                    }
                }
            } else if (typeof stridx === "number") {
                attrToReturn = arr[stridx];
                arr.splice(stridx, 1);
            }

            return attrToReturn;
        }

        function splitFdString (str) {
            if (typeof str !== "string") {
                return str;
            } else {
                return str.split(_fdSplit);
            }
        }

        function isValid (strarr) {
            if (utils.isArray(strarr)) {
                return true;
            } else if (typeof strarr === "string") {
                dep = formatter.split(strarr);
                splitFdString(strarr);
                return true;
            }
        }

        return that;
    }

});