'use strict';

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

const picturesTitle = document.querySelector(`.pictures__title`);
const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getCommentsArray = function (numberOfComments) {
  const array = [];
  for (let i = 0; i < numberOfComments; i++) {
    const commentObj = {
      avatar: `img/avatar-` + getRandomInt(1, 6) + `.svg`,
      message: commentsList[getRandomInt(1, 6)],
      name: avatarNames[getRandomInt(1, 8)]
    };
    array.push(commentObj);
  }
  return array;
};

const createPhotoArray = function () {
  const randomData = [];

  for (let i = 1; i <= 25; i++) {
    let object = {
      url: `photos/` + i + `.jpg`,
      description: `Описание фотографии`,
      likes: getRandomInt(15, 200),
      comments: getCommentsArray(getRandomInt(1, 6))
    };
    randomData.push(object);
  }
  return randomData;
};

const renderPhoto = function (photo) {
  let pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = photo.url;
  pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return pictureElement;
};

const showTitle = function () {
  picturesTitle.classList.remove(`visually-hidden`);
};

const fillingElements = function () {
  let fragment = document.createDocumentFragment();
  const photosArray = createPhotoArray();
  for (let i = 0; i < 25; i++) {
    fragment.appendChild(renderPhoto(photosArray[i]));
  }
  pictures.appendChild(fragment);
};

showTitle();
fillingElements();
