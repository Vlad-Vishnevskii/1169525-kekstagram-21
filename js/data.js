'use strict';

(function () {
  let offers = [];

  const successHandler = function (data) {
    offers = data;
    window.picture.render(offers);
    window.bigPicture.fillBigPicture(offers);
    window.bigPicture.fillBigPictureComments(offers);
  };

  const loadOffers = function () {
    window.backend.download(successHandler);
  };

  loadOffers();
})();
