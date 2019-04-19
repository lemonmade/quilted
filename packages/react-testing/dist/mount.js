"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var root_1 = require("./root");
exports.Root = root_1.Root;
var element_1 = require("./element");
exports.Element = element_1.Element;
function mount(element) {
    return new root_1.Root(element);
}
exports.mount = mount;
var CustomRoot = /** @class */ (function (_super) {
    tslib_1.__extends(CustomRoot, _super);
    function CustomRoot(tree, context, resolve) {
        var _this = _super.call(this, tree, resolve) || this;
        _this.context = context;
        return _this;
    }
    return CustomRoot;
}(root_1.Root));
exports.CustomRoot = CustomRoot;
function createMount(_a) {
    var render = _a.render, _b = _a.context, createContext = _b === void 0 ? defaultContext : _b, _c = _a.afterMount, afterMount = _c === void 0 ? defaultAfterMount : _c;
    function mount(element, options) {
        if (options === void 0) { options = {}; }
        var context = createContext(options);
        var rendered = render(element, context, options);
        var wrapper = new CustomRoot(rendered, context, function (root) {
            return root.find(element.type);
        });
        var afterMountResult = afterMount(wrapper, options);
        return afterMountResult != null && 'then' in afterMountResult
            ? afterMountResult.then(function () { return wrapper; })
            : wrapper;
    }
    return mount;
}
exports.createMount = createMount;
function defaultContext() {
    return {};
}
function defaultAfterMount() { }
