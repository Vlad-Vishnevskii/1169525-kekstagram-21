'use strict';

(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentsLoader = document.querySelector(`.comments-loader`);
  const body = document.querySelector(`body`);
  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);

  const showBigPhoto = function (data, evt) {
    socialCommentCount.classList.add(`hidden`);
    commentsLoader.classList.add(`hidden`);
    window.picture.getIndexPicture(data, evt);
    body.classList.add(`modal-open`);
    bigPictureCancel.addEventListener(`click`, window.picture.onCancelBigPhotoClick);
    document.addEventListener(`keydown`, window.picture.onBigPhotoEscPress);
  };

  const closeBigPhoto = function () {
    bigPicture.classList.add(`hidden`);
    bigPictureCancel.removeEventListener(`click`, window.picture.onCancelBigPhotoClick);
    document.removeEventListener(`keydown`, window.picture.onBigPhotoEscPress);
    body.classList.remove(`modal-open`);
  };

  window.bigPicture = {
    showBigPhoto: showBigPhoto,
    closeBigPhoto: closeBigPhoto
  };

})();
