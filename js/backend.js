'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const URL_UPLOAD = `https://21.javascript.pages.academy/kekstagram`;
  const StatusCode = {
    OK: 200
  };
  const messageOfError = {
    400: `Неверный запрос`,
    401: `Пользователь не авторизирован`,
    403: `Доступ запрещен`,
    404: `Ничего не найдено`,
    500: `Внутренняя ошибка сервера`
  };

  const TIMEOUT_IN_MS = 10000;

  const createXhr = function (onSuccess, onError, method, url, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${messageOfError[xhr.status]}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  const download = function (onSuccess, onError) {
    createXhr(onSuccess, onError, `GET`, URL);
  };

  const upload = function (data, onSuccess, onError) {
    createXhr(onSuccess, onError, `POST`, URL_UPLOAD, data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
