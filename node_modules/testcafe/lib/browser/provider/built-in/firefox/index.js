'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _osFamily = require('os-family');

var _osFamily2 = _interopRequireDefault(_osFamily);

var _runtimeInfo = require('./runtime-info');

var _runtimeInfo2 = _interopRequireDefault(_runtimeInfo);

var _localFirefox = require('./local-firefox');

var _marionetteClient = require('./marionette-client');

var _marionetteClient2 = _interopRequireDefault(_marionetteClient);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    openedBrowsers: {},

    isMultiBrowser: false,

    openBrowser: function openBrowser(browserId, pageUrl, configString) {
        var _this = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var runtimeInfo, browserName, marionetteClient;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _runtimeInfo2.default)(configString);

                        case 2:
                            runtimeInfo = _context.sent;
                            browserName = _this.providerName.replace(':', '');


                            runtimeInfo.browserId = browserId;
                            runtimeInfo.browserName = browserName;

                            _context.next = 8;
                            return (0, _localFirefox.start)(pageUrl, runtimeInfo);

                        case 8:
                            _context.next = 10;
                            return _this.waitForConnectionReady(runtimeInfo.browserId);

                        case 10:
                            if (!runtimeInfo.config.headless) {
                                _context.next = 15;
                                break;
                            }

                            marionetteClient = new _marionetteClient2.default(runtimeInfo.marionettePort);
                            _context.next = 14;
                            return marionetteClient.connect();

                        case 14:

                            runtimeInfo.marionetteClient = marionetteClient;

                        case 15:

                            _this.openedBrowsers[browserId] = runtimeInfo;

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    closeBrowser: function closeBrowser(browserId) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var runtimeInfo, config, marionetteClient;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            runtimeInfo = _this2.openedBrowsers[browserId];
                            config = runtimeInfo.config, marionetteClient = runtimeInfo.marionetteClient;

                            if (!config.headless) {
                                _context2.next = 7;
                                break;
                            }

                            _context2.next = 5;
                            return marionetteClient.quit();

                        case 5:
                            _context2.next = 9;
                            break;

                        case 7:
                            _context2.next = 9;
                            return _this2.closeLocalBrowser(browserId);

                        case 9:
                            if (!(_osFamily2.default.mac && !config.headless)) {
                                _context2.next = 12;
                                break;
                            }

                            _context2.next = 12;
                            return (0, _localFirefox.stop)(runtimeInfo);

                        case 12:

                            delete _this2.openedBrowsers[browserId];

                        case 13:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    isLocalBrowser: function isLocalBrowser(browserId, configString) {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var config;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            config = _this3.openedBrowsers[browserId] ? _this3.openedBrowsers[browserId].config : (0, _config2.default)(configString);
                            return _context3.abrupt('return', !config.headless);

                        case 2:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },
    takeScreenshot: function takeScreenshot(browserId, path) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            var marionetteClient;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            marionetteClient = _this4.openedBrowsers[browserId].marionetteClient;
                            _context4.next = 3;
                            return marionetteClient.takeScreenshot(path);

                        case 3:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    },
    resizeWindow: function resizeWindow(browserId, width, height) {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            var marionetteClient;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            marionetteClient = _this5.openedBrowsers[browserId].marionetteClient;
                            _context5.next = 3;
                            return marionetteClient.setWindowSize(width, height);

                        case 3:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    },
    hasCustomActionForBrowser: function hasCustomActionForBrowser(browserId) {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            var _openedBrowsers$brows, config, marionetteClient;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _openedBrowsers$brows = _this6.openedBrowsers[browserId], config = _openedBrowsers$brows.config, marionetteClient = _openedBrowsers$brows.marionetteClient;
                            return _context6.abrupt('return', {
                                hasCloseBrowser: true,
                                hasResizeWindow: !!marionetteClient && config.headless,
                                hasTakeScreenshot: !!marionetteClient && config.headless,
                                hasCanResizeWindowToDimensions: false,
                                hasMaximizeWindow: false
                            });

                        case 2:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    }
};
module.exports = exports['default'];