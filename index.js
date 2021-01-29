"use strict";
exports.__esModule = true;
var RNStorage;
(function (RNStorage) {
    function set(key, data) {
        return new Promise(function (resolve, reject) {
            window.localStorage.setItem(key, JSON.stringify(data));
            resolve();
        });
    }
    RNStorage.set = set;
    function get(key) {
        return new Promise(function (resolve, reject) {
            var item = window.localStorage.getItem(key);
            if (item == null) {
                resolve(null);
            }
            else {
                try {
                    var jd = JSON.parse(item);
                    resolve(jd);
                }
                catch (e) {
                    resolve(item);
                }
            }
        });
    }
    RNStorage.get = get;
    /**
     * Assign the project to an employee.
     * @param {string} conf.key - RNStorage key
     * @param {string} conf.onChange - Callback when change detected
     * @param {string} conf.error - Error callback
     * @param {string} [conf.onInit] - Fire callback when watch is initiated
     */
    function watch(conf) {
        var onStorage = function () {
            var item = window.localStorage.getItem(conf.key);
            if (item == null) {
                conf.onChange(null);
            }
            else {
                try {
                    var jd = JSON.parse(item);
                    conf.onChange(jd);
                }
                catch (e) {
                    conf.onChange(item);
                }
            }
        };
        var value = window.localStorage.getItem(conf.key);
        setInterval(function () {
            var currentValue = window.localStorage.getItem(conf.key);
            if (value != currentValue) {
                value = currentValue;
                onStorage();
            }
        }, 1);
    }
    RNStorage.watch = watch;
})(RNStorage || (RNStorage = {}));
exports["default"] = RNStorage;
