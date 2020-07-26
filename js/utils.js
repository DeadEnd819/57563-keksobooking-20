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

  var arrayRandElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var cutArray = function (arr) {
    var newArray = arr.slice();
    newArray.length = getRandomInRange(1, newArray.length);
    return newArray;
  };

  var shuffleArray = function (arr) {
    var newArray = arr.slice();
    for (var i = 0; i < newArray.length; i++) {
      var j = getRandomInRange(0, newArray.length - 1);
      var temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }

    return cutArray(newArray);
  };

  window.utils = {
    debounce: debounce,
    getRandomInRange: getRandomInRange,
    arrayRandElement: arrayRandElement,
    cutArray: cutArray,
    shuffleArray: shuffleArray,
  };
})();
