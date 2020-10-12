'use strict';

(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`img`);
  const likesCount = document.querySelector(`.likes-count`);
  const commentsCount = document.querySelector(`.comments-count`);
  const socialCaption = document.querySelector(`.social__caption`);
  const socialComments = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`.social__comment`);
  const socialCommentCollection = document.querySelectorAll(`.social__comment`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentsLoader = document.querySelector(`.comments-loader`);
  const body = document.querySelector(`body`);

  bigPicture.classList.remove(`hidden`);
  socialCommentCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);
  body.classList.add(`modal-open`);

  const fillBigPicture = function (array) {
    bigPictureImg.src = array[0].url;
    likesCount.textContent = array[0].likes;
    commentsCount.textContent = array[0].comments.length;
    socialCaption.textContent = array[0].description;
  };

  const fillBigPictureComments = function (array) {
    for (let i = 0; i < array[0].comments.length; i++) {
      if (i <= 1) {
        socialCommentCollection[i].querySelector(`.social__picture`).src = array[0].comments[i].avatar;
        socialCommentCollection[i].querySelector(`.social__picture`).alt = array[0].comments[i].name;
        socialCommentCollection[i].querySelector(`.social__text`).textContent = array[0].comments[i].message;
      } else {
        const socialCommentClone = socialComment.cloneNode(true);
        socialCommentClone.querySelector(`.social__picture`).src = array[0].comments[i].avatar;
        socialCommentClone.querySelector(`.social__picture`).alt = array[0].comments[i].name;
        socialCommentClone.querySelector(`.social__text`).textContent = array[0].comments[i].message;
        socialComments.appendChild(socialCommentClone);
      }
    }
  };

  window.bigPicture = {
    fillBigPicture: fillBigPicture,
    fillBigPictureComments: fillBigPictureComments
  };
})();
