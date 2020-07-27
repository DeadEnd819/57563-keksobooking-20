'use strict';
(function () {
  var activeDocument = false;

  window.main = {
    activeDocument: activeDocument,
  };

  var addFaded = function () {
    document.querySelector('.map').classList.add('map--faded');
    window.elements.adForm.classList.add('ad-form--disabled');
  };

  var removeFaded = function () {
    document.querySelector('.map').classList.remove('map--faded');
    window.elements.adForm.classList.remove('ad-form--disabled');
  };

  var onPinPress = function (evt) {
    var buttonPressed = evt.button;

    if (buttonPressed === 0 || evt.key === 'Enter') {
      activateDocument();
      window.map.setMainPinAddress();
    }
  };

  var submitFormEvent = function (evt) {
    window.api.dataExchange(createSuccessMessage, createErrorMessage, window.constants.METHOD[1], window.constants.UPLOAD_URL, new FormData(window.elements.adForm));
    evt.preventDefault();
  };

  var disableForm = function () {
    window.map.setMainPinAddress();
    window.form.clearForm();
    addFaded();

    for (var i = 0; i < window.elements.fieldset.length; i++) {
      window.elements.fieldset[i].disabled = true;
    }

    for (var j = 0; j < window.elements.select.length; j++) {
      window.elements.select[j].disabled = true;
    }

    window.main.activeDocument = false;

    window.pin.resetMainPin();

    window.map.setMainPinAddress();
    window.map.pinsRemoveEventOpenCard();
    window.pin.deletePins();
    window.card.clearCard();
    window.filter.resetFilters();

    window.elements.mapPinMain.addEventListener('mousedown', onPinPress);
    window.elements.mapPinMain.addEventListener('keydown', onPinPress);

    window.elements.adForm.removeEventListener('submit', submitFormEvent);
    window.elements.reset.removeEventListener('click', window.form.noClickResetForm);
    window.elements.reset.removeEventListener('keydown', window.form.noClickResetForm);
    window.elements.filterForm.removeEventListener('change', window.filter.onFilterChange);
  };

  disableForm();

  var onClickSuccessMessageClose = function (evt) {
    var buttonPressed = evt.button;

    if (evt.target.className === 'success' && buttonPressed === 0 || evt.key === 'Escape') {
      document.querySelector('main').removeChild(document.querySelector('.success'));
      document.removeEventListener('click', onClickSuccessMessageClose);
      document.removeEventListener('keydown', onClickSuccessMessageClose);
    }
  };

  var onClickErrorMessageClose = function (evt) {
    var buttonPressed = evt.button;
    var errorButton = document.querySelector('.error__button');
    if (evt.target.className === 'error' || evt.target.className === 'error__button' && buttonPressed === 0 || evt.key === 'Escape') {
      document.querySelector('main').removeChild(document.querySelector('.error'));
      errorButton.removeEventListener('click', onClickErrorMessageClose);
      document.removeEventListener('click', onClickErrorMessageClose);
      document.removeEventListener('keydown', onClickErrorMessageClose);
    }
  };

  var onSuccessLoadData = function (data) {
    for (var i = 0; i < data.length; i++) {
      if (typeof data[i]['offer'] !== 'undefined') {
        window.api.arrAds.push(data[i]);
      }
    }
  };

  var createErrorMessage = function (message) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);

    errorMessage.querySelector('.error__message').textContent = message;
    document.querySelector('main').insertAdjacentElement('afterbegin', errorMessage);
    document.querySelector('.error__button').addEventListener('click', onClickErrorMessageClose);
    document.addEventListener('click', onClickErrorMessageClose);
    document.addEventListener('keydown', onClickErrorMessageClose);
  };

  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);

    document.querySelector('main').insertAdjacentElement('afterbegin', successMessage);
    document.addEventListener('click', onClickSuccessMessageClose);
    document.addEventListener('keydown', onClickSuccessMessageClose);

    disableForm();
  };

  window.api.dataExchange(onSuccessLoadData, createErrorMessage, window.constants.METHOD[0], window.constants.LOAD_URL);

  var activateDocument = function () {
    removeFaded();

    for (var i = 0; i < window.elements.fieldset.length; i++) {
      window.elements.fieldset[i].disabled = false;
    }

    for (var j = 0; j < window.elements.select.length; j++) {
      window.elements.select[j].disabled = false;
    }

    window.filter.updatePins();
    window.map.pinsAddEventOpenCard();
    window.main.activeDocument = true;

    window.elements.mapPinMain.removeEventListener('mousedown', onPinPress);
    window.elements.mapPinMain.removeEventListener('keydown', onPinPress);

    window.elements.adForm.addEventListener('submit', submitFormEvent);
    window.elements.reset.addEventListener('click', window.form.noClickResetForm);
    window.elements.reset.addEventListener('keydown', window.form.noClickResetForm);
    window.elements.filterForm.addEventListener('change', window.filter.onFilterChange);
  };

})();

