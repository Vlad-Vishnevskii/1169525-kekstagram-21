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

  const popupSuccess = document.querySelector(`#success`)
      .content
      .querySelector(`.success`);
  const main = document.querySelector(`main`);
  const body = document.querySelector(`body`);

  const closePopup = function () {
    const popup = document.querySelector(`.success`);
    main.removeChild(popup);
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    popup.removeEventListener(`click`, onPopupClick);
  };

  const onPopupClick = function (evt) {
    const target = evt.target;
    if (target.tagName === `SECTION` || target.tagName === `BUTTON`) {
      closePopup();
    }
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === window.constants.ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  };

  const showPopup = function () {
    const popupElement = popupSuccess.cloneNode(true);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(popupElement);
    main.appendChild(fragment);

    const popup = document.querySelector(`.success`);
    popup.addEventListener(`click`, onPopupClick);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

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

  const upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        showPopup();
      }
    });

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
