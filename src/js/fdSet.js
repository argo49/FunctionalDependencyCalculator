define(['app/fd'], function (fd) {
    return function () {
        var that = {}

        var _fds = [];

        that.getFds = function () {
            return _fds;
        }

        that.getFd = function (id, callback) {
            return findFd(id);
        }

        that.addFd = function (indy, dep) {
            _fds.push(fd(indy, dep));
            return this;
        }

        that.addNewFd = function () {
            that.addFd([],[]);
            return this;
        }

        that.clone = function () {
            var it = {};
            var prop;

            for (prop in that) {
                if (that.hasOwnProperty(prop)) {
                    it[prop] = that[prop];
                }
            }

            var itFds = [];
            for (var i = 0; i < _fds.length; i++) {
                itFds.push(_fds[i]);
            };

            var _fds = itFds;

            return it;
        }

        that.removeFd = function (id, callback) {
            findFd(id, function(i) {
                if (typeof callback === "function"){
                    callback(i, _fds[i]);
                }
                _fds.splice(i, 1);
            });
            return this;
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