'use strict';

(function () {
  const pictures = document.querySelector(`.pictures`);
  const picturesTitle = pictures.querySelector(`.pictures__title`);
  const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

  const renderPhoto = function (photo) {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).src = photo.url;
    pictureElement.querySelector(`.picture__img`).alt = photo.description;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return pictureElement;
  };

  const showTitle = function () {
    picturesTitle.classList.remove(`visually-hidden`);
  };

  const fillElements = function (data) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(renderPhoto(data[i]));
    }
    pictures.appendChild(fragment);
  };

  const delElements = function (array) {
    array.forEach(function (item) {
      item.remove();
    });
  };

  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`img`);
  const likesCount = document.querySelector(`.likes-count`);
  const commentsCount = document.querySelector(`.comments-count`);
  const socialCaption = document.querySelector(`.social__caption`);
  const socialComments = document.querySelector(`.social__comments`);
  const socialComment = document.querySelector(`.social__comment`);
  const PATH_LENGTH = 13;

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

    if (evt.target.closest(`a`)) {
      let indexCurrentPicture;
      let path;
      if (evt.target.classList.contains(`picture`)) {
        let img = evt.target.querySelector(`img`);
        path = img.src;
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

      bigPicture.classList.remove(`hidden`);
      fillComments(data[indexCurrentPicture]);
      fillBigPicture(data[indexCurrentPicture]);
    }
  };

  const onCancelBigPhotoClick = function () {
    window.bigPicture.closeBigPhoto();
  };

  const onBigPhotoEscPress = function (evt) {
    if (evt.key === window.constants.ESCAPE) {
      evt.preventDefault();
      window.bigPicture.closeBigPhoto();
    }
  };

  showTitle();

  window.picture = {
    picturesBlock: pictures,
    render: fillElements,
    delElements: delElements,
    getIndexPicture: getIndexPicture,
    onCancelBigPhotoClick: onCancelBigPhotoClick,
    onBigPhotoEscPress: onBigPhotoEscPress
  };
})();
