'use strict';

(function () {
  window.card = {
    createCard: function (ad) {
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

      var clearCard = function () {
        var popup = document.querySelector('.popup');

        if (popup !== null) {
          popup.parentNode.removeChild(popup);
          cardElement.querySelector('.popup__close').removeEventListener('mousedown', closeCard);
          document.removeEventListener('keydown', closeCard);
          window.map.pinsAddEventOpenCard();
        }
      };

      clearCard();

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
          clearCard();
        }
      };

      cardElement.querySelector('.popup__close').addEventListener('mousedown', closeCard);
      document.addEventListener('keydown', closeCard);
    },
  };
})();
