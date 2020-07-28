'use strict';
(function () {
  var FILTER_VALUE_ANY = 'any';
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
      if (filters[feature]) {
        result = result && adFeatures.includes(feature);
      }
    });
    return result;
  };

  var filterByPrice = function (adPrice) {
    if (filters.price === FILTER_VALUE_ANY) {
      return true;
    }

    switch (filters.price) {
      case 'middle':
        if (adPrice >= 10000 && adPrice <= 50000) {
          return true;
        }
        break;
      case 'low':
        if (adPrice < 10000) {
          return true;
        }
        break;
      case 'high':
        if (adPrice > 50000) {
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

  var onFilterChange = window.utils.debounce(function (evt) {
    var elem = evt.target;
    var name = elem.getAttribute('id')
      .replace('housing-', '')
      .replace('filter-', '');

    if (window.constants.FEATURES.includes(name)) {
      filters[name] = !filters[name];
    } else {
      filters[name] = elem.value;
    }
    updatePins();
  });

  var filterByBlock = function () {
    var card = document.querySelector('.map__card');
    var imgBlock = [
      card.querySelector('.popup__features'),
      card.querySelector('.popup__photos'),
      card.querySelector('.popup__avatar'),
    ];

    window.constants.OfferTags.forEach(function (it) {
      var elem = card.querySelector(window.constants.CardBlocks[it]);

      if (elem.textContent === '') {
        elem.style.display = 'none';
      } else {
        elem.removeAttribute('style');
      }
    });

    imgBlock.forEach(function (it) {
      if (it.childNodes.length === 0 && it.src === undefined || it.src !== undefined && it.src === '') {
        it.style.display = 'none';
      } else {
        it.removeAttribute('style');
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
    filterByBlock: filterByBlock,
    reset: reset,
    onFilterChange: onFilterChange,
    alteredAds: alteredAds,
  };
})();
