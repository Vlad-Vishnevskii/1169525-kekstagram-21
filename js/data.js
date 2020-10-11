'use strict';

(function () {
  let offers = [];

  const successHandler = function (data) {
    offers = data;
    window.picture.render(offers);
  };

  const loadOffers = function () {
    window.backend.download(successHandler);
  };

  loadOffers();
})();
