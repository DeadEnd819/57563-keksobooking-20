'use strict';

(function () {
  var clear = function () {
    window.elements.roomNumber.value = window.constants.FORM_DEFAULT_VALUE;
    window.elements.capacity.value = window.constants.FORM_DEFAULT_VALUE;

    window.elements.adForm.reset();

    onChangeCapacity();
    onChangeMinPrice();
    window.pin.resetMain();
    window.map.setMainPinAddress();
  };

  var onChangeMinPrice = function () {
    var minValue = window.constants.ValuesPrice[0];
    var placeholderValue = window.constants.ValuesPrice[0];

    switch (window.elements.type.value) {
      case window.constants.TYPES[1]:
        minValue = window.constants.ValuesPrice[1];
        placeholderValue = window.constants.ValuesPrice[1];
        break;
      case window.constants.TYPES[2]:
        minValue = window.constants.ValuesPrice[2];
        placeholderValue = window.constants.ValuesPrice[2];
        break;
      case window.constants.TYPES[3]:
        minValue = window.constants.ValuesPrice[3];
        placeholderValue = window.constants.ValuesPrice[3];
        break;
    }

    window.elements.price.setAttribute('min', minValue);
    window.elements.price.setAttribute('placeholder', placeholderValue);
  };

  var onChangeTime = function (evt) {

    if (evt.target.id === window.elements.timeIn.id) {
      window.elements.timeOut.value = window.constants.CHECKOUTS[evt.target.selectedIndex];
      return;
    }
    window.elements.timeIn.value = window.constants.CHECKINS[evt.target.selectedIndex];
  };

  var onChangeCapacity = function () {
    for (var i = 0; i < window.elements.optionCapacity.length; i++) {
      if (window.elements.roomNumber.value >= window.elements.optionCapacity[i].value && window.elements.optionCapacity[i].value !== '0') {
        window.elements.optionCapacity[i].disabled = false;
        window.elements.capacity.value = window.elements.roomNumber.value;
      } else if (window.elements.roomNumber.value === '100') {
        for (var j = 0; j < 3; j++) {
          window.elements.optionCapacity[j].disabled = true;
        }
        window.elements.optionCapacity[i].disabled = false;
        window.elements.capacity.value = '0';
      } else {
        window.elements.optionCapacity[i].disabled = true;
      }
    }
  };

  var onClickReset = function (evt) {
    var buttonPressed = evt.button;

    evt.preventDefault();

    if (buttonPressed === window.constants.Buttons.mouseLeft || evt.key === window.constants.Buttons.enter) {
      window.main.disableForm();
    }
  };

  var addEvents = function () {
    window.elements.type.addEventListener('change', onChangeMinPrice);
    window.elements.timeIn.addEventListener('change', onChangeTime);
    window.elements.timeOut.addEventListener('change', onChangeTime);
    window.elements.roomNumber.addEventListener('change', onChangeCapacity);
  };

  var removeEvents = function () {
    window.elements.type.removeEventListener('change', onChangeMinPrice);
    window.elements.timeIn.removeEventListener('change', onChangeTime);
    window.elements.timeOut.removeEventListener('change', onChangeTime);
    window.elements.roomNumber.removeEventListener('change', onChangeCapacity);
  };


  window.form = {
    clear: clear,
    onClickReset: onClickReset,
    addEvents: addEvents,
    removeEvents: removeEvents,
  };
})();
