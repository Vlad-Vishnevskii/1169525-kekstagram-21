'use strict';

(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImgWrapper = document.querySelector(`.big-picture__img`);
  const bigPictureImg = bigPictureImgWrapper.querySelector(`img`);
  const likesCount = document.querySelector(`.likes-count`);
  const commentsCount = document.querySelector(`.comments-count`);
  const socialCaption = document.querySelector(`.social__caption`);
  const socialComments = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`.social__comment`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentsLoader = document.querySelector(`.comments-loader`);
  const body = document.querySelector(`body`);
  const pictures = document.querySelector(`.pictures`);
  const PATH_LENGTH = 13;
  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
  const ESCAPE = `Escape`;
  const ENTER = `Enter`;

  const onCancelBigPhotoClick = function () {
    closeBigPhoto();
  };

  const onBigPhotoEscPress = function (evt) {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      closeBigPhoto();
    }
  };

  const showBigPhoto = function () {
    socialCommentCount.classList.add(`hidden`);
    commentsLoader.classList.add(`hidden`);
    body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);

    bigPictureCancel.addEventListener(`click`, onCancelBigPhotoClick);
  };

  const closeBigPhoto = function () {
    bigPicture.classList.add(`hidden`);
    bigPictureCancel.removeEventListener(`click`, onCancelBigPhotoClick);
    pictures.removeEventListener(`keydown`, onBigPhotoEscPress);
    body.classList.remove(`modal-open`);
  };

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
  };

  const getIndexPicture = function (data, evt) {
    const picture = document.querySelector(`.picture`);
    const pictureImg = picture.querySelector(`img`);
    if (evt.target === picture || evt.target === pictureImg) {
      let indexCurrentPicture;
      let path;
      if (evt.key === ENTER) {
        const element = evt.target;
        let elementImg = element.querySelector(`img`);
        path = elementImg.src;
      } else {
        path = evt.target.src;
      }

      path = path.substring(path.length - PATH_LENGTH);
      if (path[0] === `/`) {
        path = path.slice(1);
      }

      let i = -1;
      for (let element of data) {
        i++;
        if (element.url === path) {
          indexCurrentPicture = i;
        }
      }

      showBigPhoto();
      pictures.addEventListener(`keydown`, onBigPhotoEscPress);
      fillComments(data[indexCurrentPicture]);
      fillBigPicture(data[indexCurrentPicture]);
    }
  };

  const onPictureClick = function (data) {
    pictures.addEventListener(`click`, function (evt) {
      getIndexPicture(data, evt);
    });

    pictures.addEventListener(`keydown`, function (evt) {
      if (evt.key === ENTER) {
        getIndexPicture(data, evt);
      }
    });
  };

  window.bigPicture = {
    onPictureClick: onPictureClick
  };

})();
