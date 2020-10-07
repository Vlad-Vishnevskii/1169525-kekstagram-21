'use strict';

(function () {
  const commentsList = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

  const avatarNames = [
    `Артем`,
    `Костя`,
    `Иван`,
    `Андрей`,
    `Саша`,
    `Женя`,
    `Игорь`,
    `Максим`];

  const NUMBER_PHOTOS = 25;
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;

  const pictures = document.querySelector(`.pictures`);
  const picturesTitle = pictures.querySelector(`.pictures__title`);
  const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

  const getCommentsArray = function (numberOfComments) {
    const array = [];
    for (let i = 0; i < numberOfComments; i++) {
      const commentObj = {
        avatar: `img/avatar-` + window.util.getRandomInt(1, 6) + `.svg`,
        message: commentsList[window.util.getRandomInt(0, commentsList.length - 1)],
        name: avatarNames[window.util.getRandomInt(0, avatarNames.length - 1)]
      };
      array.push(commentObj);
    }
    return array;
  };

  const createPhotoArray = function () {
    const randomData = [];

    for (let i = 1; i <= NUMBER_PHOTOS; i++) {
      const object = {
        url: `photos/${i}.jpg`,
        description: `Описание фотографии`,
        likes: window.util.getRandomInt(MIN_LIKES, MAX_LIKES),
        comments: getCommentsArray(window.util.getRandomInt(0, 6))
      };
      randomData.push(object);
    }
    return randomData;
  };

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
    const photosArray = createPhotoArray();
    for (let i = 0; i < NUMBER_PHOTOS; i++) {
      fragment.appendChild(renderPhoto(photosArray[i]));
    }
    pictures.appendChild(fragment);
  };

  showTitle();

  fillElements();
})();
