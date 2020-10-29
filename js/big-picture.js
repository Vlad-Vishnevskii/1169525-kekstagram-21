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
  let startIndexComment = 0;
  let endIndexComment = 5;

  const fillComments = function (element, startIndex, endIndex) {
    const fragment = document.createDocumentFragment();

    if (startIndex === 0) {
      socialCommentList.innerHTML = ``;
    }

    for (let i = startIndex; i < endIndex; i++) {
      const socialCommentClone = socialComment.cloneNode(true);
      socialCommentClone.querySelector(`.social__picture`).src = element.comments[i].avatar;
      socialCommentClone.querySelector(`.social__picture`).alt = element.comments[i].name;
      socialCommentClone.querySelector(`.social__text`).textContent = element.comments[i].message;
      fragment.appendChild(socialCommentClone);
      if (i >= element.comments.length - 1) {
        break;
      }
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
    fillComments(element, startIndexComment, endIndexComment);
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

  const onCommentsLoaderClick = function (element, startIndex, endIndex) {
    startIndex += MAX_COMMENTS;
    endIndex += MAX_COMMENTS;
    fillComments(element, startIndex, endIndex);
  };

  const showBigPhoto = function (element) {
    socialCommentCount.classList.add(`hidden`);
    commentLoader.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
    fillBigPicture(element);
    bigPictureCancel.addEventListener(`click`, onCancelBigPhotoClick);
    document.addEventListener(`keydown`, onBigPhotoEscPress);
    startIndexComment = 0;
    endIndexComment = 5;
    commentLoader.addEventListener(`click`, function () {
      onCommentsLoaderClick(element, startIndexComment, endIndexComment);
    });
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
