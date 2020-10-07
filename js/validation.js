'use strict';

(function () {
  const inputHashtag = document.querySelector(`.text__hashtags`);
  const uploadSelectImageForm = document.querySelector(`#upload-select-image`);
  const MAX_HASHTAGS = 5;
  const MAX_LENGTH_HASHTAG = 20;

  const hasDuplicates = function (item, index, array) {
    return array.indexOf(item, index + 1) >= 0;
  };

  const hashtagValidation = function () {
    let arrayHashTags = inputHashtag.value.trim().toLowerCase().split(` `);
    const re = /^#[\w\a-я]*$/;
    const errors = [];
    arrayHashTags = arrayHashTags.filter(function (item) {
      return item !== ``;
    });

    for (let hashTag of arrayHashTags) {
      if (hashTag.length === 1 && hashTag[0] === `#`) {
        errors.push(`хеш-тег не может состоять только из одной решётки`);
      } else if (!re.test(hashTag)) {
        errors.push(`Хэштег начинается с # не может содержать спецсимволы`);
      } else if (hashTag.length > MAX_LENGTH_HASHTAG) {
        errors.push(`хеш-тег не может может быть длинее ${MAX_LENGTH_HASHTAG} символов`);
      }
    }

    if (arrayHashTags.some(hasDuplicates)) {
      errors.push(`Один и тот же хэш-тег не может быть использован дважды`);
    }

    if (arrayHashTags.length > MAX_HASHTAGS) {
      errors.push(`Нельзя указать больше пяти хэш-тегов`);
    }

    if (errors.length) {
      inputHashtag.setCustomValidity(errors[0]);
    } else {
      inputHashtag.setCustomValidity(``);
    }
    uploadSelectImageForm.reportValidity();
  };

  inputHashtag.addEventListener(`input`, function () {
    hashtagValidation();
  });
})();
