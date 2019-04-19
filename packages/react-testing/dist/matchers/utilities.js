"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jest_matcher_utils_1 = require("jest-matcher-utils");
var types_1 = require("./types");
function assertIsNode(node, _a) {
    var expectation = _a.expectation, isNot = _a.isNot;
    if (node == null) {
        throw new Error(jest_matcher_utils_1.matcherErrorMessage(jest_matcher_utils_1.matcherHint("." + expectation, undefined, undefined, { isNot: isNot }), jest_matcher_utils_1.RECEIVED_COLOR('received') + " value must be an @shopify/react-testing Root or Element object", "Received " + jest_matcher_utils_1.RECEIVED_COLOR('null') + ".\nThis usually means that your `.findX` method failed to find any matching elements."));
    }
    if (Array.isArray(node) &&
        node.length > 1 &&
        (node[0] instanceof types_1.Root || node[0] instanceof types_1.Element)) {
        throw new Error(jest_matcher_utils_1.matcherErrorMessage(jest_matcher_utils_1.matcherHint("." + expectation, undefined, undefined, { isNot: isNot }), jest_matcher_utils_1.RECEIVED_COLOR('received') + " value must be an @shopify/react-testing Root or Element object", "Received an " + jest_matcher_utils_1.RECEIVED_COLOR('array of Root or Element objects') + ".\nThis usually means that you passed in the result of `.findAllX`. Pass the result of `.findX` instead."));
    }
    if (!(node instanceof types_1.Root) && !(node instanceof types_1.Element)) {
        throw new Error(jest_matcher_utils_1.matcherErrorMessage(jest_matcher_utils_1.matcherHint("." + expectation, undefined, undefined, { isNot: isNot }), jest_matcher_utils_1.RECEIVED_COLOR('received') + " value must be an @shopify/react-testing Root or Element object", jest_matcher_utils_1.printWithType('Received', node, jest_matcher_utils_1.printReceived)));
    }
}
exports.assertIsNode = assertIsNode;
function diffPropsForNode(node, props, _a) {
    var _b = _a.expand, expand = _b === void 0 ? false : _b;
    return jest_matcher_utils_1.diff(props, getObjectSubset(node.props, props), {
        expand: expand,
    });
}
exports.diffPropsForNode = diffPropsForNode;
// Original from https://github.com/facebook/jest/blob/master/packages/expect/src/utils.ts#L107
function getObjectSubset(object, subset) {
    if (Array.isArray(object)) {
        if (Array.isArray(subset) && subset.length === object.length) {
            return subset.map(function (sub, i) {
                return getObjectSubset(object[i], sub);
            });
        }
    }
    else if (object instanceof Date) {
        return object;
    }
    else if (typeof object === 'object' &&
        object !== null &&
        typeof subset === 'object' &&
        subset !== null) {
        var trimmed_1 = {};
        Object.keys(subset)
            .filter(function (key) { return Reflect.has(object, key); })
            .forEach(function (key) { return (trimmed_1[key] = getObjectSubset(object[key], subset[key])); });
        if (Object.keys(trimmed_1).length > 0) {
            return trimmed_1;
        }
    }
    return object;
}
