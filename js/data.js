'use strict';

(function () {
  let offers = [];

  const successHandler = function (data) {
    offers = data;
    window.picture.render(offers);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  const loadOffers = function () {
    window.load.download(successHandler, errorHandler);
  };

  loadOffers();
})();
