'use strict';

(function () {
  var setMinPrice = function () {
    var minValue = 0;
    var placeholderValue = 0;

    switch (window.util.type.value) {
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

    window.util.price.setAttribute('min', minValue);
    window.util.price.setAttribute('placeholder', placeholderValue);
  };

  setMinPrice();

  window.util.type.addEventListener('change', setMinPrice);

  var setTimeOut = function () {
    for (var i = 0; i < window.util.CHECKINS.length; i++) {
      if (window.util.timeIn.value === window.util.CHECKINS[i]) {
        window.util.timeOut.value = window.util.CHECKOUTS[i];
      }
    }
  };

  var setTimeIn = function () {
    for (var i = 0; i < window.util.CHECKOUTS.length; i++) {
      if (window.util.timeOut.value === window.util.CHECKOUTS[i]) {
        window.util.timeIn.value = window.util.CHECKINS[i];
      }
    }
  };

  window.util.timeIn.addEventListener('change', setTimeOut);
  window.util.timeOut.addEventListener('change', setTimeIn);

  var setCapacity = function () {
    for (var i = 0; i < window.util.optionCapacity.length; i++) {
      if (window.util.roomNumber.value >= window.util.optionCapacity[i].value && window.util.optionCapacity[i].value !== '0') {
        window.util.optionCapacity[i].disabled = false;
        window.util.capacity.value = window.util.roomNumber.value;
      } else if (window.util.roomNumber.value === '100') {
        for (var j = 0; j < 3; j++) {
          window.util.optionCapacity[j].disabled = true;
        }
        window.util.optionCapacity[i].disabled = false;
        window.util.capacity.value = '0';
      } else {
        window.util.optionCapacity[i].disabled = true;
      }
    }
  };

  setCapacity();

  window.util.roomNumber.addEventListener('change', setCapacity);
})();
