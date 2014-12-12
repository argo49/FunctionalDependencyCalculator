define(['app/functionalDependency'], function (fd) {
    return function () {
        var that = {}

        var _fds     = [];
        var _fdSplit = /\,\s*/;

        that.getFds = function () {
            return _fds;
        }

        that.getFd = function (id) {
            return findFd(id);
        }

        that.addFd = function (indy, dep) {
            indy = splitFdString(indy);
            dep  = splitFdString(dep);

            _fds.push(fd(indy, dep));
            return this;
        }

        that.addNewFd = function () {
            that.addFd([],[]);
            return this;
        }

        that.removeFd = function (id) {
            findFd(id, function(i) {
                _fds.splice[i, 1];
            });
            return this;
        }

        function splitFdString (str) {
            if (typeof str !== "string") {
                return str;
            } else {
                return str.split(_fdSplit);
            }
        }

        function findFd (id, callback) {
            for (var i = 0; i < _fds.length; i++) {
                if (_fds[i].getId() == id) {
                    if (typeof callback === "function") {
                        callback(i, _fds[i]);
                    }
                    return _fds[i];
                }
            }
        }

        return that;
    }
});