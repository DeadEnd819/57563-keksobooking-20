'use strict';
(function () {
  var Ads = window.api.arrAds;
  var alteredAds = [];
  var type = '';
  var price = '';
  var rooms = 0;
  var guests = 0;
  var dishwasherChecked = false;
  var wifiChecked = false;
  var parkingChecked = false;
  var washerChecked = false;
  var elevatorChecked = false;
  var conditionerChecked = false;

  var filterByDishwasher = function (adDishwasher) {
    return dishwasherChecked ? adDishwasher.includes('dishwasher') : true;
  };

  var filterByWifi = function (adWifi) {
    return wifiChecked ? adWifi.includes('wifi') : true;
  };

  var filterByParking = function (adParking) {
    return parkingChecked ? adParking.includes('parking') : true;
  };

  var filterByWasher = function (adWasher) {
    return washerChecked ? adWasher.includes('washer') : true;
  };

  var filterByElevator = function (adElevator) {
    return elevatorChecked ? adElevator.includes('elevator') : true;
  };

  var filterByConditioner = function (adConditioner) {
    return conditionerChecked ? adConditioner.includes('conditioner') : true;
  };

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
    window.card.clearCard();

    var filteredAds = Ads.filter(function (ad) {
      return filterByType(ad.offer.type) &&
          filterByPrice(ad.offer.price) &&
          filterByGuests(ad.offer.guests) &&
          filterByRoom(ad.offer.rooms) &&
          filterByDishwasher(ad.offer.features) &&
          filterByWifi(ad.offer.features) &&
          filterByParking(ad.offer.features) &&
          filterByWasher(ad.offer.features) &&
          filterByElevator(ad.offer.features) &&
          filterByConditioner(ad.offer.features);
    });
    window.filter.alteredAds = filteredAds;
    window.pin.activatePins(window.filter.alteredAds);
  };

  var onFilterChange = function (evt) {
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
      case window.elements.dishwasherFilter:
        dishwasherChecked = !dishwasherChecked;
        updatePins();
        break;
      case window.elements.wifiFilter:
        wifiChecked = !wifiChecked;
        updatePins();
        break;
      case window.elements.parkingFilter:
        parkingChecked = !parkingChecked;
        updatePins();
        break;
      case window.elements.washerFilter:
        washerChecked = !washerChecked;
        updatePins();
        break;
      case window.elements.elevatorFilter:
        elevatorChecked = !elevatorChecked;
        updatePins();
        break;
      case window.elements.conditionerFilter:
        conditionerChecked = !conditionerChecked;
        updatePins();
        break;
    }
  };

  window.filter = {
    updatePins: updatePins,
    onFilterChange: onFilterChange,
    alteredAds: alteredAds,
  };
})();
