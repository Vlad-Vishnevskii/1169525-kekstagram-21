'use strict';

(function () {
  const MAX_COMMENTS = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
  const body = document.querySelector(`body`);
  const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
  const bigPictureImg = bigPicture.querySelector(`img`);
  const likesCount = bigPicture.querySelector(`.likes-count`);
  const commentsCount = bigPicture.querySelector(`.comments-count`);
  const socialCaption = bigPicture.querySelector(`.social__caption`);
  const socialCommentList = bigPicture.querySelector(`.social__comments`);
  const socialComment = bigPicture.querySelector(`.social__comment`);
  const commentLoader = bigPicture.querySelector(`.comments-loader`);
  let currentCountComment = MAX_COMMENTS;

  const fillComments = function (element) {
    const fragment = document.createDocumentFragment();
    socialCommentList.innerHTML = ``;

    for (let i = 0; i < element.comments.length; i++) {
      const socialCommentClone = socialComment.cloneNode(true);
      socialCommentClone.querySelector(`.social__picture`).src = element.comments[i].avatar;
      socialCommentClone.querySelector(`.social__picture`).alt = element.comments[i].name;
      socialCommentClone.querySelector(`.social__text`).textContent = element.comments[i].message;
      fragment.appendChild(socialCommentClone);
    }
    socialCommentList.appendChild(fragment);
    if (element.comments.length < MAX_COMMENTS) {
      commentLoader.classList.add(`hidden`);
    }
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

  const hideComments = function () {
    const socialComments = socialCommentList.childNodes;
    for (let i = MAX_COMMENTS; i < socialComments.length; i++) {
      let comment = socialComments[i];
      comment.classList.add(`hidden`);
    }
  };

  const onCommentsLoaderClick = function () {
    const socialComments = socialCommentList.childNodes;
    currentCountComment += MAX_COMMENTS;
    for (let i = MAX_COMMENTS; i < currentCountComment; i++) {
      let comment = socialComments[i];
      comment.classList.remove(`hidden`);
      if (i === socialComments.length - 1) {
        commentLoader.classList.add(`hidden`);
        break;
      }
    }
  };

  const showBigPhoto = function (element) {
    currentCountComment = MAX_COMMENTS;
    socialCommentCount.classList.add(`hidden`);
    commentLoader.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
    fillBigPicture(element);
    hideComments();
    commentLoader.addEventListener(`click`, onCommentsLoaderClick);
    bigPictureCancel.addEventListener(`click`, onCancelBigPhotoClick);
    document.addEventListener(`keydown`, onBigPhotoEscPress);
  };

  const closeBigPhoto = function () {
    bigPicture.classList.add(`hidden`);
    bigPictureCancel.removeEventListener(`click`, onCancelBigPhotoClick);
    document.removeEventListener(`keydown`, onBigPhotoEscPress);
    commentLoader.removeEventListener(`click`, onCommentsLoaderClick);
    body.classList.remove(`modal-open`);
  };

  window.bigPicture = {
    show: showBigPhoto
  };

})();
