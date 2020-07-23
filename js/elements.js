'use strict';

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
var mapPins = document.querySelector('.map__pins');

window.elements = {
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
  mapPins: mapPins,
};
