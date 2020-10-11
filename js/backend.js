'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
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

  const download = function (onSuccess, onError) {
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

    xhr.open(`GET`, URL);
    xhr.send();
  };

  window.backend = {
    download: download
  };
})();
