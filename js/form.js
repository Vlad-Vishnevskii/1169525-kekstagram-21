'use strict';

(function () {
  const uploadForm = document.querySelector(`.img-upload__form`);
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUpload = document.querySelector(`.img-upload__overlay`);
  const body = document.querySelector(`body`);
  const uploadCancel = imgUpload.querySelector(`#upload-cancel`);
  const textDescription = document.querySelector(`.text__description`);
  const popupSuccess = document.querySelector(`#success`)
      .content
      .querySelector(`.success`);
  const popupError = document.querySelector(`#error`)
      .content
      .querySelector(`.error`);

  const onUploadFormEscPress = function (evt) {
    if (evt.key === window.constants.ESCAPE && textDescription !== document.activeElement) {
      evt.preventDefault();
      closeUploadForm();
    }
  };

  const onCancelClick = function () {
    closeUploadForm();
  };

  const openUploadForm = function () {
    imgUpload.classList.remove(`hidden`);
    body.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onUploadFormEscPress);
    uploadCancel.addEventListener(`click`, onCancelClick);
  };

  const closeUploadForm = function () {
    imgUpload.classList.add(`hidden`);
    imgUpload.value = ``;
    body.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, onUploadFormEscPress);
    uploadCancel.removeEventListener(`click`, onCancelClick);
  };

  uploadFile.addEventListener(`change`, function () {
    openUploadForm();
  });

  const successSend = function () {
    imgUpload.classList.add(`hidden`);
    window.popup.show(popupSuccess);
  };

  const errorSend = function (errorMessage) {
    imgUpload.classList.add(`hidden`);
    window.popup.show(popupError);
    const block = document.querySelector(`.error`);
    let popupTitle = block.querySelector(`.error__title`);
    popupTitle.textContent = errorMessage;
  };

  uploadForm.addEventListener(`submit`, function (evt) {
    window.backend.upload(new FormData(uploadForm), successSend, errorSend);
    evt.preventDefault();
    uploadForm.reset();
  });

  window.errorSend = errorSend;
})();
