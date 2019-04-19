"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var props_1 = require("./props");
var components_1 = require("./components");
var strings_1 = require("./strings");
expect.extend({
    toHaveReactProps: props_1.toHaveReactProps,
    toContainReactComponent: components_1.toContainReactComponent,
    toContainReactText: strings_1.toContainReactText,
    toContainReactHtml: strings_1.toContainReactHtml,
});
