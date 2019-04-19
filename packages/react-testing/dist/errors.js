"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var IGNORABLE_ERROR_EVENT_MESSAGES = [
    // This is part of the window.onError error object when a React
    // update errors out
    /at renderRoot/,
];
var IGNORABLE_TEST_ERRORS = [
    // This is the log for the actual error that got thrown
    /at mountIndeterminateComponent/,
    // This line follows any error thrown by a component
    /The above error occurred in (the <.*>|one of your React) components?:/,
    // This line comes up whenever an error happens as the result of something
    // that was being done within an `act` callback
    /was not wrapped in act\(\.\.\.\)/,
];
function withIgnoredReactLogs(run) {
    /* eslint-disable no-console */
    var originalConsoleError = console.error;
    var consoleError = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a = tslib_1.__read(args, 1), firstArgument = _a[0];
        if ((typeof firstArgument === 'string' &&
            IGNORABLE_TEST_ERRORS.some(function (regex) { return regex.test(firstArgument); })) ||
            (firstArgument instanceof Error &&
                firstArgument.stack != null &&
                IGNORABLE_TEST_ERRORS.some(function (regex) {
                    return regex.test(firstArgument.stack || '');
                }))) {
            return;
        }
        originalConsoleError.call.apply(originalConsoleError, tslib_1.__spread([console], args));
    };
    function handleErrorEvent(event) {
        var error = event.error;
        // I want to silence all errors and know what I'm doing
        if (error != null &&
            IGNORABLE_ERROR_EVENT_MESSAGES.some(function (ignore) { return typeof error.stack === 'string' && ignore.test(error.stack); })) {
            event.preventDefault();
        }
    }
    window.addEventListener('error', handleErrorEvent);
    console.error = consoleError;
    try {
        return run();
    }
    finally {
        console.error = originalConsoleError;
        window.removeEventListener('error', handleErrorEvent);
    }
    /* eslint-enable no-console */
}
exports.withIgnoredReactLogs = withIgnoredReactLogs;
