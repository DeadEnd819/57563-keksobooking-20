'use strict';
(function () {
  var filterAds = window.api.arrAds;
  var type = '';
  var price = '';
  var rooms = 0;
  var guests = 0;

  var getRank = function (Ad) {
    var rank = 0;

    if (Ad.offer.type === type) {
      rank += 4;
    }

    switch (price) {
      case 'middle':
        if (Ad.offer.price > 10000 && Ad.offer.price < 50000) {
          rank += 3;
        }
        break;
      case 'low':
        if (Ad.offer.price < 10000) {
          rank += 3;
        }
        break;
      case 'high':
        if (Ad.offer.price > 50000) {
          rank += 3;
        }
        break;
    }

    if (Ad.offer.rooms === rooms) {
      rank += 2;
    }

    if (Ad.offer.guests === guests) {
      rank += 1;
    }
    return rank;
  };

  var updatePins = function () {
    window.pin.deletePins();
    window.card.clearCard();

    var filteredAds = filterAds.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = filterAds.indexOf(left) - filterAds.indexOf(right);
      }
      return rankDiff;
    });

    window.pin.activatePins(filteredAds);
  };

  var typeFilter = window.elements.filterForm.querySelector('#housing-type');
  var priceFilter = window.elements.filterForm.querySelector('#housing-price');
  var roomsFilter = window.elements.filterForm.querySelector('#housing-rooms');
  var guestsFilter = window.elements.filterForm.querySelector('#housing-guests');

  var onFilterChange = function (evt) {
    var elem = evt.target;
    switch (elem) {
      case typeFilter:
        type = elem.value;
        updatePins();
        break;
      case priceFilter:
        price = elem.value;
        updatePins();
        break;
      case roomsFilter:
        rooms = elem.value;
        updatePins();
        break;
      case guestsFilter:
        guests = elem.value;
        updatePins();
        break;
    }
  };

  window.elements.filterForm.addEventListener('change', onFilterChange);

  window.filter = {
    updatePins: updatePins,
    onFilterChange: onFilterChange,
  };
})();
