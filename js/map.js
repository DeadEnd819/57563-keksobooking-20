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
          if (window.map.pinDataName[i] === this.dataset.id) {
            window.card.createCard(window.data.arrAds[i]);
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
  // window.elements.mapPinMain.addEventListener('mousedown', function (evt) {
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
  //     window.elements.mapPinMain.style.top = (window.elements.mapPinMain.offsetTop - shift.y) + 'px';
  //     window.elements.mapPinMain.style.left = (window.elements.mapPinMain.offsetLeft - shift.x) + 'px';
  //   };
  //
  //   window.elements.mapPins.addEventListener('mousemove', onMouseMove);
  //   window.elements.mapPins.addEventListener('mouseup', onMouseUp);
  // });
  // ====================================================================================================//
})();
