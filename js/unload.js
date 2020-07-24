'use strict';
(function () {
  var uploadData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess();
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка отправки данных');
    });

    xhr.open('POST', window.constants.UPLOAD_URL);
    xhr.send(data);
  };

  window.upload = {
    uploadData: uploadData,
  };
})();
