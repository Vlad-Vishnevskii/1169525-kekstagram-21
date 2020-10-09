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

  const fillElements = function () {
    const fragment = document.createDocumentFragment();
    const photosArray = window.data.createPhotoArray();
    for (let i = 0; i < window.data.NUMBER_PHOTOS; i++) {
      fragment.appendChild(renderPhoto(photosArray[i]));
    }
    pictures.appendChild(fragment);
  };

  showTitle();

  fillElements();
})();
