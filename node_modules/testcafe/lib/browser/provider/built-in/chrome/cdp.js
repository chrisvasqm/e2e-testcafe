'use strict';

exports.__esModule = true;
exports.resizeWindow = exports.takeScreenshot = exports.closeTab = exports.createClient = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getActiveTab = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cdpPort, browserId) {
        var tabs, tab;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _chromeRemoteInterface2.default.listTabs({ port: cdpPort });

                    case 2:
                        tabs = _context.sent;
                        tab = tabs.filter(function (t) {
                            return t.type === 'page' && t.url.indexOf(browserId) > -1;
                        })[0];
                        return _context.abrupt('return', tab);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getActiveTab(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var setEmulationBounds = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
        var client = _ref3.client,
            config = _ref3.config,
            viewportSize = _ref3.viewportSize,
            defaultScale = _ref3.defaultScale;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return client.Emulation.setDeviceMetricsOverride({
                            width: viewportSize.width,
                            height: viewportSize.height,
                            deviceScaleFactor: config.scaleFactor || defaultScale,
                            mobile: config.mobile,
                            fitWindow: false
                        });

                    case 2:
                        _context2.next = 4;
                        return client.Emulation.setVisibleSize({ width: viewportSize.width, height: viewportSize.height });

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function setEmulationBounds(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

var setEmulation = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(runtimeInfo) {
        var client, config;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        client = runtimeInfo.client, config = runtimeInfo.config;

                        if (!(config.userAgent !== void 0)) {
                            _context3.next = 4;
                            break;
                        }

                        _context3.next = 4;
                        return client.Network.setUserAgentOverride({ userAgent: config.userAgent });

                    case 4:
                        if (!(config.touch !== void 0)) {
                            _context3.next = 7;
                            break;
                        }

                        _context3.next = 7;
                        return client.Emulation.setTouchEmulationEnabled({
                            enabled: config.touch,
                            configuration: config.mobile ? 'mobile' : 'desktop'
                        });

                    case 7:
                        _context3.next = 9;
                        return resizeWindow({ width: config.width, height: config.height }, runtimeInfo);

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function setEmulation(_x4) {
        return _ref4.apply(this, arguments);
    };
}();

var createClient = exports.createClient = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(runtimeInfo) {
        var browserId, config, cdpPort, tab, client, devicePixelRatioQueryResult;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        browserId = runtimeInfo.browserId, config = runtimeInfo.config, cdpPort = runtimeInfo.cdpPort;
                        _context4.next = 3;
                        return getActiveTab(cdpPort, browserId);

                    case 3:
                        tab = _context4.sent;

                        if (tab) {
                            _context4.next = 6;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 6:
                        _context4.prev = 6;
                        _context4.next = 9;
                        return (0, _chromeRemoteInterface2.default)({ target: tab, port: cdpPort });

                    case 9:
                        client = _context4.sent;
                        _context4.next = 15;
                        break;

                    case 12:
                        _context4.prev = 12;
                        _context4.t0 = _context4['catch'](6);
                        return _context4.abrupt('return');

                    case 15:

                        runtimeInfo.tab = tab;
                        runtimeInfo.client = client;

                        _context4.next = 19;
                        return client.Page.enable();

                    case 19:
                        _context4.next = 21;
                        return client.Network.enable();

                    case 21:
                        _context4.next = 23;
                        return client.Runtime.enable();

                    case 23:
                        _context4.next = 25;
                        return client.Runtime.evaluate({ expression: 'window.devicePixelRatio' });

                    case 25:
                        devicePixelRatioQueryResult = _context4.sent;


                        runtimeInfo.defaultScale = devicePixelRatioQueryResult.result.value;

                        if (!config.emulation) {
                            _context4.next = 30;
                            break;
                        }

                        _context4.next = 30;
                        return setEmulation(runtimeInfo);

                    case 30:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[6, 12]]);
    }));

    return function createClient(_x5) {
        return _ref5.apply(this, arguments);
    };
}();

var closeTab = exports.closeTab = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref8) {
        var tab = _ref8.tab,
            cdpPort = _ref8.cdpPort;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _chromeRemoteInterface2.default.closeTab({ id: tab.id, port: cdpPort });

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function closeTab(_x6) {
        return _ref7.apply(this, arguments);
    };
}();

var takeScreenshot = exports.takeScreenshot = function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(path, _ref10) {
        var client = _ref10.client,
            config = _ref10.config;
        var screenshot;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return client.Page.captureScreenshot({ fromSurface: config.headless });

                    case 2:
                        screenshot = _context6.sent;
                        _context6.next = 5;
                        return (0, _promisifiedFunctions.writeFile)(path, screenshot.data, { encoding: 'base64' });

                    case 5:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function takeScreenshot(_x7, _x8) {
        return _ref9.apply(this, arguments);
    };
}();

var resizeWindow = exports.resizeWindow = function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(newDimensions, runtimeInfo) {
        var browserId, config, viewportSize, currentWidth, currentHeight, newWidth, newHeight;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        browserId = runtimeInfo.browserId, config = runtimeInfo.config, viewportSize = runtimeInfo.viewportSize;
                        currentWidth = viewportSize.width;
                        currentHeight = viewportSize.height;
                        newWidth = newDimensions.width || currentWidth;
                        newHeight = newDimensions.height || currentHeight;

                        if (config.headless) {
                            _context7.next = 8;
                            break;
                        }

                        _context7.next = 8;
                        return _testcafeBrowserTools2.default.resize(browserId, currentWidth, currentHeight, newWidth, newHeight);

                    case 8:

                        viewportSize.width = newWidth;
                        viewportSize.height = newHeight;

                        if (!config.emulation) {
                            _context7.next = 13;
                            break;
                        }

                        _context7.next = 13;
                        return setEmulationBounds(runtimeInfo);

                    case 13:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function resizeWindow(_x9, _x10) {
        return _ref11.apply(this, arguments);
    };
}();

exports.isHeadlessTab = isHeadlessTab;

var _chromeRemoteInterface = require('chrome-remote-interface');

var _chromeRemoteInterface2 = _interopRequireDefault(_chromeRemoteInterface);

var _testcafeBrowserTools = require('testcafe-browser-tools');

var _testcafeBrowserTools2 = _interopRequireDefault(_testcafeBrowserTools);

var _promisifiedFunctions = require('../../../../utils/promisified-functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isHeadlessTab(_ref6) {
    var tab = _ref6.tab,
        config = _ref6.config;

    return tab && config.headless;
}