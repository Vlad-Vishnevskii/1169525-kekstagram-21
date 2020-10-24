'use strict';

(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const body = document.querySelector(`body`);
  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
  const bigPictureImg = bigPicture.querySelector(`img`);
  const likesCount = document.querySelector(`.likes-count`);
  const commentsCount = document.querySelector(`.comments-count`);
  const socialCaption = document.querySelector(`.social__caption`);
  const socialComments = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`.social__comment`);

  const fillComments = function (element) {
    const fragment = document.createDocumentFragment();
    socialComments.innerHTML = ``;

    for (let i = 0; i < element.comments.length; i++) {
      const socialCommentClone = socialComment.cloneNode(true);
      socialCommentClone.querySelector(`.social__picture`).src = element.comments[i].avatar;
      socialCommentClone.querySelector(`.social__picture`).alt = element.comments[i].name;
      socialCommentClone.querySelector(`.social__text`).textContent = element.comments[i].message;
      fragment.appendChild(socialCommentClone);
    }
    socialComments.appendChild(fragment);
  };

  const fillBigPicture = function (element) {
    bigPictureImg.src = element.url;
    likesCount.textContent = element.likes;
    commentsCount.textContent = element.comments.length;
    socialCaption.textContent = element.description;
    fillComments(element);
  };

  const onCancelBigPhotoClick = function () {
    closeBigPhoto();
  };

  const onBigPhotoEscPress = function (evt) {
    if (evt.key === window.constants.ESCAPE) {
      evt.preventDefault();
      closeBigPhoto();
    }
  };

  const showBigPhoto = function (element) {
    socialCommentCount.classList.add(`hidden`);
    body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
    fillBigPicture(element);
    bigPictureCancel.addEventListener(`click`, onCancelBigPhotoClick);
    document.addEventListener(`keydown`, onBigPhotoEscPress);
  };

  const closeBigPhoto = function () {
    bigPicture.classList.add(`hidden`);
    bigPictureCancel.removeEventListener(`click`, onCancelBigPhotoClick);
    document.removeEventListener(`keydown`, onBigPhotoEscPress);
    body.classList.remove(`modal-open`);
  };

  window.bigPicture = {
    showBigPhoto: showBigPhoto
  };

})();
