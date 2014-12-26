var Tutuka = require('./lib/tutuka.js');

var tutuka = exports;

tutuka.create = function (config) {
  return new Tutuka(config);
};