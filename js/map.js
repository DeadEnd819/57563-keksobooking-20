'use strict';

(function () {
  window.map = {
    openCard: function (evt) {
      var buttonPressed = evt.button;
      if (buttonPressed === 0 || evt.key === 'Enter') {
        for (var i = 0; i < window.util.pinsArr.length; i++) {
          if (window.util.pinDataName[i] === this.dataset.id) {
            window.card.createCard(window.data.arrAds[i]);
          }
        }
      }
    },
    pinsAddEventOpenCard: function () {
      for (var i = 0; i < window.util.pinsArr.length; i++) {
        window.util.pinsArr[i].addEventListener('mousedown', this.openCard);
        window.util.pinsArr[i].addEventListener('keydown', this.openCard);
      }
    },
    pinsRemoveEventOpenCard: function () {
      for (var i = 0; i < window.util.pinsArr.length; i++) {
        window.util.pinsArr[i].removeEventListener('mousedown', this.openCard);
        window.util.pinsArr[i].removeEventListener('keydown', this.openCard);
      }
    },
    setMainPinAddress: function () {
      var pinLeft = window.util.mapPinMain.style.left;
      var pinTop = window.util.mapPinMain.style.top;
      var locationX;
      var locationY;

      if (window.util.activeDocument) {
        locationX = Math.round(parseInt(pinLeft, 10) + window.util.PIN_WIDTH / 2);
        locationY = Math.round(parseInt(pinTop, 10) + window.util.PIN_HEIGHT);
        window.util.address.value = locationX + ', ' + locationY;
        return;
      }
      locationX = Math.round(parseInt(pinLeft, 10) + window.util.PIN_WIDTH / 2);
      locationY = Math.round(parseInt(pinTop, 10) + window.util.PIN_WIDTH / 2);
      window.util.address.value = locationX + ', ' + locationY;
    },
  };

  // ====================================================================================================//
  // window.util.mapPinMain.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();
  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY,
  //   };
  //
  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();
  //
  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };
  //
  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };
  //
  //     window.util.mapPinMain.style.top = (window.util.mapPinMain.offsetTop - shift.y) + 'px';
  //     window.util.mapPinMain.style.left = (window.util.mapPinMain.offsetLeft - shift.x) + 'px';
  //   };
  //
  //   window.util.mapPins.addEventListener('mousemove', onMouseMove);
  //   window.util.mapPins.addEventListener('mouseup', onMouseUp);
  // });
  // ====================================================================================================//
})();
