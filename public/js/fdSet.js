define(['app/fd'], function (fd) {
    return function fdSet() {
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

        that.removeFd = function (id, callback) {
            findFd(id, function(i) {
                if (typeof callback === "function"){
                    callback(i, _fds[i]);
                }
                _fds.splice(i, 1);
            });
            return this;
        }

        that.print = function () {
            console.log("===================");
            for (var i = 0; i < _fds.length; i++) {
                _fds[i].print();
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