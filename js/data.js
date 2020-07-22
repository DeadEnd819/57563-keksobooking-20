'use strict';

(function () {
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

  window.data = {
    createAd: function (number) {
      var arrAds = [];

      for (var i = 0; i < number; i++) {
        var locationX = getRandomInRange(window.constants.LOCATION_X_MIN, window.constants.LOCATION_X_MAX);
        var locationY = getRandomInRange(window.constants.LOCATION_Y_MIN, window.constants.LOCATION_Y_MAX);
        var ad = {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png',
          },
          offer: {
            title: 'Заголовок',
            address: locationX + ', ' + locationY,
            price: getRandomInRange(1, 5000),
            type: arrayRandElement(window.constants.TYPES),
            rooms: getRandomInRange(1, 100),
            guests: getRandomInRange(0, 3),
            checkin: arrayRandElement(window.constants.CHECKINS),
            checkout: arrayRandElement(window.constants.CHECKOUTS),
            features: shuffleArray(window.constants.FEATURES),
            description: 'Описание',
            photos: shuffleArray(window.constants.PHOTOS),
          },
          location: {
            x: locationX,
            y: locationY,
          },
        };
        arrAds.push(ad);
      }
      return arrAds;
    },
    arrAds: [],
  };
  window.data.arrAds = window.data.createAd(window.constants.NUMBER_ADS);
})();
