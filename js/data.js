'use strict';

(function () {
  var createTestAd = function (number) {
    var arrAds = [];

    for (var i = 0; i < number; i++) {
      var locationX = window.utils.getRandomInRange(window.constants.LOCATION_X_MIN, window.constants.LOCATION_X_MAX);
      var locationY = window.utils.getRandomInRange(window.constants.LOCATION_Y_MIN, window.constants.LOCATION_Y_MAX);
      var ad = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          title: 'Заголовок',
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomInRange(1, 5000),
          type: window.utils.arrayRandElement(window.constants.TYPES),
          rooms: window.utils.getRandomInRange(1, 100),
          guests: window.utils.getRandomInRange(0, 3),
          checkin: window.utils.arrayRandElement(window.constants.CHECKINS),
          checkout: window.utils.arrayRandElement(window.constants.CHECKOUTS),
          features: window.utils.shuffleArray(window.constants.FEATURES),
          description: 'Описание',
          photos: window.utils.shuffleArray(window.constants.PHOTOS),
        },
        location: {
          x: locationX,
          y: locationY,
        },
      };
      arrAds.push(ad);
    }
    return arrAds;
  };

  window.data = {
    createTestAd: createTestAd,
    arrAds: [],
  };
})();
