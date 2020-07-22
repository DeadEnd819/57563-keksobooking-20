'use strict';
(function () {
  var activeDocument = false;

  window.main = {
    activeDocument: activeDocument,
  };

  var disableForm = function () {
    for (var i = 0; i < window.elements.fieldset.length; i++) {
      window.elements.fieldset[i].disabled = true;
    }

    for (var j = 0; j < window.elements.select.length; j++) {
      window.elements.select[j].disabled = true;
    }

    window.main.activeDocument = false;

    window.map.setMainPinAddress();
    window.map.pinsRemoveEventOpenCard();
  };

  disableForm();

  var removeMapFaded = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  var activateDocument = function () {
    removeMapFaded();
    window.elements.adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < window.elements.fieldset.length; i++) {
      window.elements.fieldset[i].disabled = false;
    }

    for (var j = 0; j < window.elements.select.length; j++) {
      window.elements.select[j].disabled = false;
    }

    window.pin.activatePins(window.data.arrAds);
    window.map.pinsAddEventOpenCard();
    window.main.activeDocument = true;

    window.elements.mapPinMain.removeEventListener('mousedown', onPinPress);
    window.elements.mapPinMain.removeEventListener('keydown', onPinPress);
  };

  var onPinPress = function (evt) {
    var buttonPressed = evt.button;

    if (buttonPressed === 0 || evt.key === 'Enter') {
      activateDocument();
      window.map.setMainPinAddress();
    }
  };

  window.elements.mapPinMain.addEventListener('mousedown', onPinPress);
  window.elements.mapPinMain.addEventListener('keydown', onPinPress);
})();

