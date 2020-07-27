'use strict';

(function () {
  var createPin = function (ad) {
    var pinElement = window.elements.pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - window.constants.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - window.constants.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };

  var resetMainPin = function () {
    if (window.map.startMainPinTop === 0 && window.map.startMainPinLeft === 0) {
      window.map.startMainPinTop = window.elements.mapPinMain.style.top;
      window.map.startMainPinLeft = window.elements.mapPinMain.style.left;
      return;
    }
    window.elements.mapPinMain.style.top = window.map.startMainPinTop;
    window.elements.mapPinMain.style.left = window.map.startMainPinLeft;
  };

  var deletePins = function () {
    if (window.map.dataPins !== []) {
      window.map.dataPins.forEach(function (it) {
        it.remove();
      });
    }
    window.map.dataPins = [];
  };

  var setDataPins = function (mapPins) {
    var pins = mapPins.querySelectorAll('.map__pin');
    var elems = [];

    pins.forEach(function (it) {
      if (!it.classList.contains('map__pin--main')) {
        elems.push(it);
      }
    });

    window.map.dataPins = elems;
  };

  var activatePins = function (ads) {
    var fragment = document.createDocumentFragment();
    var adsMaxCount = ads.length < window.constants.NUMBER_ADS ? ads.length : window.constants.NUMBER_ADS;

    for (var i = 0; i < adsMaxCount; i++) {
      var elem = createPin(ads[i]);
      elem.dataset.id = 'pin_' + i;
      window.map.pinDataName[i] = elem.dataset.id;
      fragment.appendChild(elem);
    }
    window.elements.mapPins.appendChild(fragment);
    window.pin.setDataPins(window.elements.mapPins);
  };

  window.pin = {
    createPin: createPin,
    resetMainPin: resetMainPin,
    deletePins: deletePins,
    setDataPins: setDataPins,
    activatePins: activatePins,
  };
})();
