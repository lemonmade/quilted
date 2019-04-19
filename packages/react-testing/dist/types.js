"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/facebook/react/blob/master/packages/shared/ReactWorkTag.js
var Tag;
(function (Tag) {
    Tag[Tag["FunctionComponent"] = 0] = "FunctionComponent";
    Tag[Tag["ClassComponent"] = 1] = "ClassComponent";
    Tag[Tag["IndeterminateComponent"] = 2] = "IndeterminateComponent";
    Tag[Tag["HostRoot"] = 3] = "HostRoot";
    Tag[Tag["HostPortal"] = 4] = "HostPortal";
    Tag[Tag["HostComponent"] = 5] = "HostComponent";
    Tag[Tag["HostText"] = 6] = "HostText";
    Tag[Tag["Fragment"] = 7] = "Fragment";
    Tag[Tag["Mode"] = 8] = "Mode";
    Tag[Tag["ContextConsumer"] = 9] = "ContextConsumer";
    Tag[Tag["ContextProvider"] = 10] = "ContextProvider";
    Tag[Tag["ForwardRef"] = 11] = "ForwardRef";
    Tag[Tag["Profiler"] = 12] = "Profiler";
    Tag[Tag["SuspenseComponent"] = 13] = "SuspenseComponent";
    Tag[Tag["MemoComponent"] = 14] = "MemoComponent";
    Tag[Tag["SimpleMemoComponent"] = 15] = "SimpleMemoComponent";
    Tag[Tag["LazyComponent"] = 16] = "LazyComponent";
    Tag[Tag["IncompleteClassComponent"] = 17] = "IncompleteClassComponent";
    Tag[Tag["DehydratedSuspenseComponent"] = 18] = "DehydratedSuspenseComponent";
})(Tag = exports.Tag || (exports.Tag = {}));