'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _testcafeLegacyApi = require('testcafe-legacy-api');

var _testRun = require('../test-run');

var _testRun2 = _interopRequireDefault(_testRun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Const
var QUARANTINE_THRESHOLD = 3;

var TestRunController = function (_EventEmitter) {
    (0, _inherits3.default)(TestRunController, _EventEmitter);

    function TestRunController(test, index, proxy, screenshots, warningLog, fixtureHookController, opts) {
        (0, _classCallCheck3.default)(this, TestRunController);

        var _this = (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));

        _this.test = test;
        _this.index = index;
        _this.opts = opts;

        _this.proxy = proxy;
        _this.screenshots = screenshots;
        _this.warningLog = warningLog;
        _this.fixtureHookController = fixtureHookController;

        _this.TestRunCtor = TestRunController._getTestRunCtor(test, opts);

        _this.testRun = null;
        _this.done = false;

        if (_this.opts.quarantineMode) {
            _this.quarantine = {
                attemptNumber: 1,
                passedTimes: 0,
                failedTimes: 0
            };
        } else _this.quarantine = null;
        return _this;
    }

    TestRunController._getTestRunCtor = function _getTestRunCtor(test, opts) {
        if (opts.TestRunCtor) return opts.TestRunCtor;

        return test.isLegacy ? _testcafeLegacyApi.TestRun : _testRun2.default;
    };

    TestRunController.prototype._createTestRun = function _createTestRun(connection) {
        var quarantineAttemptNum = this.quarantine ? this.quarantine.attemptNumber : null;
        var screenshotCapturer = this.screenshots.createCapturerFor(this.test, this.index, quarantineAttemptNum, connection);
        var TestRunCtor = this.TestRunCtor;

        this.testRun = new TestRunCtor(this.test, connection, screenshotCapturer, this.warningLog, this.opts);

        return this.testRun;
    };

    TestRunController.prototype._endQuarantine = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (this.quarantine.attemptNumber > 1) this.testRun.unstable = this.quarantine.passedTimes > 0;

                            _context.next = 3;
                            return this._emitTestRunDone();

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function _endQuarantine() {
            return _ref.apply(this, arguments);
        }

        return _endQuarantine;
    }();

    TestRunController.prototype._shouldKeepInQuarantine = function _shouldKeepInQuarantine() {
        var hasErrors = !!this.testRun.errs.length;

        if (hasErrors) this.quarantine.failedTimes++;else this.quarantine.passedTimes++;

        var isFirstAttempt = this.quarantine.attemptNumber === 1;
        var failedThresholdReached = this.quarantine.failedTimes >= QUARANTINE_THRESHOLD;
        var passedThresholdReached = this.quarantine.passedTimes >= QUARANTINE_THRESHOLD;

        return isFirstAttempt ? hasErrors : !failedThresholdReached && !passedThresholdReached;
    };

    TestRunController.prototype._keepInQuarantine = function _keepInQuarantine() {
        this.quarantine.attemptNumber = this.quarantine.failedTimes + this.quarantine.passedTimes + 1;

        this.emit('test-run-restart');
    };

    TestRunController.prototype._testRunDoneInQuarantineMode = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!this._shouldKeepInQuarantine()) {
                                _context2.next = 4;
                                break;
                            }

                            this._keepInQuarantine();
                            _context2.next = 6;
                            break;

                        case 4:
                            _context2.next = 6;
                            return this._endQuarantine();

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function _testRunDoneInQuarantineMode() {
            return _ref2.apply(this, arguments);
        }

        return _testRunDoneInQuarantineMode;
    }();

    TestRunController.prototype._testRunDone = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            this.proxy.closeSession(this.testRun);

                            if (!this.quarantine) {
                                _context3.next = 6;
                                break;
                            }

                            _context3.next = 4;
                            return this._testRunDoneInQuarantineMode();

                        case 4:
                            _context3.next = 8;
                            break;

                        case 6:
                            _context3.next = 8;
                            return this._emitTestRunDone();

                        case 8:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function _testRunDone() {
            return _ref3.apply(this, arguments);
        }

        return _testRunDone;
    }();

    TestRunController.prototype._emitTestRunDone = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return this.fixtureHookController.runFixtureAfterHookIfNecessary(this.testRun);

                        case 2:

                            this.done = true;

                            this.emit('test-run-done');

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function _emitTestRunDone() {
            return _ref4.apply(this, arguments);
        }

        return _emitTestRunDone;
    }();

    TestRunController.prototype.start = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(connection) {
            var _this2 = this;

            var testRun, hookOk;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            testRun = this._createTestRun(connection);
                            _context5.next = 3;
                            return this.fixtureHookController.runFixtureBeforeHookIfNecessary(testRun);

                        case 3:
                            hookOk = _context5.sent;

                            if (!(this.test.skip || !hookOk)) {
                                _context5.next = 9;
                                break;
                            }

                            this.emit('test-run-start');
                            _context5.next = 8;
                            return this._emitTestRunDone();

                        case 8:
                            return _context5.abrupt('return', null);

                        case 9:

                            testRun.once('start', function () {
                                return _this2.emit('test-run-start');
                            });
                            testRun.once('done', function () {
                                return _this2._testRunDone();
                            });

                            testRun.start();

                            return _context5.abrupt('return', this.proxy.openSession(testRun.test.pageUrl, testRun, this.opts.externalProxyHost));

                        case 13:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function start(_x) {
            return _ref5.apply(this, arguments);
        }

        return start;
    }();

    (0, _createClass3.default)(TestRunController, [{
        key: 'blocked',
        get: function get() {
            return this.fixtureHookController.isTestBlocked(this.test);
        }
    }]);
    return TestRunController;
}(_events2.default);

exports.default = TestRunController;
module.exports = exports['default'];