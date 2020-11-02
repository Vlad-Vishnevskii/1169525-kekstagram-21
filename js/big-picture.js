'use strict';

const MAX_COMMENTS = 5;
const bigPicture = document.querySelector(`.big-picture`);
const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
const body = document.querySelector(`body`);
const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
const bigPictureImg = bigPicture.querySelector(`img`);
const likeCount = bigPicture.querySelector(`.likes-count`);
const socialCaption = bigPicture.querySelector(`.social__caption`);
const socialCommentList = bigPicture.querySelector(`.social__comments`);
const socialComment = bigPicture.querySelector(`.social__comment`);
const commentLoader = bigPicture.querySelector(`.comments-loader`);
const commentShown = bigPicture.querySelector(`.comments-shown`);
const commentCount = bigPicture.querySelector(`.comments-count`);
let bigPhotoElement;
let index = 1;

const fillComments = function (commentArray) {
  const fragment = document.createDocumentFragment();
  socialCommentList.innerHTML = ``;

  commentArray.forEach(function (item) {
    const socialCommentClone = socialComment.cloneNode(true);
    socialCommentClone.querySelector(`.social__picture`).src = item.avatar;
    socialCommentClone.querySelector(`.social__picture`).alt = item.name;
    socialCommentClone.querySelector(`.social__text`).textContent = item.message;
    fragment.appendChild(socialCommentClone);
  });
  socialCommentList.appendChild(fragment);
};

const showCommentsCount = function (element) {
  if (element.comments.length > MAX_COMMENTS) {
    commentLoader.classList.remove(`hidden`);
    socialCommentCount.classList.remove(`hidden`);
    commentShown.textContent = MAX_COMMENTS;
    commentCount.textContent = element.comments.length;
  }
};

const fillBigPicture = function (element) {
  bigPictureImg.src = element.url;
  likeCount.textContent = element.likes;
  socialCaption.textContent = element.description;
  fillComments(element.comments.slice(0, MAX_COMMENTS));
  showCommentsCount(element);
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
  index++;
  const commentsArray = bigPhotoElement.comments.slice(0, index * MAX_COMMENTS);
  fillComments(commentsArray);
  if (commentsArray.length >= bigPhotoElement.comments.length) {
    commentLoader.classList.add(`hidden`);
  }
  commentShown.textContent = commentsArray.length;
};

const showBigPhoto = function (element) {
  bigPhotoElement = element;
  index = 1;
  commentLoader.classList.add(`hidden`);
  socialCommentCount.classList.add(`hidden`);
  body.classList.add(`modal-open`);
  bigPicture.classList.remove(`hidden`);
  fillBigPicture(element);
  bigPictureCancel.addEventListener(`click`, onCancelBigPhotoClick);
  document.addEventListener(`keydown`, onBigPhotoEscPress);
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
