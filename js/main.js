'use strict';

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

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var cutArray = function (arr) {
  var newArray = arr.slice();
  newArray.length = getRandomInRange(1, newArray.length);
  return newArray;
};

var shuffleArray = function (arr) {
  var newArray = arr.slice();
  for (var i = 0; i < newArray.length; i++) {
    var j = getRandomInRange(0, newArray.length - 1);
    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return cutArray(newArray);
};

var createAd = function (number) {
  var arrAds = [];

  for (var i = 0; i < number; i++) {
    var locationX = getRandomInRange(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = getRandomInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Заголовок',
        address: locationX + ', ' + locationY,
        price: getRandomInRange(1, 5000),
        type: arrayRandElement(TYPES),
        rooms: getRandomInRange(1, 100),
        guests: getRandomInRange(0, 3),
        checkin: arrayRandElement(CHECKINS),
        checkout: arrayRandElement(CHECKOUTS),
        features: shuffleArray(FEATURES),
        description: 'Описание',
        photos: shuffleArray(PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    };
    arrAds.push(ad);
  }
  return arrAds;
};

var removeMapFaded = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var createPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  return pinElement;
};

var activatePins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var arrAds = createAd(numberAds);
  for (var i = 0; i < arrAds.length; i++) {
    fragment.appendChild(createPin(arrAds[i]));
  }
  mapPins.appendChild(fragment);
};

// ====================================================================================================================//
//* *****************************************************************************//
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

//* *****************************************************************************//

var setMainPinAddress = function () {
  var pinLeft = mapPinMain.style.left;
  var pinTop = mapPinMain.style.top;
  var locationX;
  var locationY;
  if (activeDocument) {
    locationX = Math.round(parseInt(pinLeft, 10) + PIN_WIDTH / 2);
    locationY = Math.round(parseInt(pinTop, 10) + PIN_HEIGHT);
    address.value = locationX + ', ' + locationY;
  } else {
    locationX = Math.round(parseInt(pinLeft, 10) + PIN_WIDTH / 2);
    locationY = Math.round(parseInt(pinTop, 10) + PIN_WIDTH / 2);
    address.value = locationX + ', ' + locationY;
  }
};

var formDisabled = function () {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = true;
  }

  for (var i = 0; i < select.length; i++) {
    select[i].disabled = true;
  }

  activeDocument = false;
  setMainPinAddress();
};

formDisabled();

var activateDocument = function () {
  removeMapFaded();
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = false;
  }
  for (var i = 0; i < select.length; i++) {
    select[i].disabled = false;
  }

  activatePins();
  activeDocument = true;
  mapPinMain.removeEventListener('mousedown', onPinPress);
  mapPinMain.removeEventListener('keydown', onPinPress);
};

var onPinPress = function (evt) {
  var buttonPressed = evt.button;
  if (buttonPressed === 0 || evt.key === 'Enter') {
    activateDocument();
    setMainPinAddress();
  }
};

mapPinMain.addEventListener('mousedown', onPinPress);
mapPinMain.addEventListener('keydown', onPinPress);
// -----------------------------------------------------------------------------//


var setMinPrice = function () {
  if (type.value === 'bungalo') {
    price.setAttribute('min', 0);
    price.setAttribute('placeholder', 0);
  } else if (type.value === 'flat') {
    price.setAttribute('min', 1000);
    price.setAttribute('placeholder', 1000);
  } else if (type.value === 'house') {

    price.setAttribute('min', 5000);
    price.setAttribute('placeholder', 5000);
  } else {
    price.setAttribute('min', 10000);
    price.setAttribute('placeholder', 10000);
  }
};

setMinPrice();

type.addEventListener('change', setMinPrice);

// -----------------------------------------------------------------------------//

var setTimeOut = function () {
  if (timeIn.value === '12:00') {
    timeOut.value = '12:00';
  } else if (timeIn.value === '13:00') {
    timeOut.value = '13:00';
  } else {
    timeOut.value = '14:00';
  }
};

var setTimeIn = function () {
  if (timeOut.value === '12:00') {
    timein.value = '12:00';
  } else if (timeOut.value === '13:00') {
    timein.value = '13:00';
  } else {
    timein.value = '14:00';
  }
};

timeIn.addEventListener('change', setTimeOut);
timeOut.addEventListener('change', setTimeIn);

// -----------------------------------------------------------------------------//

var setCapacity = function () {
  if (roomNumber.value === '1') {
    optionCapacity[0].disabled = true;
    optionCapacity[1].disabled = true;
    optionCapacity[2].disabled = false;
    optionCapacity[3].disabled = true;
    capacity.value = '1';
  } else if (roomNumber.value === '2') {
    optionCapacity[0].disabled = true;
    optionCapacity[1].disabled = false;
    optionCapacity[2].disabled = false;
    optionCapacity[3].disabled = true;
    capacity.value = '2';
  } else if (roomNumber.value === '3') {
    for (var i = 0; i < 2; i++) {
      optionCapacity[i].disabled = false;
    }
    optionCapacity[3].disabled = true;
    capacity.value = '3';
  } else {
    for (var i = 0; i < 2; i++) {
      optionCapacity[i].disabled = true;
    }
    optionCapacity[3].disabled = false;
    capacity.value = '0';
  }
};

setCapacity();

roomNumber.addEventListener('change', setCapacity);
