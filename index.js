"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
exports.watch = watch;

function set(key, data) {
  return new Promise(function (resolve, reject) {
    window.localStorage.setItem(key, JSON.stringify(data));
    resolve();
  });
}

function get(key) {
  return new Promise(function (resolve, reject) {
    var item = window.localStorage.getItem(key);

    if (item == null) {
      resolve(null);
    } else {
      try {
        var jd = JSON.parse(item);
        resolve(jd);
      } catch (e) {
        resolve(item);
      }
    }
  });
}

function watch(conf) {
  var onStorage = function onStorage() {
    var item = window.localStorage.getItem(conf.key);

    if (item == null) {
      conf.onChange(null);
    } else {
      try {
        var jd = JSON.parse(item);
        conf.onChange(jd);
      } catch (e) {
        conf.onChange(item);
      }
    }
  };

  if (conf.onInit) {
    onStorage();
  }

  var value = window.localStorage.getItem(conf.key);
  setInterval(function () {
    var currentValue = window.localStorage.getItem(conf.key);

    if (value != currentValue) {
      value = currentValue;
      onStorage();
    }
  }, 1);
}
