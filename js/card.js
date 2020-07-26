'use strict';

(function () {
  // var cardBlock = {
  //   'title': '.popup__title',
  //   'address': '.popup__text--address',
  //   'price': '.popup__text--price',
  //   'type': '.popup__type',
  //   'rooms': '.popup__text--capacity',
  //   'guests': '.popup__text--capacity',
  //   'checkin': '.popup__text--time',
  //   'checkout': '.popup__text--time',
  //   'features': '.popup__features',
  //   'description': '.popup__description',
  //   'photos': '.popup__photos',
  //   'avatar': '.popup__avatar',
  // };
  //
  // var offerTag = ['title', 'address', 'price', 'type', 'rooms', 'guests', 'checkin', 'checkout', 'features', 'description', 'photos'];

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var activePin = '';

  var setFeatures = function (ad) {
    var featuresTemplate = cardElement.querySelector('.popup__features');
    var arrFeatures = ad.offer.features;
    featuresTemplate.innerHTML = '';

    for (var i = 0; i < arrFeatures.length; i++) {
      var elem = '<li class="popup__feature popup__feature--' + arrFeatures[i] + '"></li>';
      featuresTemplate.insertAdjacentHTML('beforeend', elem);
    }
  };

  var setPhotos = function (ad) {
    var photoTemplate = cardElement.querySelector('.popup__photos');
    var arrPhotos = ad.offer.photos;
    photoTemplate.innerHTML = '';

    for (var i = 0; i < arrPhotos.length; i++) {
      var elem = '<img src="' + arrPhotos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      photoTemplate.insertAdjacentHTML('beforeend', elem);
    }
  };

  var closeCard = function (evt) {
    var buttonPressed = evt.button;

    if (buttonPressed === 0 || evt.key === 'Escape') {
      window.card.activePin.classList.remove('map__pin--active');
      window.card.clearCard();
    }
  };

  var clearCard = function () {
    var popup = document.querySelector('.popup');

    if (popup !== null) {
      popup.parentNode.removeChild(popup);
      cardElement.querySelector('.popup__close').removeEventListener('click', closeCard);
      document.removeEventListener('keydown', closeCard);

      if (window.main.activeDocument) {
        window.map.pinsAddEventOpenCard();
      }
    }
  };

  window.card = {
    activePin: activePin,
    clearCard: clearCard,
    createCard: function (ad, pin) {
      window.card.activePin = pin;
      window.card.clearCard();

      cardElement.querySelector('.popup__title').textContent = ad.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.constants.TYPE_HOUSING[ad.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = ad.offer.description;
      cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
      setFeatures(ad);
      setPhotos(ad);

      // ************** Фильтр не работающих блоков карточек ***************** // Не работает

      // for (var i = 0; i < offerTag.length; i++) {
      //   var elem = cardElement.querySelector(cardBlock[offerTag[i]]);
      //
      //   if (elem.textContent === '') {
      //     elem.style.display = 'none';
      //   }
      // }

      document.querySelector('.map').insertAdjacentElement('beforebegin', cardElement);

      cardElement.querySelector('.popup__close').addEventListener('click', closeCard);
      document.addEventListener('keydown', closeCard);
    },
  };
})();
