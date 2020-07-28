'use strict';

(function () {
  var create = function (ad) {
    var pinElement = window.elements.pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - window.constants.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - window.constants.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };

  var resetMain = function () {
    if (window.map.startMainPinTop === 0 && window.map.startMainPinLeft === 0) {
      window.map.startMainPinTop = window.elements.mapPinMain.style.top;
      window.map.startMainPinLeft = window.elements.mapPinMain.style.left;
      return;
    }
    window.elements.mapPinMain.style.top = window.map.startMainPinTop;
    window.elements.mapPinMain.style.left = window.map.startMainPinLeft;
  };

  var remove = function () {
    if (window.map.dataPins !== []) {
      window.map.dataPins.forEach(function (pin) {
        pin.remove();
      });
    }
    window.map.dataPins = [];
  };

  var setData = function (mapPins) {
    var pins = mapPins.querySelectorAll('.map__pin');
    var elems = [];

    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        elems.push(pin);
      }
    });

    window.map.dataPins = elems;
  };

  var activate = function (ads) {
    var fragment = document.createDocumentFragment();
    var adsMaxCount = ads.length < window.constants.NUMBER_ADS ? ads.length : window.constants.NUMBER_ADS;

    for (var i = 0; i < adsMaxCount; i++) {
      var elem = create(ads[i]);
      elem.dataset.id = 'pin_' + i;
      window.map.pinDataNames[i] = elem.dataset.id;
      fragment.appendChild(elem);
    }
    window.elements.mapPins.appendChild(fragment);
    window.pin.setData(window.elements.mapPins);
  };

  window.pin = {
    create: create,
    resetMain: resetMain,
    remove: remove,
    setData: setData,
    activate: activate,
  };
})();
