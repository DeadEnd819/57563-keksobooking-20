'use strict';

(function () {
  var pinDataName = [];
  var pinsArr = [];

  window.map = {
    pinDataName: pinDataName,
    pinsArr: pinsArr,
    onClickOpenCard: function (evt) {
      var buttonPressed = evt.button;

      if (buttonPressed === 0 || evt.key === 'Enter') {
        if (window.card.activePin !== '') {
          window.card.activePin.classList.remove('map__pin--active');
        }

        for (var i = 0; i < window.map.pinsArr.length; i++) {
          if (window.map.pinDataName[i] === evt.target.dataset.id || window.map.pinDataName[i] === evt.target.parentElement.dataset.id) {
            window.card.createCard(window.data.arrAds[i], window.map.pinsArr[i]);
            window.map.pinsArr[i].classList.add('map__pin--active');
            break;
          }
        }
      }
    },
    pinsAddEventOpenCard: function () {
      window.elements.mapPins.addEventListener('click', this.onClickOpenCard);
      window.elements.mapPins.addEventListener('keydown', this.onClickOpenCard);
    },
    pinsRemoveEventOpenCard: function () {
      window.elements.mapPins.removeEventListener('click', this.onClickOpenCard);
      window.elements.mapPins.removeEventListener('keydown', this.onClickOpenCard);
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
  var startCoords = {
    x: 0,
    y: 0,
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
  };

  window.elements.mapPinMain.addEventListener('mousedown', function (evt) {
    startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    window.elements.mapPins.addEventListener('mousemove', onMouseMove);
    window.elements.mapPins.addEventListener('mouseup', onMouseUp);
  });
  // ====================================================================================================//
})();
