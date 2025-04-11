"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToastManager = exports.initializeToast = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var ActionToast_1 = __importDefault(require("./ActionToast"));
var ToastManager = (0, react_1.forwardRef)(function (props, ref) {
    var _a = (0, react_1.useState)([]), toasts = _a[0], setToasts = _a[1];
    var showToast = function (options) {
        var toastId = Date.now().toString();
        setToasts(function (prev) { return __spreadArray(__spreadArray([], prev, true), [__assign(__assign({}, options), { id: toastId })], false); });
    };
    var hideToast = function (id) {
        setToasts(function (prev) { return prev.filter(function (toast) { return toast.id !== id; }); });
    };
    var showSuccess = function (message, title, position) {
        if (position === void 0) { position = "top"; }
        showToast({
            title: title || "Success",
            message: message,
            icon: "check-circle",
            gradientColors: ["#4CAF50", "#2E7D32"],
            position: position,
        });
    };
    var showError = function (message, title, position) {
        if (position === void 0) { position = "top"; }
        showToast({
            title: title || "Error",
            message: message,
            icon: "error",
            gradientColors: ["#F44336", "#C62828"],
            position: position,
        });
    };
    var showWarning = function (message, title, position) {
        if (position === void 0) { position = "top"; }
        showToast({
            title: title || "Warning",
            message: message,
            icon: "warning",
            gradientColors: ["#FF9800", "#F57C00"],
            position: position,
        });
    };
    var showInfo = function (message, title, position) {
        if (position === void 0) { position = "top"; }
        showToast({
            title: title || "Info",
            message: message,
            icon: "info",
            gradientColors: ["#2196F3", "#1565C0"],
            position: position,
        });
    };
    var showCustom = function (message, title, position, icon, backgroundColor, gradientColors) {
        if (position === void 0) { position = "top"; }
        showToast({
            title: title,
            message: message,
            position: position,
            icon: icon,
            backgroundColor: backgroundColor,
            gradientColors: gradientColors,
            actionButtons: [], // No action buttons for custom simple toast
        });
    };
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        showToast: showToast,
        showSuccess: showSuccess,
        showError: showError,
        showWarning: showWarning,
        showInfo: showInfo,
        showCustom: showCustom,
    }); });
    return (<react_native_1.View pointerEvents="box-none" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      {toasts.map(function (toast) { return (<ActionToast_1.default key={toast.id} {...toast} onHide={function () { return hideToast(toast.id); }}/>); })}
    </react_native_1.View>);
});
var toastRef = null;
var initializeToast = function () {
    toastRef = react_1.default.createRef();
    return toastRef;
};
exports.initializeToast = initializeToast;
var getToastManager = function () {
    if (!toastRef || !toastRef.current) {
        throw new Error("ToastManager not initialized. Call initializeToast() first.");
    }
    return toastRef.current;
};
exports.getToastManager = getToastManager;
exports.default = ToastManager;
//# sourceMappingURL=ToastManager.js.map