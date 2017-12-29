'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _handledSignalsCount;

var runTests = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(argParser) {
        var opts, port1, port2, externalProxyHost, testCafe, concurrency, remoteBrowsers, browsers, runner, failed, reporters;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        opts = argParser.opts;
                        port1 = opts.ports && opts.ports[0];
                        port2 = opts.ports && opts.ports[1];
                        externalProxyHost = opts.proxy;


                        _log2.default.showSpinner();

                        _context.next = 7;
                        return (0, _2.default)(opts.hostname, port1, port2);

                    case 7:
                        testCafe = _context.sent;
                        concurrency = argParser.concurrency || 1;
                        _context.next = 11;
                        return (0, _remotesWizard2.default)(testCafe, argParser.remoteCount, opts.qrCode);

                    case 11:
                        remoteBrowsers = _context.sent;
                        browsers = argParser.browsers.concat(remoteBrowsers);
                        runner = testCafe.createRunner();
                        failed = 0;
                        reporters = argParser.opts.reporters.map(function (r) {
                            return {
                                name: r.name,
                                outStream: r.outFile ? _fs2.default.createWriteStream(r.outFile) : void 0
                            };
                        });


                        reporters.forEach(function (r) {
                            return runner.reporter(r.name, r.outStream);
                        });

                        runner.useProxy(externalProxyHost).src(argParser.src).browsers(browsers).concurrency(concurrency).filter(argParser.filter).screenshots(opts.screenshots, opts.screenshotsOnFails).startApp(opts.app, opts.appInitDelay);

                        runner.once('done-bootstrapping', function () {
                            return _log2.default.hideSpinner();
                        });

                        _context.prev = 19;
                        _context.next = 22;
                        return runner.run(opts);

                    case 22:
                        failed = _context.sent;

                    case 23:
                        _context.prev = 23;

                        showMessageOnExit = false;
                        _context.next = 27;
                        return testCafe.close();

                    case 27:
                        return _context.finish(23);

                    case 28:

                        exit(failed);

                    case 29:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[19,, 23, 28]]);
    }));

    return function runTests(_x) {
        return _ref.apply(this, arguments);
    };
}();

var listBrowsers = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var providerName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'locally-installed';
        var provider, browserNames;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _pool2.default.getProvider(providerName);

                    case 2:
                        provider = _context2.sent;

                        if (provider) {
                            _context2.next = 5;
                            break;
                        }

                        throw new _runtime.GeneralError(_message2.default.browserProviderNotFound, providerName);

                    case 5:
                        if (!provider.isMultiBrowser) {
                            _context2.next = 14;
                            break;
                        }

                        _context2.next = 8;
                        return provider.getBrowserList();

                    case 8:
                        browserNames = _context2.sent;
                        _context2.next = 11;
                        return _pool2.default.dispose();

                    case 11:

                        if (providerName === 'locally-installed') console.log(browserNames.join('\n'));else console.log(browserNames.map(function (browserName) {
                            return '"' + providerName + ':' + browserName + '"';
                        }).join('\n'));
                        _context2.next = 15;
                        break;

                    case 14:
                        console.log('"' + providerName + '"');

                    case 15:
                        exit(0);

                    case 16:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function listBrowsers() {
        return _ref2.apply(this, arguments);
    };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _resolveCwd = require('resolve-cwd');

var _resolveCwd2 = _interopRequireDefault(_resolveCwd);

var _pool = require('../browser/provider/pool');

var _pool2 = _interopRequireDefault(_pool);

var _runtime = require('../errors/runtime');

var _message = require('../errors/runtime/message');

var _message2 = _interopRequireDefault(_message);

var _argumentParser = require('./argument-parser');

var _argumentParser2 = _interopRequireDefault(_argumentParser);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _remotesWizard = require('./remotes-wizard');

var _remotesWizard2 = _interopRequireDefault(_remotesWizard);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TERMINATION_TYPES = {
    sigint: 'sigint',
    sigbreak: 'sigbreak',
    shutdown: 'shutdown'
};

var showMessageOnExit = true;
var exitMessageShown = false;
var exiting = false;

var handledSignalsCount = (_handledSignalsCount = {}, _handledSignalsCount[TERMINATION_TYPES.sigint] = 0, _handledSignalsCount[TERMINATION_TYPES.sigbreak] = 0, _handledSignalsCount[TERMINATION_TYPES.shutdown] = 0, _handledSignalsCount);

function exitHandler(terminationType) {
    handledSignalsCount[terminationType]++;

    if (showMessageOnExit && !exitMessageShown) {
        exitMessageShown = true;

        _log2.default.hideSpinner();
        _log2.default.write('Stopping TestCafe...');
        _log2.default.showSpinner();

        process.on('exit', function () {
            return _log2.default.hideSpinner(true);
        });
    }

    if (exiting || handledSignalsCount[terminationType] < 2) return;

    exiting = true;

    exit(0);
}

function setupExitHandler() {
    process.on('SIGINT', function () {
        return exitHandler(TERMINATION_TYPES.sigint);
    });
    process.on('SIGBREAK', function () {
        return exitHandler(TERMINATION_TYPES.sigbreak);
    });

    process.on('message', function (message) {
        return message === 'shutdown' && exitHandler(TERMINATION_TYPES.shutdown);
    });
}

function exit(code) {
    _log2.default.hideSpinner(true);

    // NOTE: give a process time to flush the output.
    // It's necessary in some environments.
    setTimeout(function () {
        return process.exit(code);
    }, 0);
}

function error(err) {
    _log2.default.hideSpinner();

    var message = null;

    // HACK: workaround for the `instanceof` problem
    // (see: http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node)
    if (err.constructor === _runtime.GeneralError) message = err.message;else if (err.constructor === _runtime.APIError) message = err.coloredStack;else message = err.stack;

    _log2.default.write(_chalk2.default.red('ERROR ') + message + '\n');
    _log2.default.write(_chalk2.default.gray('Type "testcafe -h" for help.'));

    exit(1);
}

function useLocalInstallation() {
    var local = (0, _resolveCwd2.default)('testcafe/lib/cli');

    if (local && local !== __filename) {
        _log2.default.write('Using locally installed version of TestCafe.');
        require(local);
        return true;
    }

    return false;
}

(function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var argParser;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!useLocalInstallation()) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 2:

                        setupExitHandler(exitHandler);

                        _context3.prev = 3;
                        argParser = new _argumentParser2.default();
                        _context3.next = 7;
                        return argParser.parse(process.argv);

                    case 7:
                        if (!argParser.opts.listBrowsers) {
                            _context3.next = 12;
                            break;
                        }

                        _context3.next = 10;
                        return listBrowsers(argParser.opts.providerName);

                    case 10:
                        _context3.next = 14;
                        break;

                    case 12:
                        _context3.next = 14;
                        return runTests(argParser);

                    case 14:
                        _context3.next = 20;
                        break;

                    case 16:
                        _context3.prev = 16;
                        _context3.t0 = _context3['catch'](3);

                        showMessageOnExit = false;
                        error(_context3.t0);

                    case 20:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[3, 16]]);
    }));

    function cli() {
        return _ref3.apply(this, arguments);
    }

    return cli;
})()();