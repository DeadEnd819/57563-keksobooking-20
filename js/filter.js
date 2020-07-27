'use strict';
(function () {
  var Ads = window.api.dataAds;
  var alteredAds = [];
  var type = '';
  var price = '';
  var rooms = 0;
  var guests = 0;

  // var dishwasherChecked = false;
  // var wifiChecked = false;
  // var parkingChecked = false;
  // var washerChecked = false;
  // var elevatorChecked = false;
  // var conditionerChecked = false;

  var featuresChecked = {
    'wifi': false,
    'dishwasher': false,
    'parking': false,
    'washer': false,
    'elevator': false,
    'conditioner': false,
  };

  var filterByFeatures = function (adFeatures) {
    var flag = true;
    window.constants.FEATURES.forEach(function (it) {
      if (featuresChecked[it]) {
        flag = adFeatures.includes(it);
      }
    });
    return flag;
  };

  // var filterByDishwasher = function (adDishwasher) {
  //   return dishwasherChecked ? adDishwasher.includes('dishwasher') : true;
  // };
  //
  // var filterByWifi = function (adWifi) {
  //   return wifiChecked ? adWifi.includes('wifi') : true;
  // };
  //
  // var filterByParking = function (adParking) {
  //   return parkingChecked ? adParking.includes('parking') : true;
  // };
  //
  // var filterByWasher = function (adWasher) {
  //   return washerChecked ? adWasher.includes('washer') : true;
  // };
  //
  // var filterByElevator = function (adElevator) {
  //   return elevatorChecked ? adElevator.includes('elevator') : true;
  // };
  //
  // var filterByConditioner = function (adConditioner) {
  //   return conditionerChecked ? adConditioner.includes('conditioner') : true;
  // };

  var filterByPrice = function (adPrice) {
    if (!price) {
      return true;
    }

    switch (price) {
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
      case 'any':
        return true;
    }
    return false;
  };

  var filterByType = function (adType) {
    return !type || adType === type || type === 'any';
  };

  var filterByRoom = function (adRoom) {
    return !rooms || adRoom.toString() === rooms || rooms === 'any';
  };

  var filterByGuests = function (adGuest) {
    return !guests || adGuest.toString() === guests || guests === 'any';
  };

  var updatePins = function () {
    window.pin.deletePins();
    window.card.clear();

    window.filter.alteredAds = Ads.filter(function (ad) {
      return filterByType(ad.offer.type) &&
          filterByPrice(ad.offer.price) &&
          filterByGuests(ad.offer.guests) &&
          filterByRoom(ad.offer.rooms) &&
      filterByFeatures(ad.offer.features);

      // filterByDishwasher(ad.offer.features) &&
      // filterByWifi(ad.offer.features) &&
      // filterByParking(ad.offer.features) &&
      // filterByWasher(ad.offer.features) &&
      // filterByElevator(ad.offer.features) &&
      // filterByConditioner(ad.offer.features);
    });

    window.pin.activatePins(window.filter.alteredAds);
  };

  var onFilterChange = window.utils.debounce(function (evt) {
    var elem = evt.target;

    switch (elem) {
      case window.elements.typeFilter:
        type = elem.value;
        updatePins();
        break;
      case window.elements.priceFilter:
        price = elem.value;
        updatePins();
        break;
      case window.elements.roomsFilter:
        rooms = elem.value;
        updatePins();
        break;
      case window.elements.guestsFilter:
        guests = elem.value;
        updatePins();
        break;
      case window.elements.wifiFilter:
        // wifiChecked = !wifiChecked;
        featuresChecked[window.constants.FEATURES[0]] = !featuresChecked[window.constants.FEATURES[0]];
        updatePins();
        break;
      case window.elements.dishwasherFilter:
        // dishwasherChecked = !dishwasherChecked;
        featuresChecked[window.constants.FEATURES[1]] = !featuresChecked[window.constants.FEATURES[1]];
        updatePins();
        break;
      case window.elements.parkingFilter:
        // parkingChecked = !parkingChecked;
        featuresChecked[window.constants.FEATURES[2]] = !featuresChecked[window.constants.FEATURES[2]];
        updatePins();
        break;
      case window.elements.washerFilter:
        // washerChecked = !washerChecked;
        featuresChecked[window.constants.FEATURES[3]] = !featuresChecked[window.constants.FEATURES[3]];
        updatePins();
        break;
      case window.elements.elevatorFilter:
        // elevatorChecked = !elevatorChecked;
        featuresChecked[window.constants.FEATURES[4]] = !featuresChecked[window.constants.FEATURES[4]];
        updatePins();
        break;
      case window.elements.conditionerFilter:
        // conditionerChecked = !conditionerChecked;
        featuresChecked[window.constants.FEATURES[5]] = !featuresChecked[window.constants.FEATURES[5]];
        updatePins();
        break;
    }
  });

  var filterByBlock = function () {
    var card = document.querySelector('.map__card');
    var imgBlock = [
      card.querySelector('.popup__features'),
      card.querySelector('.popup__photos'),
      card.querySelector('.popup__avatar'),
    ];

    window.constants.offerTags.forEach(function (it) {
      var elem = card.querySelector(window.constants.cardBlocks[it]);

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
    type = '';
    price = '';
    rooms = 0;
    guests = 0;

    // dishwasherChecked = false;
    // wifiChecked = false;
    // parkingChecked = false;
    // washerChecked = false;
    // elevatorChecked = false;
    // conditionerChecked = false;

    window.constants.FEATURES.forEach(function (it) {
      featuresChecked[it] = false;
    });
  };


  window.filter = {
    updatePins: updatePins,
    filterByBlock: filterByBlock,
    reset: reset,
    onFilterChange: onFilterChange,
    alteredAds: alteredAds,
  };
})();
