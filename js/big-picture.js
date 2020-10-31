'use strict';

(function () {
  const MAX_COMMENTS = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
  const body = document.querySelector(`body`);
  const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
  const bigPictureImg = bigPicture.querySelector(`img`);
  const likesCount = bigPicture.querySelector(`.likes-count`);
  const socialCaption = bigPicture.querySelector(`.social__caption`);
  const socialCommentList = bigPicture.querySelector(`.social__comments`);
  const socialComment = bigPicture.querySelector(`.social__comment`);
  const commentLoader = bigPicture.querySelector(`.comments-loader`);
  const commentsShown = bigPicture.querySelector(`.comments-shown`);
  const commentCount = bigPicture.querySelector(`.comments-count`);
  let commentOnCard = MAX_COMMENTS;
  let BigPhotoElement;

  const fillComments = function (element, commentNumber) {
    const fragment = document.createDocumentFragment();
    socialCommentList.innerHTML = ``;
    let comments = element.comments.slice(0, commentNumber);

    comments.forEach(function (item) {
      const socialCommentClone = socialComment.cloneNode(true);
      socialCommentClone.querySelector(`.social__picture`).src = item.avatar;
      socialCommentClone.querySelector(`.social__picture`).alt = item.name;
      socialCommentClone.querySelector(`.social__text`).textContent = item.message;
      fragment.appendChild(socialCommentClone);
    });
    socialCommentList.appendChild(fragment);
  };

  const getCommentsCount = function (element, endNumber) {
    if (element.comments.length > MAX_COMMENTS) {
      commentLoader.classList.remove(`hidden`);
      socialCommentCount.classList.remove(`hidden`);
      commentsShown.textContent = endNumber;
      commentCount.textContent = element.comments.length;
    }

    if (endNumber === element.comments.length) {
      commentLoader.classList.add(`hidden`);
      socialCommentCount.classList.add(`hidden`);
    }
  };

  const fillBigPicture = function (element) {
    bigPictureImg.src = element.url;
    likesCount.textContent = element.likes;
    socialCaption.textContent = element.description;
    fillComments(element, MAX_COMMENTS);
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

  const onCommentLoaderClick = function () {
    let index = 1;
    const maxClickCount = Math.trunc(BigPhotoElement.comments.length / MAX_COMMENTS);
    if (commentOnCard + MAX_COMMENTS > BigPhotoElement.comments.length) {
      commentOnCard += (BigPhotoElement.comments.length - commentOnCard);
    } else {
      commentOnCard += MAX_COMMENTS;
    }
    getCommentsCount(BigPhotoElement, commentOnCard);
    if (index <= maxClickCount) {
      fillComments(BigPhotoElement, commentOnCard);
    }
    index++;
  };

  const showBigPhoto = function (element) {
    BigPhotoElement = element;
    commentOnCard = MAX_COMMENTS;
    commentLoader.classList.add(`hidden`);
    socialCommentCount.classList.add(`hidden`);
    body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
    fillBigPicture(element);
    bigPictureCancel.addEventListener(`click`, onCancelBigPhotoClick);
    document.addEventListener(`keydown`, onBigPhotoEscPress);
    getCommentsCount(element, MAX_COMMENTS);
    commentLoader.addEventListener(`click`, onCommentLoaderClick);
  };

  const closeBigPhoto = function () {
    bigPicture.classList.add(`hidden`);
    bigPictureCancel.removeEventListener(`click`, onCancelBigPhotoClick);
    document.removeEventListener(`keydown`, onBigPhotoEscPress);
    body.classList.remove(`modal-open`);
    commentLoader.removeEventListener(`click`, onCommentLoaderClick);
  };

  window.bigPicture = {
    show: showBigPhoto
  };

})();
