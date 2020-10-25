'use strict';

(function () {
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

  const showPopup = function (popupType) {
    const popupElement = popupType.cloneNode(true);
    main.appendChild(popupElement);
    popupElement.addEventListener(`click`, onPopupClick);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  window.popup = {
    show: showPopup
  };
})();
