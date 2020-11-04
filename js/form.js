'use strict';

const uploadForm = document.querySelector(`.img-upload__form`);
const uploadFile = document.querySelector(`#upload-file`);
const imgUpload = document.querySelector(`.img-upload__overlay`);
const body = document.querySelector(`body`);
const uploadCancel = imgUpload.querySelector(`#upload-cancel`);
const textDescription = document.querySelector(`.text__description`);
const previewContainer = document.querySelector(`.img-upload__preview`);
const preview = previewContainer.querySelector(`img`);
const effectLevel = document.querySelector(`.effect-level`);

const onUploadFormEscPress = function (evt) {
  if (evt.key === window.constants.ESCAPE && textDescription !== document.activeElement) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onCancelClick = function () {
  closeUploadForm();
};

const onUploadFormChange = function () {
  window.uploadPicture(uploadFile, preview);
  body.classList.add(`modal-open`);
  effectLevel.classList.add(`hidden`);
  imgUpload.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onUploadFormEscPress);
  uploadCancel.addEventListener(`click`, onCancelClick);
};

const closeUploadForm = function () {
  imgUpload.classList.add(`hidden`);
  imgUpload.value = ``;
  preview.src = ``;
  body.classList.remove(`modal-open`);
  window.effects.reset();
  document.removeEventListener(`keydown`, onUploadFormEscPress);
  uploadCancel.removeEventListener(`click`, onCancelClick);
};

const successSend = function () {
  imgUpload.classList.add(`hidden`);
  window.popup.success();
};

const errorSend = function (errorMessage) {
  imgUpload.classList.add(`hidden`);
  window.popup.error(errorMessage);
};

const onSubmitForm = function (evt) {
  window.backend.upload(new FormData(uploadForm), successSend, errorSend);
  evt.preventDefault();
  window.effects.reset();
  uploadForm.reset();
};

uploadFile.addEventListener(`change`, onUploadFormChange);
uploadForm.addEventListener(`submit`, onSubmitForm);
