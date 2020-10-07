'use strict';

(function () {
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
})();
