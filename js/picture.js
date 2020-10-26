'use strict';

(function () {
  const pictures = document.querySelector(`.pictures`);
  const picturesTitle = pictures.querySelector(`.pictures__title`);
  const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

  const renderPhoto = function (photo) {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.dataset.id = photo.id;
    pictureElement.querySelector(`.picture__img`).src = photo.url;
    pictureElement.querySelector(`.picture__img`).alt = photo.description;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return pictureElement;
  };

  const fillElements = function (data) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(renderPhoto(data[i]));
    }
    pictures.appendChild(fragment);
    picturesTitle.classList.remove(`visually-hidden`);
  };

  const delElements = function () {
    const picturesCards = document.querySelectorAll(`.picture`);
    picturesCards.forEach(function (item) {
      item.remove();
    });
  };

  const activeFilter = function (filter) {
    const lastActiveFilter = document.querySelector(`.img-filters__button--active`);
    lastActiveFilter.classList.remove(`img-filters__button--active`);
    if (!filter.classList.contains(`img-filters__button--active`)) {
      filter.classList.add(`img-filters__button--active`);
    }
  };

  window.picture = {
    render: fillElements,
    remove: delElements,
    activeFilter: activeFilter
  };
})();
