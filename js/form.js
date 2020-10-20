'use strict';

(function () {
  const uploadForm = document.querySelector(`#upload-file`);
  const imgUpload = document.querySelector(`.img-upload__overlay`);
  const body = document.querySelector(`body`);
  const uploadCancel = imgUpload.querySelector(`#upload-cancel`);
  const textDescription = document.querySelector(`.text__description`);

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

  uploadForm.addEventListener(`change`, function () {
    openUploadForm();
  });
})();
