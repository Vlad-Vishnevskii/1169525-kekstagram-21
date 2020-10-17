'use strict';

(function () {
  const DEFAULT_EFFECT_VALUE = {
    min: 0,
    max: 100
  };
  const MAX_VALUE_FILTER = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: 3
  };

  const imgUploadPreview = document.querySelector(`.img-upload__preview`);
  const effects = document.querySelector(`.effects`);
  const imgUploadEffectLevel = document.querySelector(`.img-upload__effect-level`);
  const effectLevelDepth = imgUploadEffectLevel.querySelector(`.effect-level__depth`);
  const effectLevelPin = imgUploadEffectLevel.querySelector(`.effect-level__pin`);
  const effectLevelValue = imgUploadEffectLevel.querySelector(`.effect-level__value`);
  const effectLevelLine = imgUploadEffectLevel.querySelector(`.effect-level__line`);
  let currentFilter = null;

  const changeEffect = function (currentCoord) {
    const value = (MAX_VALUE_FILTER[currentFilter] * currentCoord) / 100;
    imgUploadPreview.style.filter = filterMap[currentFilter](value);
  };

  window.slider.init(effectLevelLine, effectLevelPin, effectLevelDepth, changeEffect);

  const filterMap = {
    chrome: function (value) {
      return `grayscale(${value.toFixed(1)})`;
    },
    sepia: function (value) {
      return `sepia(${value.toFixed(1)})`;
    },
    marvin: function (value) {
      return `invert(${value.toFixed(1)}%)`;
    },
    phobos: function (value) {
      return `blur(${value.toFixed(1)}px)`;
    },
    heat: function (value) {
      return `brightness(${value.toFixed(1)})`;
    }
  };

  const resetEffects = function () {
    imgUploadEffectLevel.classList.add(`hidden`);
    imgUploadPreview.style.filter = ``;
    effectLevelValue.value = ``;
  };

  const onEffectChange = function (evt) {
    const target = evt.target;
    resetEffects();
    if (target.value === `none`) {
      effectLevelValue.value = DEFAULT_EFFECT_VALUE.min;
      imgUploadEffectLevel.classList.add(`hidden`);
    } else {
      currentFilter = target.value;
      imgUploadEffectLevel.classList.remove(`hidden`);
      effectLevelPin.style.left = `${DEFAULT_EFFECT_VALUE.max}%`;
      effectLevelDepth.style.width = `${DEFAULT_EFFECT_VALUE.max}%`;
      effectLevelValue.value = DEFAULT_EFFECT_VALUE.max;
      imgUploadPreview.style.filter = filterMap[currentFilter](MAX_VALUE_FILTER[currentFilter]);
    }
  };

  effects.addEventListener(`change`, onEffectChange);

  resetEffects();
})();
