'use strict';
(function () {
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var arrayRandElement = function (data) {
    var element = Math.floor(Math.random() * data.length);
    return data[element];
  };

  var cutArray = function (data) {
    var newData = data.slice();
    newData.length = getRandomInRange(1, newData.length);
    return newData;
  };

  var shuffleArray = function (data) {
    var newData = data.slice();
    for (var i = 0; i < newData.length; i++) {
      var j = getRandomInRange(0, newData.length - 1);
      var temp = newData[i];
      newData[i] = newData[j];
      newData[j] = temp;
    }

    return cutArray(newData);
  };

  window.utils = {
    debounce: debounce,
    getRandomInRange: getRandomInRange,
    arrayRandElement: arrayRandElement,
    cutArray: cutArray,
    shuffleArray: shuffleArray,
  };
})();
