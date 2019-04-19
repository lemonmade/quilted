"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var TestWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(TestWrapper, _super);
    function TestWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    // eslint-disable-next-line shopify/react-prefer-private-members
    TestWrapper.prototype.setProps = function (props) {
        this.setState({ props: props });
    };
    TestWrapper.prototype.render = function () {
        var props = this.state.props;
        var children = this.props.children;
        return props ? React.cloneElement(children, props) : children;
    };
    return TestWrapper;
}(React.Component));
exports.TestWrapper = TestWrapper;
