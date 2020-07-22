'use strict';

var disableForm = function () {
  for (var i = 0; i < window.util.fieldset.length; i++) {
    window.util.fieldset[i].disabled = true;
  }

  for (var j = 0; j < window.util.select.length; j++) {
    window.util.select[j].disabled = true;
  }

  window.util.activeDocument = false;
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
  window.util.adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < window.util.fieldset.length; i++) {
    window.util.fieldset[i].disabled = false;
  }

  for (var j = 0; j < window.util.select.length; j++) {
    window.util.select[j].disabled = false;
  }

  window.pin.activatePins(window.data.arrAds);
  window.map.pinsAddEventOpenCard();
  window.util.activeDocument = true;
  window.util.mapPinMain.removeEventListener('mousedown', onPinPress);
  window.util.mapPinMain.removeEventListener('keydown', onPinPress);
};

var onPinPress = function (evt) {
  var buttonPressed = evt.button;

  if (buttonPressed === 0 || evt.key === 'Enter') {
    activateDocument();
    window.map.setMainPinAddress();
  }
};

window.util.mapPinMain.addEventListener('mousedown', onPinPress);
window.util.mapPinMain.addEventListener('keydown', onPinPress);


