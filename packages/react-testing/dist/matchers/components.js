"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jest_matcher_utils_1 = require("jest-matcher-utils");
var utilities_1 = require("./utilities");
function toContainReactComponent(node, type, props) {
    var _this = this;
    utilities_1.assertIsNode(node, {
        expectation: 'toContainReactComponent',
        isNot: this.isNot,
    });
    var foundByType = node.findAll(type);
    var foundByProps = props == null
        ? foundByType
        : foundByType.filter(function (element) {
            return Object.keys(props).every(function (key) {
                return _this.equals(props[key], element.props[key]);
            });
        });
    var pass = foundByProps.length > 0;
    var message = pass
        ? function () {
            return jest_matcher_utils_1.matcherHint('.not.toContainReactComponent') + "\n\n" +
                ("Expected the React element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("Not to contain component:\n  " + jest_matcher_utils_1.EXPECTED_COLOR(printType(type)) + "\n" + (props ? "With props matching:\n  " + jest_matcher_utils_1.printExpected(props) + "\n" : '')) +
                ("But " + foundByProps.length + " matching " + printType(type) + " " + (foundByProps.length === 1 ? 'elements were' : 'element was') + " found.\n");
        }
        : function () {
            return "" + (jest_matcher_utils_1.matcherHint('.toContainReactComponent') + "\n\n" +
                ("Expected the React element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("To contain component:\n  " + jest_matcher_utils_1.EXPECTED_COLOR(printType(type)) + "\n" + (props ? "With props matching:\n  " + jest_matcher_utils_1.printExpected(props) + "\n" : ''))) + (foundByType.length === 0
                ? "But no matching " + printType(type) + " elements were found.\n"
                : "But the " + (foundByType.length === 1
                    ? 'found element has'
                    : 'found elements have') + " the following prop differences:\n\n" + diffs(foundByType, props, _this.expand));
        };
    return { pass: pass, message: message };
}
exports.toContainReactComponent = toContainReactComponent;
function diffs(element, props, expand) {
    return element.reduce(function (diffs, element, index) {
        return "" + diffs + (index === 0 ? '' : '\n\n') + normalizedDiff(element, props, {
            expand: expand,
            showLegend: index === 0,
        });
    }, '');
}
function normalizedDiff(element, props, _a) {
    var _b = _a.expand, expand = _b === void 0 ? false : _b, _c = _a.showLegend, showLegend = _c === void 0 ? false : _c;
    var result = utilities_1.diffPropsForNode(element, props, {
        expand: expand,
    }) || '';
    return showLegend ? result : result.split('\n\n')[1];
}
function printType(type) {
    return "<" + (typeof type === 'string' ? type : type.displayName || type.name) + " />";
}
