'use strict';

const LOCATION_X = {
  min: 0,
  max: 100
};

const initSlider = function (scale, handler, depth, action) {
  handler.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let startCoordsX = evt.clientX;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      const shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      const currentCoordsX = ((handler.offsetLeft - shiftX) / scale.clientWidth) * 100;

      if (currentCoordsX <= LOCATION_X.max && currentCoordsX >= LOCATION_X.min) {
        handler.style.left = `${currentCoordsX}%`;
        depth.style.width = `${currentCoordsX}%`;
      }

      action(Math.round(currentCoordsX));
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

window.slider = {
  init: initSlider
};
