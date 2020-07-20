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
var pinsArr = [];

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

var getPinsArr = function (mapPins) {
  var elems = mapPins.querySelectorAll('.map__pin');
  var elemsArr = [];

  for (var i = 1; i < elems.length; i++) {
    elemsArr[i - 1] = elems[i];
  }
  pinsArr = elemsArr;
};

var activatePins = function (ads) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }
  mapPins.appendChild(fragment);
  getPinsArr(mapPins);
};

var arrAds = createAd(numberAds); //  ------  Массив объявлений  ------  //


var createCard = function (ad) {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var typeHousing = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var setFeatures = function () {
    var featuresTemplate = cardElement.querySelector('.popup__features');
    var arrFeatures = ad.offer.features;
    featuresTemplate.innerHTML = '';

    for (var i = 0; i < arrFeatures.length; i++) {
      var elem = '<li class="popup__feature popup__feature--' + arrFeatures[i] + '"></li>';
      featuresTemplate.insertAdjacentHTML('beforeend', elem);
    }
  };

  var setPhotos = function () {
    var photoTemplate = cardElement.querySelector('.popup__photos');
    var arrPhotos = ad.offer.photos;
    photoTemplate.innerHTML = '';

    for (var i = 0; i < arrPhotos.length; i++) {
      var elem = '<img src="' + arrPhotos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      photoTemplate.insertAdjacentHTML('beforeend', elem);
    }
  };

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typeHousing[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  setFeatures();
  setPhotos();

  document.querySelector('.map').insertAdjacentElement('beforebegin', cardElement);

  var closeCard = function (evt) {
    var buttonPressed = evt.button;

    if (buttonPressed === 0 || evt.key === 'Escape') {
      cardElement.parentNode.removeChild(cardElement);
      cardElement.querySelector('.popup__close').removeEventListener('mousedown', closeCard);
      document.removeEventListener('keydown', closeCard);
      pinsAddEventOpenCard();
    }
  };

  cardElement.querySelector('.popup__close').addEventListener('mousedown', closeCard);
  document.addEventListener('keydown', closeCard);
};

// ====================================================================================================================//
var OpenCard = function (evt) {
  var buttonPressed = evt.button;
  if (buttonPressed === 0 || evt.key === 'Enter') {
    for (var i = 0; i < pinsArr.length; i++) {
      if (pinsArr[i] === this) {
        createCard(arrAds[i]);
      }
    }
    pinsRemoveEventOpenCard();
  }
};

var pinsAddEventOpenCard = function () {
  for (var i = 0; i < pinsArr.length; i++) {
    pinsArr[i].addEventListener('mousedown', OpenCard);
    pinsArr[i].addEventListener('keydown', OpenCard);
  }
};

var pinsRemoveEventOpenCard = function () {
  for (var i = 0; i < pinsArr.length; i++) {
    pinsArr[i].removeEventListener('mousedown', OpenCard);
    pinsArr[i].removeEventListener('keydown', OpenCard);
  }
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
    return;
  }
  locationX = Math.round(parseInt(pinLeft, 10) + PIN_WIDTH / 2);
  locationY = Math.round(parseInt(pinTop, 10) + PIN_WIDTH / 2);
  address.value = locationX + ', ' + locationY;
};

var disableForm = function () {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = true;
  }

  for (var j = 0; j < select.length; j++) {
    select[j].disabled = true;
  }

  activeDocument = false;
  setMainPinAddress();
};

disableForm();

var activateDocument = function () {
  removeMapFaded();
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = false;
  }

  for (var j = 0; j < select.length; j++) {
    select[j].disabled = false;
  }

  activatePins(arrAds);
  pinsAddEventOpenCard();
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
  var minValue = 0;
  var placeholderValue = 0;

  switch (type.value) {
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

  price.setAttribute('min', minValue);
  price.setAttribute('placeholder', placeholderValue);
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
    timeIn.value = '12:00';
  } else if (timeOut.value === '13:00') {
    timeIn.value = '13:00';
  } else {
    timeIn.value = '14:00';
  }
};

timeIn.addEventListener('change', setTimeOut);
timeOut.addEventListener('change', setTimeIn);

// -----------------------------------------------------------------------------//

var setCapacity = function () {
  for (var i = 0; i < optionCapacity.length; i++) {
    if (roomNumber.value >= optionCapacity[i].value && optionCapacity[i].value !== '0') {
      optionCapacity[i].disabled = false;
      capacity.value = roomNumber.value;
    } else if (roomNumber.value === '100') {
      for (var j = 0; j < 3; j++) {
        optionCapacity[j].disabled = true;
      }
      optionCapacity[i].disabled = false;
      capacity.value = '0';
    } else {
      optionCapacity[i].disabled = true;
    }
  }
};

setCapacity();

roomNumber.addEventListener('change', setCapacity);

