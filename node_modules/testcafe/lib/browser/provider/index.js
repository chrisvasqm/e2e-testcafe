'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _pinkie = require('pinkie');

var _pinkie2 = _interopRequireDefault(_pinkie);

var _testcafeBrowserTools = require('testcafe-browser-tools');

var _testcafeBrowserTools2 = _interopRequireDefault(_testcafeBrowserTools);

var _osFamily = require('os-family');

var _osFamily2 = _interopRequireDefault(_osFamily);

var _delay = require('../../utils/delay');

var _delay2 = _interopRequireDefault(_delay);

var _clientFunctions = require('./utils/client-functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BROWSER_OPENING_DELAY = 2000;

var RESIZE_DIFF_SIZE = {
    width: 100,
    height: 100
};

function sumSizes(sizeA, sizeB) {
    return {
        width: sizeA.width + sizeB.width,
        height: sizeA.height + sizeB.height
    };
}

function subtractSizes(sizeA, sizeB) {
    return {
        width: sizeA.width - sizeB.width,
        height: sizeA.height - sizeB.height
    };
}

var BrowserProvider = function () {
    function BrowserProvider(plugin) {
        (0, _classCallCheck3.default)(this, BrowserProvider);

        this.plugin = plugin;
        this.initPromise = _pinkie2.default.resolve(false);

        this.isMultiBrowser = this.plugin.isMultiBrowser;
        // HACK: The browser window has different border sizes in normal and maximized modes. So, we need to be sure that the window is
        // not maximized before resizing it in order to keep the mechanism of correcting the client area size working. When browser is started,
        // we are resizing it for the first time to switch the window to normal mode, and for the second time - to restore the client area size.
        this.resizeCorrections = {};
        this.maxScreenSizes = {};
        this.windowDescriptors = {};
    }

    BrowserProvider.prototype._calculateResizeCorrections = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(browserId) {
            var title, currentSize, etalonSize, resizedSize, correctionSize;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.plugin.runInitScript(browserId, _clientFunctions.GET_TITLE_SCRIPT);

                        case 2:
                            title = _context.sent;
                            _context.next = 5;
                            return _testcafeBrowserTools2.default.isMaximized(title);

                        case 5:
                            if (_context.sent) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt('return');

                        case 7:
                            _context.next = 9;
                            return this.plugin.runInitScript(browserId, _clientFunctions.GET_WINDOW_DIMENSIONS_INFO_SCRIPT);

                        case 9:
                            currentSize = _context.sent;
                            etalonSize = subtractSizes(currentSize, RESIZE_DIFF_SIZE);
                            _context.next = 13;
                            return _testcafeBrowserTools2.default.resize(title, currentSize.width, currentSize.height, etalonSize.width, etalonSize.height);

                        case 13:
                            _context.next = 15;
                            return this.plugin.runInitScript(browserId, _clientFunctions.GET_WINDOW_DIMENSIONS_INFO_SCRIPT);

                        case 15:
                            resizedSize = _context.sent;
                            correctionSize = subtractSizes(resizedSize, etalonSize);
                            _context.next = 19;
                            return _testcafeBrowserTools2.default.resize(title, resizedSize.width, resizedSize.height, etalonSize.width, etalonSize.height);

                        case 19:
                            _context.next = 21;
                            return this.plugin.runInitScript(browserId, _clientFunctions.GET_WINDOW_DIMENSIONS_INFO_SCRIPT);

                        case 21:
                            resizedSize = _context.sent;


                            correctionSize = sumSizes(correctionSize, subtractSizes(resizedSize, etalonSize));

                            this.resizeCorrections[browserId] = correctionSize;

                            _context.next = 26;
                            return _testcafeBrowserTools2.default.maximize(title);

                        case 26:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function _calculateResizeCorrections(_x) {
            return _ref.apply(this, arguments);
        }

        return _calculateResizeCorrections;
    }();

    BrowserProvider.prototype._calculateMacSizeLimits = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(browserId) {
            var sizeInfo;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.plugin.runInitScript(browserId, _clientFunctions.GET_WINDOW_DIMENSIONS_INFO_SCRIPT);

                        case 2:
                            sizeInfo = _context2.sent;


                            this.maxScreenSizes[browserId] = {
                                width: sizeInfo.availableWidth - (sizeInfo.outerWidth - sizeInfo.width),
                                height: sizeInfo.availableHeight - (sizeInfo.outerHeight - sizeInfo.height)
                            };

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function _calculateMacSizeLimits(_x2) {
            return _ref2.apply(this, arguments);
        }

        return _calculateMacSizeLimits;
    }();

    BrowserProvider.prototype._onOpenBrowser = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(browserId) {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.plugin.waitForConnectionReady(browserId);

                        case 2:
                            _context3.next = 4;
                            return (0, _delay2.default)(BROWSER_OPENING_DELAY);

                        case 4:
                            _context3.next = 6;
                            return _testcafeBrowserTools2.default.findWindow(browserId);

                        case 6:
                            this.windowDescriptors[browserId] = _context3.sent;

                            if (!_osFamily2.default.win) {
                                _context3.next = 12;
                                break;
                            }

                            _context3.next = 10;
                            return this._calculateResizeCorrections(browserId);

                        case 10:
                            _context3.next = 15;
                            break;

                        case 12:
                            if (!_osFamily2.default.mac) {
                                _context3.next = 15;
                                break;
                            }

                            _context3.next = 15;
                            return this._calculateMacSizeLimits(browserId);

                        case 15:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function _onOpenBrowser(_x3) {
            return _ref3.apply(this, arguments);
        }

        return _onOpenBrowser;
    }();

    BrowserProvider.prototype._closeLocalBrowser = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(browserId) {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _testcafeBrowserTools2.default.close(this.windowDescriptors[browserId]);

                        case 2:

                            delete this.windowDescriptors[browserId];

                        case 3:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function _closeLocalBrowser(_x4) {
            return _ref4.apply(this, arguments);
        }

        return _closeLocalBrowser;
    }();

    BrowserProvider.prototype._resizeLocalBrowserWindow = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(browserId, width, height, currentWidth, currentHeight) {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            if (this.resizeCorrections[browserId]) {
                                width -= this.resizeCorrections[browserId].width;
                                height -= this.resizeCorrections[browserId].height;

                                delete this.resizeCorrections[browserId];
                            }

                            _context5.next = 3;
                            return _testcafeBrowserTools2.default.resize(this.windowDescriptors[browserId], currentWidth, currentHeight, width, height);

                        case 3:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function _resizeLocalBrowserWindow(_x5, _x6, _x7, _x8, _x9) {
            return _ref5.apply(this, arguments);
        }

        return _resizeLocalBrowserWindow;
    }();

    BrowserProvider.prototype._takeLocalBrowserScreenshot = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(browserId, screenshotPath) {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _testcafeBrowserTools2.default.screenshot(this.windowDescriptors[browserId], screenshotPath);

                        case 2:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function _takeLocalBrowserScreenshot(_x10, _x11) {
            return _ref6.apply(this, arguments);
        }

        return _takeLocalBrowserScreenshot;
    }();

    BrowserProvider.prototype._canResizeLocalBrowserWindowToDimensions = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(browserId, width, height) {
            var maxScreenSize;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            if (_osFamily2.default.mac) {
                                _context7.next = 2;
                                break;
                            }

                            return _context7.abrupt('return', true);

                        case 2:
                            maxScreenSize = this.maxScreenSizes[browserId];
                            return _context7.abrupt('return', width <= maxScreenSize.width && height <= maxScreenSize.height);

                        case 4:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function _canResizeLocalBrowserWindowToDimensions(_x12, _x13, _x14) {
            return _ref7.apply(this, arguments);
        }

        return _canResizeLocalBrowserWindowToDimensions;
    }();

    BrowserProvider.prototype._maximizeLocalBrowserWindow = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(browserId) {
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return _testcafeBrowserTools2.default.maximize(this.windowDescriptors[browserId]);

                        case 2:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        function _maximizeLocalBrowserWindow(_x15) {
            return _ref8.apply(this, arguments);
        }

        return _maximizeLocalBrowserWindow;
    }();

    BrowserProvider.prototype.init = function () {
        var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
            var initialized;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return this.initPromise;

                        case 2:
                            initialized = _context9.sent;

                            if (!initialized) {
                                _context9.next = 5;
                                break;
                            }

                            return _context9.abrupt('return');

                        case 5:

                            this.initPromise = this.plugin.init().then(function () {
                                return true;
                            });

                            _context9.prev = 6;
                            _context9.next = 9;
                            return this.initPromise;

                        case 9:
                            _context9.next = 15;
                            break;

                        case 11:
                            _context9.prev = 11;
                            _context9.t0 = _context9['catch'](6);

                            this.initPromise = _pinkie2.default.resolve(false);

                            throw _context9.t0;

                        case 15:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this, [[6, 11]]);
        }));

        function init() {
            return _ref9.apply(this, arguments);
        }

        return init;
    }();

    BrowserProvider.prototype.dispose = function () {
        var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
            var initialized;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return this.initPromise;

                        case 2:
                            initialized = _context10.sent;

                            if (initialized) {
                                _context10.next = 5;
                                break;
                            }

                            return _context10.abrupt('return');

                        case 5:

                            this.initPromise = this.plugin.dispose().then(function () {
                                return false;
                            });

                            _context10.prev = 6;
                            _context10.next = 9;
                            return this.initPromise;

                        case 9:
                            _context10.next = 15;
                            break;

                        case 11:
                            _context10.prev = 11;
                            _context10.t0 = _context10['catch'](6);

                            this.initPromise = _pinkie2.default.resolve(false);

                            throw _context10.t0;

                        case 15:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this, [[6, 11]]);
        }));

        function dispose() {
            return _ref10.apply(this, arguments);
        }

        return dispose;
    }();

    BrowserProvider.prototype.isLocalBrowser = function () {
        var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(browserId, browserName) {
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.next = 2;
                            return this.plugin.isLocalBrowser(browserId, browserName);

                        case 2:
                            return _context11.abrupt('return', _context11.sent);

                        case 3:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, this);
        }));

        function isLocalBrowser(_x16, _x17) {
            return _ref11.apply(this, arguments);
        }

        return isLocalBrowser;
    }();

    BrowserProvider.prototype.openBrowser = function () {
        var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(browserId, pageUrl, browserName) {
            var isLocalBrowser;
            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            _context12.next = 2;
                            return this.plugin.openBrowser(browserId, pageUrl, browserName);

                        case 2:
                            _context12.next = 4;
                            return this.plugin.isLocalBrowser(browserId);

                        case 4:
                            isLocalBrowser = _context12.sent;

                            if (!isLocalBrowser) {
                                _context12.next = 8;
                                break;
                            }

                            _context12.next = 8;
                            return this._onOpenBrowser(browserId);

                        case 8:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, this);
        }));

        function openBrowser(_x18, _x19, _x20) {
            return _ref12.apply(this, arguments);
        }

        return openBrowser;
    }();

    BrowserProvider.prototype.closeBrowser = function () {
        var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(browserId) {
            var isLocalBrowser, customActionsInfo, hasCustomCloseBrowser, usePluginsCloseBrowser;
            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            _context13.next = 2;
                            return this.plugin.isLocalBrowser(browserId);

                        case 2:
                            isLocalBrowser = _context13.sent;
                            _context13.next = 5;
                            return this.plugin.hasCustomActionForBrowser(browserId);

                        case 5:
                            customActionsInfo = _context13.sent;
                            hasCustomCloseBrowser = customActionsInfo.hasCloseBrowser;
                            usePluginsCloseBrowser = hasCustomCloseBrowser || !isLocalBrowser;

                            if (!usePluginsCloseBrowser) {
                                _context13.next = 12;
                                break;
                            }

                            _context13.next = 11;
                            return this.plugin.closeBrowser(browserId);

                        case 11:
                            return _context13.abrupt('return');

                        case 12:
                            _context13.next = 14;
                            return this._closeLocalBrowser(browserId);

                        case 14:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, this);
        }));

        function closeBrowser(_x21) {
            return _ref13.apply(this, arguments);
        }

        return closeBrowser;
    }();

    BrowserProvider.prototype.getBrowserList = function () {
        var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            _context14.next = 2;
                            return this.plugin.getBrowserList();

                        case 2:
                            return _context14.abrupt('return', _context14.sent);

                        case 3:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, this);
        }));

        function getBrowserList() {
            return _ref14.apply(this, arguments);
        }

        return getBrowserList;
    }();

    BrowserProvider.prototype.isValidBrowserName = function () {
        var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(browserName) {
            return _regenerator2.default.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            _context15.next = 2;
                            return this.plugin.isValidBrowserName(browserName);

                        case 2:
                            return _context15.abrupt('return', _context15.sent);

                        case 3:
                        case 'end':
                            return _context15.stop();
                    }
                }
            }, _callee15, this);
        }));

        function isValidBrowserName(_x22) {
            return _ref15.apply(this, arguments);
        }

        return isValidBrowserName;
    }();

    BrowserProvider.prototype.resizeWindow = function () {
        var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(browserId, width, height, currentWidth, currentHeight) {
            var isLocalBrowser, customActionsInfo, hasCustomResizeWindow;
            return _regenerator2.default.wrap(function _callee16$(_context16) {
                while (1) {
                    switch (_context16.prev = _context16.next) {
                        case 0:
                            _context16.next = 2;
                            return this.plugin.isLocalBrowser(browserId);

                        case 2:
                            isLocalBrowser = _context16.sent;
                            _context16.next = 5;
                            return this.plugin.hasCustomActionForBrowser(browserId);

                        case 5:
                            customActionsInfo = _context16.sent;
                            hasCustomResizeWindow = customActionsInfo.hasResizeWindow;

                            if (!(isLocalBrowser && !hasCustomResizeWindow)) {
                                _context16.next = 11;
                                break;
                            }

                            _context16.next = 10;
                            return this._resizeLocalBrowserWindow(browserId, width, height, currentWidth, currentHeight);

                        case 10:
                            return _context16.abrupt('return');

                        case 11:
                            _context16.next = 13;
                            return this.plugin.resizeWindow(browserId, width, height, currentWidth, currentHeight);

                        case 13:
                        case 'end':
                            return _context16.stop();
                    }
                }
            }, _callee16, this);
        }));

        function resizeWindow(_x23, _x24, _x25, _x26, _x27) {
            return _ref16.apply(this, arguments);
        }

        return resizeWindow;
    }();

    BrowserProvider.prototype.canResizeWindowToDimensions = function () {
        var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(browserId, width, height) {
            var isLocalBrowser, customActionsInfo, hasCustomCanResizeToDimensions;
            return _regenerator2.default.wrap(function _callee17$(_context17) {
                while (1) {
                    switch (_context17.prev = _context17.next) {
                        case 0:
                            _context17.next = 2;
                            return this.plugin.isLocalBrowser(browserId);

                        case 2:
                            isLocalBrowser = _context17.sent;
                            _context17.next = 5;
                            return this.plugin.hasCustomActionForBrowser(browserId);

                        case 5:
                            customActionsInfo = _context17.sent;
                            hasCustomCanResizeToDimensions = customActionsInfo.hasCanResizeWindowToDimensions;

                            if (!(isLocalBrowser && !hasCustomCanResizeToDimensions)) {
                                _context17.next = 11;
                                break;
                            }

                            _context17.next = 10;
                            return this._canResizeLocalBrowserWindowToDimensions(browserId, width, height);

                        case 10:
                            return _context17.abrupt('return', _context17.sent);

                        case 11:
                            _context17.next = 13;
                            return this.plugin.canResizeWindowToDimensions(browserId, width, height);

                        case 13:
                            return _context17.abrupt('return', _context17.sent);

                        case 14:
                        case 'end':
                            return _context17.stop();
                    }
                }
            }, _callee17, this);
        }));

        function canResizeWindowToDimensions(_x28, _x29, _x30) {
            return _ref17.apply(this, arguments);
        }

        return canResizeWindowToDimensions;
    }();

    BrowserProvider.prototype.maximizeWindow = function () {
        var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(browserId) {
            var isLocalBrowser, customActionsInfo, hasCustomMaximizeWindow;
            return _regenerator2.default.wrap(function _callee18$(_context18) {
                while (1) {
                    switch (_context18.prev = _context18.next) {
                        case 0:
                            _context18.next = 2;
                            return this.plugin.isLocalBrowser(browserId);

                        case 2:
                            isLocalBrowser = _context18.sent;
                            _context18.next = 5;
                            return this.plugin.hasCustomActionForBrowser(browserId);

                        case 5:
                            customActionsInfo = _context18.sent;
                            hasCustomMaximizeWindow = customActionsInfo.hasMaximizeWindow;

                            if (!(isLocalBrowser && !hasCustomMaximizeWindow)) {
                                _context18.next = 11;
                                break;
                            }

                            _context18.next = 10;
                            return this._maximizeLocalBrowserWindow(browserId);

                        case 10:
                            return _context18.abrupt('return', _context18.sent);

                        case 11:
                            _context18.next = 13;
                            return this.plugin.maximizeWindow(browserId);

                        case 13:
                            return _context18.abrupt('return', _context18.sent);

                        case 14:
                        case 'end':
                            return _context18.stop();
                    }
                }
            }, _callee18, this);
        }));

        function maximizeWindow(_x31) {
            return _ref18.apply(this, arguments);
        }

        return maximizeWindow;
    }();

    BrowserProvider.prototype.takeScreenshot = function () {
        var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(browserId, screenshotPath, pageWidth, pageHeight) {
            var isLocalBrowser, customActionsInfo, hasCustomTakeScreenshot;
            return _regenerator2.default.wrap(function _callee19$(_context19) {
                while (1) {
                    switch (_context19.prev = _context19.next) {
                        case 0:
                            _context19.next = 2;
                            return this.plugin.isLocalBrowser(browserId);

                        case 2:
                            isLocalBrowser = _context19.sent;
                            _context19.next = 5;
                            return this.plugin.hasCustomActionForBrowser(browserId);

                        case 5:
                            customActionsInfo = _context19.sent;
                            hasCustomTakeScreenshot = customActionsInfo.hasTakeScreenshot;

                            if (!(isLocalBrowser && !hasCustomTakeScreenshot)) {
                                _context19.next = 11;
                                break;
                            }

                            _context19.next = 10;
                            return this._takeLocalBrowserScreenshot(browserId, screenshotPath, pageWidth, pageHeight);

                        case 10:
                            return _context19.abrupt('return');

                        case 11:
                            _context19.next = 13;
                            return this.plugin.takeScreenshot(browserId, screenshotPath, pageWidth, pageHeight);

                        case 13:
                        case 'end':
                            return _context19.stop();
                    }
                }
            }, _callee19, this);
        }));

        function takeScreenshot(_x32, _x33, _x34, _x35) {
            return _ref19.apply(this, arguments);
        }

        return takeScreenshot;
    }();

    BrowserProvider.prototype.reportJobResult = function () {
        var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(browserId, status, data) {
            return _regenerator2.default.wrap(function _callee20$(_context20) {
                while (1) {
                    switch (_context20.prev = _context20.next) {
                        case 0:
                            _context20.next = 2;
                            return this.plugin.reportJobResult(browserId, status, data);

                        case 2:
                        case 'end':
                            return _context20.stop();
                    }
                }
            }, _callee20, this);
        }));

        function reportJobResult(_x36, _x37, _x38) {
            return _ref20.apply(this, arguments);
        }

        return reportJobResult;
    }();

    return BrowserProvider;
}();

exports.default = BrowserProvider;
module.exports = exports['default'];