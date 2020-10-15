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

  const showBigPhoto = function () {
    socialCommentCount.classList.add(`hidden`);
    commentsLoader.classList.add(`hidden`);
    body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
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

    fillComments(element);
    showBigPhoto();
  };

  window.bigPicture = {
    render: fillBigPicture
  };
})();
