'use strict';

(function () {
  window.pin = {
    createPin: function (ad) {
      var pinElement = window.util.pinTemplate.cloneNode(true);
      pinElement.style.left = ad.location.x - window.util.PIN_WIDTH / 2 + 'px';
      pinElement.style.top = ad.location.y - window.util.PIN_HEIGHT + 'px';
      pinElement.querySelector('img').src = ad.author.avatar;
      pinElement.querySelector('img').alt = ad.offer.title;
      return pinElement;
    },
    getPinsArr: function (mapPins) {
      var elems = mapPins.querySelectorAll('.map__pin');
      var elemsArr = [];

      for (var i = 1; i < elems.length; i++) {
        elemsArr[i - 1] = elems[i];
      }
      window.util.pinsArr = elemsArr;
    },
    activatePins: function (ads) {
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        fragment.appendChild(this.createPin(ads[i]));
      }
      mapPins.appendChild(fragment);
      this.getPinsArr(mapPins);
    },
  };
})();
