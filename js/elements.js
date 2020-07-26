'use strict';

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var fieldset = document.querySelectorAll('fieldset');
var select = document.querySelectorAll('select');
var adForm = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');
var address = adForm.querySelector('#address');
var title = adForm.querySelector('#title');
var type = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var optionCapacity = capacity.querySelectorAll('option');
var description = adForm.querySelector('#description');
var reset = adForm.querySelector('.ad-form__reset');
var filterForm = document.querySelector('.map__filters');
var mapPins = document.querySelector('.map__pins');

var typeFilter = filterForm.querySelector('#housing-type');
var priceFilter = filterForm.querySelector('#housing-price');
var roomsFilter = filterForm.querySelector('#housing-rooms');
var guestsFilter = filterForm.querySelector('#housing-guests');
var dishwasherFilter = filterForm.querySelector('#filter-dishwasher');
var wifiFilter = filterForm.querySelector('#filter-wifi');
var parkingFilter = filterForm.querySelector('#filter-parking');
var washerFilter = filterForm.querySelector('#filter-washer');
var elevatorFilter = filterForm.querySelector('#filter-elevator');
var conditionerFilter = filterForm.querySelector('#filter-conditioner');

window.elements = {
  typeFilter: typeFilter,
  priceFilter: priceFilter,
  roomsFilter: roomsFilter,
  guestsFilter: guestsFilter,
  dishwasherFilter: dishwasherFilter,
  wifiFilter: wifiFilter,
  parkingFilter: parkingFilter,
  washerFilter: washerFilter,
  elevatorFilter: elevatorFilter,
  conditionerFilter: conditionerFilter,
  pinTemplate: pinTemplate,
  fieldset: fieldset,
  select: select,
  adForm: adForm,
  mapPinMain: mapPinMain,
  address: address,
  title: title,
  type: type,
  price: price,
  timeIn: timeIn,
  timeOut: timeOut,
  roomNumber: roomNumber,
  capacity: capacity,
  optionCapacity: optionCapacity,
  description: description,
  reset: reset,
  filterForm: filterForm,
  mapPins: mapPins,
};
