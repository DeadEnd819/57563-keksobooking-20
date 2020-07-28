'use strict';

(function () {
  var FILTER_VALUE_ANY = 'any';
  var PRICE_VALUES = [10000, 50000];
  var ads = window.api.dataAds;
  var alteredAds = [];
  var filters;

  var initializeFilters = function () {
    filters = {
      type: FILTER_VALUE_ANY,
      price: FILTER_VALUE_ANY,
      rooms: FILTER_VALUE_ANY,
      guests: FILTER_VALUE_ANY
    };
    window.constants.FEATURES.forEach(function (feature) {
      filters[feature] = false;
    });
  };

  var filterByFeatures = function (adFeatures) {
    var result = true;
    window.constants.FEATURES.forEach(function (feature) {
      result = filters[feature] ? (result && adFeatures.includes(feature)) : result;
    });
    return result;
  };

  var filterByPrice = function (adPrice) {
    if (filters.price === FILTER_VALUE_ANY) {
      return true;
    }

    switch (filters.price) {
      case 'middle':
        if (adPrice >= PRICE_VALUES[0] && adPrice <= PRICE_VALUES[1]) {
          return true;
        }
        break;
      case 'low':
        if (adPrice < PRICE_VALUES[0]) {
          return true;
        }
        break;
      case 'high':
        if (adPrice > PRICE_VALUES[1]) {
          return true;
        }
        break;
    }
    return false;
  };

  var filterByType = function (adType) {
    return adType === filters.type || filters.type === FILTER_VALUE_ANY;
  };

  var filterByRoom = function (adRoom) {
    return adRoom.toString() === filters.rooms || filters.rooms === FILTER_VALUE_ANY;
  };

  var filterByGuests = function (adGuest) {
    return adGuest.toString() === filters.guests || filters.guests === FILTER_VALUE_ANY;
  };

  var updatePins = function () {
    window.pin.remove();
    window.card.clear();

    window.filter.alteredAds = ads.filter(function (ad) {
      return filterByType(ad.offer.type) &&
        filterByPrice(ad.offer.price) &&
        filterByGuests(ad.offer.guests) &&
        filterByRoom(ad.offer.rooms) &&
        filterByFeatures(ad.offer.features);
    });

    window.pin.activate(window.filter.alteredAds);
  };

  var formChangeHandler = window.utils.debounce(function (evt) {
    var target = evt.target;
    var name = target.getAttribute('id')
      .replace('housing-', '')
      .replace('filter-', '');

    filters[name] = window.constants.FEATURES.includes(name) ? !filters[name] : target.value;
    updatePins();
  });

  var hidesEmptyBlocks = function () {
    var card = document.querySelector('.map__card');
    var imgBlock = [
      card.querySelector('.popup__features'),
      card.querySelector('.popup__photos'),
      card.querySelector('.popup__avatar'),
    ];

    window.constants.OfferTags.forEach(function (tag) {
      var block = card.querySelector(window.constants.CardBlocks[tag]);

      if (block.textContent === '') {
        block.style.display = 'none';
        return;
      }
      block.removeAttribute('style');
    });

    imgBlock.forEach(function (block) {
      if (block.childNodes.length === 0 && block.src === undefined || block.src !== undefined && block.src === '') {
        block.style.display = 'none';
      } else {
        block.removeAttribute('style');
      }
    });
  };

  var reset = function () {
    window.elements.filterForm.reset();
    alteredAds = [];
    initializeFilters();
  };

  initializeFilters();

  window.filter = {
    updatePins: updatePins,
    hidesEmptyBlocks: hidesEmptyBlocks,
    reset: reset,
    formChangeHandler: formChangeHandler,
    alteredAds: alteredAds,
  };
})();
