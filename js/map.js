'use strict';

(function () {
  var pinDataName = [];
  var pinsArr = [];

  window.map = {
    pinDataName: pinDataName,
    pinsArr: pinsArr,
    openCard: function (evt) {
      var buttonPressed = evt.button;

      if (buttonPressed === 0 || evt.key === 'Enter') {
        for (var i = 0; i < window.map.pinsArr.length; i++) {
          window.map.pinsArr[i].classList.remove('map__pin--active');

          if (window.map.pinDataName[i] === this.dataset.id) {
            window.card.createCard(window.data.arrAds[i], window.map.pinsArr[i]);
            window.map.pinsArr[i].classList.add('map__pin--active');
          }
        }
      }
    },
    pinsAddEventOpenCard: function () {
      for (var i = 0; i < window.map.pinsArr.length; i++) {
        window.map.pinsArr[i].addEventListener('mousedown', this.openCard);
        window.map.pinsArr[i].addEventListener('keydown', this.openCard);
      }
    },
    pinsRemoveEventOpenCard: function () {
      for (var i = 0; i < this.pinsArr.length; i++) {
        window.map.pinsArr[i].removeEventListener('mousedown', this.openCard);
        window.map.pinsArr[i].removeEventListener('keydown', this.openCard);
      }
    },
    setMainPinAddress: function () {
      var pinLeft = window.elements.mapPinMain.style.left;
      var pinTop = window.elements.mapPinMain.style.top;
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
    },
  };

  // ====================================================================================================//
  window.elements.mapPinMain.addEventListener('mousedown', function (evt) {
    var mainPin = window.elements.mapPinMain;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
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

      if (parseInt(mainPin.style.top, 10) - shift.y >= window.constants.LOCATION_Y_MIN - window.constants.PIN_HEIGHT &&
        parseInt(mainPin.style.top, 10) - shift.y <= window.constants.LOCATION_Y_MAX - window.constants.PIN_HEIGHT) {
        mainPin.style.top = (window.elements.mapPinMain.offsetTop - shift.y) + 'px';
      }

      if (parseInt(mainPin.style.left, 10) - shift.x >= window.constants.LOCATION_X_MIN - window.constants.PIN_WIDTH / 2 &&
        parseInt(mainPin.style.left, 10) - shift.x <= window.constants.LOCATION_X_MAX - window.constants.PIN_WIDTH / 2) {
        mainPin.style.left = (window.elements.mapPinMain.offsetLeft - shift.x) + 'px';
      }

      window.map.setMainPinAddress();
    };

    var onMouseUp = function () {
      window.map.setMainPinAddress();
      window.elements.mapPins.removeEventListener('mousemove', onMouseMove);
      window.elements.mapPins.removeEventListener('mouseup', onMouseUp);
    };

    window.elements.mapPins.addEventListener('mousemove', onMouseMove);
    window.elements.mapPins.addEventListener('mouseup', onMouseUp);
  });
  // ====================================================================================================//
})();
