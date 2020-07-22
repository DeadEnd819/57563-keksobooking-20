'use strict';

(function () {
  window.pin = {
    createPin: function (ad) {
      var pinElement = window.elements.pinTemplate.cloneNode(true);
      pinElement.style.left = ad.location.x - window.constants.PIN_WIDTH / 2 + 'px';
      pinElement.style.top = ad.location.y - window.constants.PIN_HEIGHT + 'px';
      pinElement.querySelector('img').src = ad.author.avatar;
      pinElement.querySelector('img').alt = ad.offer.title;
      return pinElement;
    },
    setPinsArr: function (mapPins) {
      var elems = mapPins.querySelectorAll('.map__pin');
      var elemsArr = [];

      for (var i = 1; i < elems.length; i++) {
        elemsArr[i - 1] = elems[i];
      }
      window.map.pinsArr = elemsArr;
    },
    activatePins: function (ads) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        var elem = this.createPin(ads[i]);
        elem.dataset.id = 'pin_' + i;
        window.map.pinDataName[i] = elem.dataset.id;
        fragment.appendChild(elem);
      }
      window.elements.mapPins.appendChild(fragment);
      this.setPinsArr(window.elements.mapPins);
    },
  };
})();
