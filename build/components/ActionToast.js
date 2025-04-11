"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var WINDOW_WIDTH = react_native_1.Dimensions.get("window").width;
var TOAST_WIDTH = Math.min(WINDOW_WIDTH - 40, 400);
var ActionToast = function (_a) {
    var _b;
    var title = _a.title, message = _a.message, _c = _a.duration, duration = _c === void 0 ? 4000 : _c, _d = _a.position, position = _d === void 0 ? "bottom" : _d, _e = _a.actionButtons, actionButtons = _e === void 0 ? [] : _e, titleStyle = _a.titleStyle, messageStyle = _a.messageStyle, containerStyle = _a.containerStyle, icon = _a.icon, onDismiss = _a.onDismiss, onHide = _a.onHide, _f = _a.swipeable, swipeable = _f === void 0 ? true : _f, _g = _a.animationDuration, animationDuration = _g === void 0 ? 500 : _g, backgroundColor = _a.backgroundColor, _h = _a.gradientColors, gradientColors = _h === void 0 ? ["#4c669f", "#3b5998", "#192f6a"] : _h;
    var animatedValue = react_1.default.useRef(new react_native_1.Animated.Value(0)).current;
    var _j = react_1.default.useState(true), isVisible = _j[0], setIsVisible = _j[1];
    var pan = react_1.default.useRef(new react_native_1.Animated.ValueXY()).current;
    var opacity = react_1.default.useRef(new react_native_1.Animated.Value(0)).current;
    // Spring animation values
    var translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: position === "top"
            ? [-100, 40]
            : position === "bottom"
                ? [100, -40]
                : [0, 0],
    });
    var scale = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.8, 1.05, 1],
    });
    (0, react_1.useEffect)(function () {
        // Entry animation
        react_native_1.Animated.parallel([
            react_native_1.Animated.spring(animatedValue, {
                toValue: 1,
                useNativeDriver: true,
                friction: 8,
                tension: 40,
            }),
            react_native_1.Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
        // Auto-dismiss timer
        var timer = setTimeout(function () {
            hideToast();
        }, duration);
        return function () { return clearTimeout(timer); };
    }, []);
    var hideToast = function () {
        if (!isVisible)
            return;
        setIsVisible(false);
        react_native_1.Animated.parallel([
            react_native_1.Animated.spring(animatedValue, {
                toValue: 0,
                useNativeDriver: true,
                friction: 10,
            }),
            react_native_1.Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(function () {
            onHide();
            onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
        });
    };
    var handleActionPress = function (btn, e) {
        btn.onPress(e);
        hideToast();
    };
    var renderActionButton = function (button, index) {
        var isPrimary = index === 0 && actionButtons.length > 1;
        var buttonBgColor = button.backgroundColor
            ? button.backgroundColor
            : isPrimary
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.2)";
        return (<react_native_1.TouchableOpacity key={"action-".concat(index)} onPress={function (e) { return handleActionPress(button, e); }} activeOpacity={0.7} style={[
                styles.actionButton,
                { backgroundColor: buttonBgColor },
                button.buttonStyle,
            ]}>
        {button.iconPosition === "left" && button.icon && (<react_native_1.View style={styles.buttonIcon}>{button.icon}</react_native_1.View>)}
        <react_native_1.Text style={[
                styles.actionButtonText,
                isPrimary ? styles.primaryActionText : styles.secondaryActionText,
                button.textStyle,
            ]}>
          {button.text}
        </react_native_1.Text>
        {button.iconPosition === "right" && button.icon && (<react_native_1.View style={styles.buttonIcon}>{button.icon}</react_native_1.View>)}
      </react_native_1.TouchableOpacity>);
    };
    if (!isVisible)
        return null;
    return (<react_native_1.Animated.View style={[
            styles.container,
            (_b = {
                    opacity: opacity,
                    transform: __spreadArray([
                        { translateY: translateY },
                        { scale: scale }
                    ], pan.getTranslateTransform(), true)
                },
                _b[position] = position === "top" ? 0 : 20,
                _b),
            containerStyle,
        ]}>
      <expo_linear_gradient_1.LinearGradient colors={backgroundColor
            ? [backgroundColor, backgroundColor]
            : gradientColors} start={[0, 0]} end={[1, 1]} style={styles.gradient}>
        <react_native_1.View style={styles.content}>
          {icon && (<react_native_1.View style={styles.iconContainer}>
              {typeof icon === "string" ? (<vector_icons_1.MaterialIcons name={icon} size={24} color="#fff"/>) : (icon)}
            </react_native_1.View>)}

          <react_native_1.View style={styles.textContainer}>
            {title && (<react_native_1.Text style={[styles.title, titleStyle]} numberOfLines={1} ellipsizeMode="tail">
                {title}
              </react_native_1.Text>)}
            <react_native_1.Text style={[styles.message, messageStyle]} numberOfLines={2} ellipsizeMode="tail">
              {message}
            </react_native_1.Text>
          </react_native_1.View>

          {swipeable && (<react_native_1.TouchableOpacity onPress={hideToast} style={styles.closeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <vector_icons_1.MaterialIcons name="close" size={20} color="rgba(255,255,255,0.7)"/>
            </react_native_1.TouchableOpacity>)}
        </react_native_1.View>

        {actionButtons.length > 0 && (<react_native_1.View style={[
                styles.actionsContainer,
                actionButtons.length > 1 && styles.multipleActions,
            ]}>
            {actionButtons.map(renderActionButton)}
          </react_native_1.View>)}
      </expo_linear_gradient_1.LinearGradient>
    </react_native_1.Animated.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        position: "absolute",
        width: TOAST_WIDTH,
        alignSelf: "center",
        borderRadius: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
        overflow: "hidden",
        zIndex: 9999,
    },
    gradient: {
        padding: 16,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    iconContainer: {
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        lineHeight: 20,
        color: "rgba(255,255,255,0.9)",
    },
    closeButton: {
        padding: 4,
        marginLeft: 8,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
    },
    multipleActions: {
        justifyContent: "space-between",
    },
    actionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    primaryAction: {
        backgroundColor: "rgba(255,255,255,0.9)",
    },
    secondaryAction: {
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: "500",
    },
    primaryActionText: {
        color: "#4c669f",
    },
    secondaryActionText: {
        color: "#fff",
    },
    buttonIcon: {
        marginHorizontal: 4,
    },
});
exports.default = ActionToast;
//# sourceMappingURL=ActionToast.js.map