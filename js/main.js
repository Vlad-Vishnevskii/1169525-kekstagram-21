'use strict';

const NUMBER_PHOTOS = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const ESCAPE = `Escape`;
const MAX_LENGTH_HASHTAG = 20;

const pictures = document.querySelector(`.pictures`);
const picturesTitle = pictures.querySelector(`.pictures__title`);
const pictureTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

const uploadForm = document.querySelector(`#upload-file`);
const imgUpload = document.querySelector(`.img-upload__overlay`);
const body = document.querySelector(`body`);
const uploadCancel = imgUpload.querySelector(`#upload-cancel`);

const onUploadFormEscPress = function (evt) {
  if (evt.key === ESCAPE) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onCancelClick = function () {
  closeUploadForm();
};

const openUploadForm = function () {
  imgUpload.classList.remove(`hidden`);
  body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onUploadFormEscPress);
  uploadCancel.addEventListener(`click`, onCancelClick);
};

const closeUploadForm = function () {
  imgUpload.classList.add(`hidden`);
  imgUpload.value = ``;
  body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onUploadFormEscPress);
  uploadCancel.removeEventListener(`click`, onCancelClick);
};

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

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getCommentsArray = function (numberOfComments) {
  const array = [];
  for (let i = 0; i < numberOfComments; i++) {
    const commentObj = {
      avatar: `img/avatar-` + getRandomInt(1, 6) + `.svg`,
      message: commentsList[getRandomInt(0, commentsList.length - 1)],
      name: avatarNames[getRandomInt(0, avatarNames.length - 1)]
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
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: getCommentsArray(getRandomInt(0, 6))
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

uploadForm.addEventListener(`change`, function () {
  openUploadForm();
});

/* ползунок */

const effectLevelPin = document.querySelector(`.effect-level__pin`);
const effectLevelValue = document.querySelector(`.effect-level__value`);
const effectLevelLine = document.querySelector(`.effect-level__line`);
const imgUploadPreviewWrapper = document.querySelector(`.img-upload__preview`);
const imgUploadPreview = imgUploadPreviewWrapper.querySelector(`img`);
const effects = document.querySelector(`.effects`);

const truncated = function (num) {
  return Math.trunc(num * 10) / 10;
};

const calculatingBlurEffect = function (value) {
  if (value <= 25) {
    return 0;
  } else if (value > 25 && value <= 50) {
    return 1;
  } else if (value > 50 && value <= 75) {
    return 2;
  } else {
    return 3;
  }
};

const getImageFilter = function (filterName, filterValue) {
  imgUploadPreview.style.WebkitFilter = `${filterName}(${filterValue})`;
  imgUploadPreview.style.filter = `${filterName}(${filterValue})`;

  if (filterName === `invert`) {
    imgUploadPreview.style.WebkitFilter = `${filterName}(${filterValue * 100}%)`;
    imgUploadPreview.style.filter = `${filterName}(${filterValue * 100}%)`;
  } else if (filterName === `blur`) {
    imgUploadPreview.style.WebkitFilter = `${filterName}(${filterValue}px)`;
    imgUploadPreview.style.filter = `${filterName}(${filterValue}px)`;
  } else if (filterName === `none`) {
    imgUploadPreview.style.WebkitFilter = `none`;
    imgUploadPreview.style.filter = `none`;
  }
};

const applyFilterToImg = function (filterClass) {
  imgUploadPreview.setAttribute(`class`, ``);

  if (filterClass !== `none`) {
    imgUploadPreview.classList.add(filterClass);
  }
};

effects.addEventListener(`click`, function (evt) {
  if (evt.target.id === `effect-chrome`) {
    applyFilterToImg(`effects__preview--chrome`);
    getImageFilter(`grayscale`, 1);
  } else if (evt.target.id === `effect-sepia`) {
    applyFilterToImg(`effects__preview--sepia`);
    getImageFilter(`sepia`, 1);
  } else if (evt.target.id === `effect-marvin`) {
    applyFilterToImg(`effects__preview--marvin`);
    getImageFilter(`invert`, 100);
  } else if (evt.target.id === `effect-phobos`) {
    applyFilterToImg(`effects__preview--phobos`);
    getImageFilter(`blur`, 3);
  } else if (evt.target.id === `effect-heat`) {
    applyFilterToImg(`effects__preview--heat`);
    getImageFilter(`brightness`, 3);
  } else if (evt.target.id === `effect-none`) {
    applyFilterToImg(`none`);
    getImageFilter(`none`);
  }
});

effectLevelPin.addEventListener(`mouseup`, function () {
  let effectLevel = truncated(effectLevelPin.offsetLeft / effectLevelLine.offsetWidth);
  effectLevelValue.textContent = effectLevel;

  if (imgUploadPreview.classList.contains(`effects__preview--chrome`)) {
    getImageFilter(`grayscale`, effectLevel);
  } else if (imgUploadPreview.classList.contains(`effects__preview--sepia`)) {
    getImageFilter(`sepia`, effectLevel);
  } else if (imgUploadPreview.classList.contains(`effects__preview--marvin`)) {
    getImageFilter(`invert`, effectLevel);
  } else if (imgUploadPreview.classList.contains(`effects__preview--phobos`)) {
    getImageFilter(`blur`, calculatingBlurEffect(effectLevel));
  } else if (imgUploadPreview.classList.contains(`effects__preview--heat`)) {
    getImageFilter(`brightness`, effectLevel);
  }
});

/* хэш тег */

const inputHashtag = document.querySelector(`.text__hashtags`);
const uploadSelectImageForm = document.querySelector(`#upload-select-image`);
const MAX_HASHTAGS = 5;

const hasDuplicates = function (item, index, array) {
  return array.indexOf(item, index + 1) >=0;
};

const hashtagValidation = function () {
  const arrayHashTags = inputHashtag.value.trim().toLowerCase().split(` `);
  const re = /^#[\w\a-я]*$/;

  for (let hashTag of arrayHashTags) {
    if (hashTag.length === 1 && hashTag[0] === `#`) {
      inputHashtag.setCustomValidity(`хеш-тег не может состоять только из одной решётки`);
    } else if (!re.test(hashTag)) {
      inputHashtag.setCustomValidity(`Хэштег начинается с # не может содержать спецсимволы`);
    } else if (hashTag.length > MAX_LENGTH_HASHTAG) {
      inputHashtag.setCustomValidity(`хеш-тег не может может быть длинее ${MAX_LENGTH_HASHTAG} символов`);
    } else if (arrayHashTags.length > MAX_HASHTAGS) {
      inputHashtag.setCustomValidity(`Нельзя указать больше пяти хэш-тегов`);
    } else if (arrayHashTags.some(hasDuplicates)) {
      inputHashtag.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды`);
    } else {
      inputHashtag.setCustomValidity(``);
    }
  }
  uploadSelectImageForm.reportValidity();
};

inputHashtag.addEventListener(`input`, function () {
  hashtagValidation();
});
