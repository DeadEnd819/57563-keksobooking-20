'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var activePin = '';

  var createCard = function (ad, pin) {
    window.card.activePin = pin;
    window.card.clear();

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.constants.TypesHousing[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    setFeatures(ad);
    setPhotos(ad);

    document.querySelector('.map').insertAdjacentElement('beforebegin', cardElement);

    window.filter.filterByBlock();

    cardElement.querySelector('.popup__close').addEventListener('click', closeCard);
    document.addEventListener('keydown', closeCard);
  };

  var setFeatures = function (ad) {
    var featuresTemplate = cardElement.querySelector('.popup__features');
    var features = ad.offer.features;
    featuresTemplate.innerHTML = '';

    features.forEach(function (it) {
      var elem = '<li class="popup__feature popup__feature--' + it + '"></li>';
      featuresTemplate.insertAdjacentHTML('beforeend', elem);
    });
  };

  var setPhotos = function (ad) {
    var photoTemplate = cardElement.querySelector('.popup__photos');
    var photos = ad.offer.photos;
    photoTemplate.innerHTML = '';

    photos.forEach(function (it) {
      var elem = '<img src="' + it + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      photoTemplate.insertAdjacentHTML('beforeend', elem);
    });
  };

  var closeCard = function (evt) {
    var buttonPressed = evt.button;

    if (buttonPressed === 0 || evt.key === 'Escape') {
      window.card.activePin.classList.remove('map__pin--active');
      window.card.clear();
    }
  };

  var clear = function () {
    var popup = document.querySelector('.popup');

    if (!popup) {
      return;
    }

    popup.parentNode.removeChild(popup);
    cardElement.querySelector('.popup__close').removeEventListener('click', closeCard);
    document.removeEventListener('keydown', closeCard);

    if (window.main.activeDocument) {
      window.map.pinsAddEventOpenCard();
    }
  };

  window.card = {
    activePin: activePin,
    clear: clear,
    createCard: createCard,
  };
})();
