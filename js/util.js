'use strict';

(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_X_MIN = 100;
  var LOCATION_X_MAX = 1100;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 77;
  var numberAds = 8;
  var pinsArr = [];
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var fieldset = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = adForm.querySelector('#address');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var optionCapacity = capacity.querySelectorAll('option');
  var activeDocument = false;

  window.util = {
    TYPES: TYPES,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    numberAds: numberAds,
    pinsArr: pinsArr,
    pinTemplate: pinTemplate,
    fieldset: fieldset,
    select: select,
    adForm: adForm,
    mapPinMain: mapPinMain,
    address: address,
    type: type,
    price: price,
    timeIn: timeIn,
    timeOut: timeOut,
    roomNumber: roomNumber,
    capacity: capacity,
    optionCapacity: optionCapacity,
    activeDocument: activeDocument,
  };
})();