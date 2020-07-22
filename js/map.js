'use strict';

(function () {
  window.map = {
    OpenCard: function (evt) {
      var buttonPressed = evt.button;
      if (buttonPressed === 0 || evt.key === 'Enter') {
        for (var i = 0; i < window.util.pinsArr.length; i++) {
          if (window.util.pinsArr[i] === this) {
            window.card.createCard(window.data.arrAds[i]);
          }
        }
      }
    },
    pinsAddEventOpenCard: function () {
      for (var i = 0; i < window.util.pinsArr.length; i++) {
        window.util.pinsArr[i].addEventListener('mousedown', this.OpenCard);
        window.util.pinsArr[i].addEventListener('keydown', this.OpenCard);
      }
    },
    pinsRemoveEventOpenCard: function () {
      for (var i = 0; i < window.util.pinsArr.length; i++) {
        window.util.pinsArr[i].removeEventListener('mousedown', this.OpenCard);
        window.util.pinsArr[i].removeEventListener('keydown', this.OpenCard);
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
})();
