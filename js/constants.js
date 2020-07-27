'use strict';

var TYPES = ['bungalo', 'flat', 'house', 'palace'];
var TYPE_HOUSING = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 77;
var NUMBER_ADS = 5;
var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';
var UPLOAD_URL = 'https://javascript.pages.academy/keksobooking';
var TIMEOUT_IN_MS = 10000;
var METHOD = ['GET', 'POST'];
var DEBOUNCE_INTERVAL = 500;
var CARD_BLOCK = {
  'title': '.popup__title',
  'address': '.popup__text--address',
  'price': '.popup__text--price',
  'type': '.popup__type',
  'rooms': '.popup__text--capacity',
  'guests': '.popup__text--capacity',
  'checkin': '.popup__text--time',
  'checkout': '.popup__text--time',
  'description': '.popup__description',
};

var OFFER_TAG = ['title', 'address', 'price', 'type', 'rooms', 'guests', 'checkin', 'checkout', 'description'];

window.constants = {
  TYPES: TYPES,
  TYPE_HOUSING: TYPE_HOUSING,
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
  NUMBER_ADS: NUMBER_ADS,
  LOAD_URL: LOAD_URL,
  UPLOAD_URL: UPLOAD_URL,
  TIMEOUT_IN_MS: TIMEOUT_IN_MS,
  METHOD: METHOD,
  DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
  CARD_BLOCK: CARD_BLOCK,
  OFFER_TAG: OFFER_TAG,
};
