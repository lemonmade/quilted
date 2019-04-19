"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var test_utils_1 = require("react-dom/test-utils");
var TestWrapper_1 = require("./TestWrapper");
var element_1 = require("./element");
var types_1 = require("./types");
var errors_1 = require("./errors");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var findCurrentFiberUsingSlowPath = require('react-reconciler/reflection').findCurrentFiberUsingSlowPath;
exports.connected = new Set();
var Root = /** @class */ (function () {
    function Root(tree, resolveRoot) {
        if (resolveRoot === void 0) { resolveRoot = defaultResolveRoot; }
        this.tree = tree;
        this.resolveRoot = resolveRoot;
        this.wrapper = null;
        this.element = document.createElement('div');
        this.root = null;
        this.acting = false;
        this.mount();
    }
    Object.defineProperty(Root.prototype, "props", {
        get: function () {
            return this.withRoot(function (root) { return root.props; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "isDOM", {
        get: function () {
            return this.withRoot(function (root) { return root.isDOM; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "type", {
        get: function () {
            return this.withRoot(function (root) { return root.type; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "instance", {
        get: function () {
            return this.withRoot(function (root) { return root.instance; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "children", {
        get: function () {
            return this.withRoot(function (root) { return root.children; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "descendants", {
        get: function () {
            return this.withRoot(function (root) { return root.descendants; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "domNodes", {
        get: function () {
            return this.withRoot(function (root) { return root.domNodes; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "domNode", {
        get: function () {
            return this.withRoot(function (root) { return root.domNode; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "mounted", {
        get: function () {
            return this.wrapper != null;
        },
        enumerable: true,
        configurable: true
    });
    Root.prototype.act = function (action, _a) {
        var _b = (_a === void 0 ? {} : _a).update, update = _b === void 0 ? true : _b;
        var result;
        if (this.acting) {
            return action();
        }
        this.acting = true;
        errors_1.withIgnoredReactLogs(function () {
            return test_utils_1.act(function () {
                result = action();
            });
        });
        if (update) {
            this.update();
        }
        this.acting = false;
        return result;
    };
    Root.prototype.html = function () {
        return this.withRoot(function (root) { return root.html(); });
    };
    Root.prototype.text = function () {
        return this.withRoot(function (root) { return root.text(); });
    };
    Root.prototype.is = function (type) {
        return this.withRoot(function (root) { return root.is(type); });
    };
    Root.prototype.prop = function (key) {
        return this.withRoot(function (root) { return root.prop(key); });
    };
    Root.prototype.find = function (type, props) {
        return this.withRoot(function (root) { return root.find(type, props); });
    };
    Root.prototype.findAll = function (type, props) {
        return this.withRoot(function (root) { return root.findAll(type, props); });
    };
    Root.prototype.findWhere = function (predicate) {
        return this.withRoot(function (root) { return root.findWhere(predicate); });
    };
    Root.prototype.findAllWhere = function (predicate) {
        return this.withRoot(function (root) { return root.findAllWhere(predicate); });
    };
    Root.prototype.trigger = function (prop) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.withRoot(function (root) { return root.trigger.apply(root, tslib_1.__spread([prop], args)); });
    };
    Root.prototype.triggerKeypath = function (keypath) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.withRoot(function (root) { return root.triggerKeypath.apply(root, tslib_1.__spread([keypath], args)); });
    };
    Root.prototype.mount = function () {
        var _this = this;
        if (this.mounted) {
            throw new Error('Attempted to mount a node that was already mounted');
        }
        if (this.element.parentNode == null) {
            document.body.appendChild(this.element);
            exports.connected.add(this);
        }
        this.act(function () {
            react_dom_1.render(React.createElement(TestWrapper_1.TestWrapper, { ref: function (wrapper) {
                    _this.wrapper = wrapper;
                } }, _this.tree), _this.element);
        });
    };
    Root.prototype.unmount = function () {
        var _this = this;
        if (!this.mounted) {
            throw new Error('You attempted to unmount a node that was already unmounted');
        }
        this.ensureRoot();
        this.act(function () { return react_dom_1.unmountComponentAtNode(_this.element); });
    };
    Root.prototype.destroy = function () {
        var _a = this, element = _a.element, mounted = _a.mounted;
        if (mounted) {
            this.unmount();
        }
        element.remove();
        exports.connected.delete(this);
    };
    Root.prototype.setProps = function (props) {
        var _this = this;
        this.ensureRoot();
        this.act(function () { return _this.wrapper.setProps(props); });
    };
    Root.prototype.forceUpdate = function () {
        var _this = this;
        this.ensureRoot();
        this.act(function () { return _this.wrapper.forceUpdate(); });
    };
    Root.prototype.toString = function () {
        return this.withRoot(function (root) { return root.toString(); });
    };
    Root.prototype.update = function () {
        if (this.wrapper == null) {
            this.root = null;
        }
        else {
            var topElement = flatten(this.wrapper._reactInternalFiber, this)[0];
            this.root = this.resolveRoot(topElement);
        }
    };
    Root.prototype.ensureRoot = function () {
        if (this.wrapper == null || this.root == null) {
            throw new Error('Attempted to operate on a mounted tree, but the component is no longer mounted');
        }
    };
    Root.prototype.withRoot = function (withRoot) {
        this.ensureRoot();
        return withRoot(this.root);
    };
    return Root;
}());
exports.Root = Root;
function defaultResolveRoot(element) {
    return element.children[0];
}
function flatten(element, root) {
    var node = findCurrentFiberUsingSlowPath(element);
    if (node.tag === types_1.Tag.HostText) {
        return [node.memoizedProps];
    }
    var props = tslib_1.__assign({}, (node.memoizedProps || {}));
    var _a = childrenToTree(node.child, root), children = _a.children, descendants = _a.descendants;
    return tslib_1.__spread([
        new element_1.Element({
            tag: node.tag,
            type: node.type,
            props: props,
            instance: node.stateNode,
        }, children, descendants, root)
    ], descendants);
}
function childrenToTree(fiber, root) {
    var currentFiber = fiber;
    var children = [];
    var descendants = [];
    while (currentFiber != null) {
        var result = flatten(currentFiber, root);
        if (result.length > 0) {
            children.push(result[0]);
            descendants.push.apply(descendants, tslib_1.__spread(result));
        }
        currentFiber = currentFiber.sibling;
    }
    return { children: children, descendants: descendants };
}
