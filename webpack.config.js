const path = require("path");

module.exports = {
  entry: [
    "./js/constants.js",
    "./js/util.js",
    "./js/popup.js",
    "./js/backend.js",
    "./js/picture.js",
    "./js/filter.js",
    "./js/data.js",
    "./js/big-picture.js",
    "./js/upload-picture.js",
    "./js/form.js",
    "./js/slider.js",
    "./js/effects.js",
    "./js/validation.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    iife: true
  },
  devtool: false
};
