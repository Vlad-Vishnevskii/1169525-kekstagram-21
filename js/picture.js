'use strict';

const pictureContainer = document.querySelector(`.pictures`);
const pictureTitle = pictureContainer.querySelector(`.pictures__title`);
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
  pictureContainer.appendChild(fragment);
  pictureTitle.classList.remove(`visually-hidden`);
};

const delElements = function () {
  const picturesCards = document.querySelectorAll(`.picture`);
  picturesCards.forEach(function (item) {
    item.remove();
  });
};

window.picture = {
  render: fillElements,
  remove: delElements
};
