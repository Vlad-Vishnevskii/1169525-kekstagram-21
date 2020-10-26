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
  const socialComments = bigPicture.querySelector(`.social__comments`);
  const socialComment = bigPicture.querySelector(`.social__comment`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  let clickCounter = 0;
  let startIndexComments = 0;

  const fillComments = function (element, indexComment) {
    const fragment = document.createDocumentFragment();
    if (indexComment === 0) {
      socialComments.innerHTML = ``;
    }

    let counter = 0;
    for (let i = indexComment; i < element.comments.length; i++) {
      counter += 1;
      const socialCommentClone = socialComment.cloneNode(true);
      socialCommentClone.querySelector(`.social__picture`).src = element.comments[i].avatar;
      socialCommentClone.querySelector(`.social__picture`).alt = element.comments[i].name;
      socialCommentClone.querySelector(`.social__text`).textContent = element.comments[i].message;
      fragment.appendChild(socialCommentClone);
      if (counter === MAX_COMMENTS) {
        break;
      }
    }
    socialComments.appendChild(fragment);
    let socialCommentsCount = socialComments.childNodes;
    if (element.comments.length < MAX_COMMENTS || socialCommentsCount.length === element.comments.length) {
      commentsLoader.classList.add(`hidden`);
      startIndexComments = 0;
      clickCounter = 0;
    }
  };

  const fillBigPicture = function (element) {
    bigPictureImg.src = element.url;
    likesCount.textContent = element.likes;
    commentsCount.textContent = element.comments.length;
    socialCaption.textContent = element.description;
    fillComments(element, startIndexComments);

    commentsLoader.addEventListener(`click`, function (evt) {
      let target = evt.target.closest(`.comments-loader`);
      if (target) {
        clickCounter += 1;
      }
      startIndexComments = MAX_COMMENTS * clickCounter;
      fillComments(element, startIndexComments);
    });
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
    commentsLoader.classList.remove(`hidden`);
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
    show: showBigPhoto
  };

})();
