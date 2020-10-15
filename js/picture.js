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

  showTitle();

  window.picture = {
    render: fillElements,
    delElements: delElements
  };
})();
