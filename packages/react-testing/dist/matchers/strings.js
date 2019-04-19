"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jest_matcher_utils_1 = require("jest-matcher-utils");
var utilities_1 = require("./utilities");
function toContainReactText(node, text) {
    utilities_1.assertIsNode(node, {
        expectation: 'toContainReactText',
        isNot: this.isNot,
    });
    var nodeText = node.text();
    var matchIndex = nodeText.indexOf(text);
    var pass = matchIndex >= 0;
    var message = pass
        ? function () {
            return jest_matcher_utils_1.matcherHint('.not.toContainReactText', node.toString()) + "\n\n" +
                ("Expected the React element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("Not to contain text:\n  " + jest_matcher_utils_1.printExpected(text) + "\n") +
                ("But it did:\n  " + printReceivedWithHighlight(nodeText, matchIndex, text.length) + "\n");
        }
        : function () {
            return jest_matcher_utils_1.matcherHint('.not.toContainReactText', node.toString()) + "\n\n" +
                ("Expected the React element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("With text content:\n  " + jest_matcher_utils_1.printReceived(nodeText) + "\n") +
                ("To contain string:\n  " + jest_matcher_utils_1.printExpected(text) + "\n");
        };
    return { pass: pass, message: message };
}
exports.toContainReactText = toContainReactText;
function toContainReactHtml(node, text) {
    utilities_1.assertIsNode(node, {
        expectation: 'toContainReactHtml',
        isNot: this.isNot,
    });
    var nodeHtml = node.html();
    var matchIndex = nodeHtml.indexOf(text);
    var pass = matchIndex >= 0;
    var message = pass
        ? function () {
            return jest_matcher_utils_1.matcherHint('.not.toContainReactHtml', node.toString()) + "\n\n" +
                ("Expected the React element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("Not to contain HTML:\n  " + jest_matcher_utils_1.printExpected(text) + "\n") +
                ("But it did:\n  " + printReceivedWithHighlight(nodeHtml, matchIndex, text.length) + "\n");
        }
        : function () {
            return jest_matcher_utils_1.matcherHint('.not.toContainReactHtml', node.toString()) + "\n\n" +
                ("Expected the React element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("With HTML content:\n  " + jest_matcher_utils_1.printReceived(nodeHtml) + "\n") +
                ("To contain HTML:\n  " + jest_matcher_utils_1.printExpected(text) + "\n");
        };
    return { pass: pass, message: message };
}
exports.toContainReactHtml = toContainReactHtml;
function printReceivedWithHighlight(text, start, length) {
    return jest_matcher_utils_1.RECEIVED_COLOR("\"" + text.slice(0, start) + jest_matcher_utils_1.INVERTED_COLOR(text.slice(start, start + length)) + text.slice(start + length) + "\"");
}
