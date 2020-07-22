'use strict';

(function () {
  var setMinPrice = function () {
    var minValue = 0;
    var placeholderValue = 0;

    switch (window.elements.type.value) {
      case 'bungalo':
        minValue = 0;
        placeholderValue = 0;
        break;
      case 'flat':
        minValue = 1000;
        placeholderValue = 1000;
        break;
      case 'house':
        minValue = 5000;
        placeholderValue = 5000;
        break;
      default:
        minValue = 10000;
        placeholderValue = 10000;
    }

    window.elements.price.setAttribute('min', minValue);
    window.elements.price.setAttribute('placeholder', placeholderValue);
  };

  setMinPrice();

  window.elements.type.addEventListener('change', setMinPrice);

  var setTimeOut = function () {
    for (var i = 0; i < window.constants.CHECKINS.length; i++) {
      if (window.elements.timeIn.value === window.constants.CHECKINS[i]) {
        window.elements.timeOut.value = window.constants.CHECKOUTS[i];
      }
    }
  };

  var setTimeIn = function () {
    for (var i = 0; i < window.constants.CHECKOUTS.length; i++) {
      if (window.elements.timeOut.value === window.constants.CHECKOUTS[i]) {
        window.elements.timeIn.value = window.constants.CHECKINS[i];
      }
    }
  };

  window.elements.timeIn.addEventListener('change', setTimeOut);
  window.elements.timeOut.addEventListener('change', setTimeIn);

  var setCapacity = function () {
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

  setCapacity();

  window.elements.roomNumber.addEventListener('change', setCapacity);
})();
