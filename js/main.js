'use strict';

(function () {
  var activeDocument = true;

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

    if (buttonPressed === window.constants.Buttons.mouseLeft || evt.key === window.constants.Buttons.enter) {
      activateDocument();
      window.map.setMainPinAddress();
    }
  };

  var onSubmitFormEvent = function (evt) {
    window.api.dataExchange(createSuccessMessage, createErrorMessage, window.constants.Methods.POST,
        window.constants.UPLOAD_URL, new FormData(window.elements.adForm));
    evt.preventDefault();
  };

  var onClickSuccessMessageClose = function (evt) {
    var buttonPressed = evt.button;

    if (evt.target.className === window.constants.Answers.success &&
      buttonPressed === window.constants.Buttons.mouseLeft || evt.key === window.constants.Buttons.escape) {
      document.querySelector('main').removeChild(document.querySelector('.success'));
      document.removeEventListener('click', onClickSuccessMessageClose);
      document.removeEventListener('keydown', onClickSuccessMessageClose);
    }
  };

  var onClickErrorMessageClose = function (evt) {
    var buttonPressed = evt.button;
    var errorButton = document.querySelector('.error__button');
    if (evt.target.className === window.constants.Answers.success ||
      evt.target.className === 'error__button' && buttonPressed === window.constants.Buttons.mouseLeft ||
      evt.key === window.constants.Buttons.escape) {
      document.querySelector('main').removeChild(document.querySelector('.error'));
      errorButton.removeEventListener('click', onClickErrorMessageClose);
      document.removeEventListener('click', onClickErrorMessageClose);
      document.removeEventListener('keydown', onClickErrorMessageClose);
    }
  };

  var onSuccessLoadData = function (data) {
    data.forEach(function (dataAd) {
      if (dataAd['offer'] !== undefined) {
        window.api.dataAds.push(dataAd);
      }
    });
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


  var disableForm = function () {
    window.map.setMainPinAddress();
    window.form.clear();
    addFaded();

    window.elements.fieldset.forEach(function (fieldset) {
      fieldset.disabled = true;
    });

    window.elements.select.forEach(function (select) {
      select.disabled = true;
    });

    window.main.activeDocument = false;

    window.pin.resetMain();
    window.map.pinsRemoveEventOpenCard();
    window.pin.remove();
    window.card.clear();
    window.filter.reset();

    window.elements.mapPinMain.addEventListener('mousedown', onPinPress);
    window.elements.mapPinMain.addEventListener('keydown', onPinPress);

    window.elements.adForm.removeEventListener('submit', onSubmitFormEvent);
    window.elements.reset.removeEventListener('click', window.form.onClickReset);
    window.elements.reset.removeEventListener('keydown', window.form.onClickReset);
    window.elements.filterForm.removeEventListener('change', window.filter.formChangeHandler);
    window.form.removeEvents();
  };

  var activateDocument = function () {
    window.filter.updatePins();
    removeFaded();

    window.elements.fieldset.forEach(function (fieldset) {
      fieldset.disabled = false;
    });

    window.elements.select.forEach(function (select) {
      select.disabled = false;
    });

    window.map.pinsAddEventOpenCard();
    window.main.activeDocument = true;

    window.elements.mapPinMain.removeEventListener('mousedown', onPinPress);
    window.elements.mapPinMain.removeEventListener('keydown', onPinPress);

    window.elements.adForm.addEventListener('submit', onSubmitFormEvent);
    window.elements.reset.addEventListener('click', window.form.onClickReset);
    window.elements.reset.addEventListener('keydown', window.form.onClickReset);
    window.elements.filterForm.addEventListener('change', window.filter.formChangeHandler);
    window.form.addEvents();
  };

  window.main = {
    activeDocument: activeDocument,
    disableForm: disableForm,
  };

  window.api.dataExchange(onSuccessLoadData, createErrorMessage, window.constants.Methods.GET, window.constants.LOAD_URL);
  disableForm();
})();

