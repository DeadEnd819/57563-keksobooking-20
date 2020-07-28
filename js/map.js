'use strict';

(function () {
  var pinDataNames = [];
  var dataPins = [];
  var startMainPinTop = 0;
  var startMainPinLeft = 0;
  var startCoords = {
    x: 0,
    y: 0,
  };

  var onClickOpenCard = function (evt) {
    var buttonPressed = evt.button;

    if (buttonPressed === window.constants.Buttons.mouseLeft || evt.key === window.constants.Buttons.enter) {
      if (window.card.activePin !== '') {
        window.card.activePin.classList.remove('map__pin--active');
      }
      for (var i = 0; i < window.map.dataPins.length; i++) {
        if (window.map.pinDataNames[i] === evt.target.dataset.id || window.map.pinDataNames[i] === evt.target.parentElement.dataset.id) {
          window.card.create(window.filter.alteredAds[i], window.map.dataPins[i]);
          window.map.dataPins[i].classList.add('map__pin--active');
          break;
        }
      }
    }
  };

  var pinsAddEventOpenCard = function () {
    window.elements.mapPins.addEventListener('click', onClickOpenCard);
    window.elements.mapPins.addEventListener('keydown', onClickOpenCard);
  };

  var pinsRemoveEventOpenCard = function () {
    window.elements.mapPins.removeEventListener('click', onClickOpenCard);
    window.elements.mapPins.removeEventListener('keydown', onClickOpenCard);
  };

  var setMainPinAddress = function () {
    var pinTop = 0;
    var pinLeft = 0;

    pinTop = window.elements.mapPinMain.style.top;
    pinLeft = window.elements.mapPinMain.style.left;

    var locationX;
    var locationY;

    if (window.main.activeDocument) {
      locationX = Math.round(parseInt(pinLeft, 10) + window.constants.PIN_WIDTH / 2);
      locationY = Math.round(parseInt(pinTop, 10) + window.constants.PIN_HEIGHT);
      window.elements.address.value = locationX + ', ' + locationY;
      return;
    }
    locationX = Math.round(parseInt(pinLeft, 10) + window.constants.PIN_WIDTH / 2);
    locationY = Math.round(parseInt(pinTop, 10) + window.constants.PIN_WIDTH / 2);
    window.elements.address.value = locationX + ', ' + locationY;
  };

  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (parseInt(window.elements.mapPinMain.style.top, 10) - shift.y >= window.constants.LOCATION_Y_MIN - window.constants.PIN_HEIGHT &&
      parseInt(window.elements.mapPinMain.style.top, 10) - shift.y <= window.constants.LOCATION_Y_MAX - window.constants.PIN_HEIGHT) {
      window.elements.mapPinMain.style.top = (window.elements.mapPinMain.offsetTop - shift.y) + 'px';
    }

    if (parseInt(window.elements.mapPinMain.style.left, 10) - shift.x >= window.constants.LOCATION_X_MIN - window.constants.PIN_WIDTH / 2 &&
      parseInt(window.elements.mapPinMain.style.left, 10) - shift.x <= window.constants.LOCATION_X_MAX - window.constants.PIN_WIDTH / 2) {
      window.elements.mapPinMain.style.left = (window.elements.mapPinMain.offsetLeft - shift.x) + 'px';
    }

    window.map.setMainPinAddress();
  };

  var onMouseUp = function () {
    window.map.setMainPinAddress();
    window.elements.mapPins.removeEventListener('mousemove', onMouseMove);
    window.elements.mapPins.removeEventListener('mouseup', onMouseUp);
    window.elements.mapPins.removeEventListener('mouseleave', onMouseUp);
  };

  window.elements.mapPinMain.addEventListener('mousedown', function (evt) {
    startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    window.elements.mapPins.addEventListener('mousemove', onMouseMove);
    window.elements.mapPins.addEventListener('mouseup', onMouseUp);
    window.elements.mapPins.addEventListener('mouseleave', onMouseUp);
  });

  window.map = {
    pinDataNames: pinDataNames,
    dataPins: dataPins,
    startMainPinTop: startMainPinTop,
    startMainPinLeft: startMainPinLeft,
    onClickOpenCard: onClickOpenCard,
    pinsAddEventOpenCard: pinsAddEventOpenCard,
    pinsRemoveEventOpenCard: pinsRemoveEventOpenCard,
    setMainPinAddress: setMainPinAddress,
  };
})();
