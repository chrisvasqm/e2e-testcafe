'use strict';

exports.__esModule = true;
exports.exec = exports.killProcess = exports.findProcess = exports.readFile = exports.writeFile = exports.stat = exports.ensureDir = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _psNode = require('ps-node');

var _psNode2 = _interopRequireDefault(_psNode);

var _promisify = require('./promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ensureDir = exports.ensureDir = (0, _promisify2.default)(_mkdirp2.default);
var stat = exports.stat = (0, _promisify2.default)(_fs2.default.stat);
var writeFile = exports.writeFile = (0, _promisify2.default)(_fs2.default.writeFile);
var readFile = exports.readFile = (0, _promisify2.default)(_fs2.default.readFile);

var findProcess = exports.findProcess = (0, _promisify2.default)(_psNode2.default.lookup);
var killProcess = exports.killProcess = (0, _promisify2.default)(_psNode2.default.kill);

var exec = exports.exec = (0, _promisify2.default)(_child_process2.default.exec);