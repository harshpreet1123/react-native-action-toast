import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { ToastOptions, ActionButton } from "../types";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const TOAST_WIDTH = Math.min(WINDOW_WIDTH - 40, 400);

const ActionToast: React.FC<ToastOptions & { onHide: () => void }> = ({
  title,
  message,
  duration = 4000,
  position = "bottom",
  actionButtons = [],
  titleStyle,
  messageStyle,
  containerStyle,
  icon,
  onDismiss,
  onHide,
  swipeable = true,
  animationDuration = 500,
  backgroundColor,
  gradientColors = ["#4c669f", "#3b5998", "#192f6a"],
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = React.useState(true);
  const pan = React.useRef(new Animated.ValueXY()).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  // Spring animation values
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange:
      position === "top"
        ? [-100, 40]
        : position === "bottom"
        ? [100, -40]
        : [0, 0],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.05, 1],
  });

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss timer
    const timer = setTimeout(() => {
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hideToast = () => {
    if (!isVisible) return;

    setIsVisible(false);
    Animated.parallel([
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
        friction: 10,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
      onDismiss?.();
    });
  };

  const handleActionPress = (btn: ActionButton, e: GestureResponderEvent) => {
    btn.onPress(e);
    hideToast();
  };

  const renderActionButton = (button: ActionButton, index: number) => {
    const isPrimary = index === 0 && actionButtons.length > 1;
    const buttonBgColor = button.backgroundColor
      ? button.backgroundColor
      : isPrimary
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,255,255,0.2)";

    return (
      <TouchableOpacity
        key={`action-${index}`}
        onPress={(e) => handleActionPress(button, e)}
        activeOpacity={0.7}
        style={[
          styles.actionButton,
          { backgroundColor: buttonBgColor },
          button.buttonStyle,
        ]}
      >
        {button.iconPosition === "left" && button.icon && (
          <View style={styles.buttonIcon}>{button.icon}</View>
        )}
        <Text
          style={[
            styles.actionButtonText,
            isPrimary ? styles.primaryActionText : styles.secondaryActionText,
            button.textStyle,
          ]}
        >
          {button.text}
        </Text>
        {button.iconPosition === "right" && button.icon && (
          <View style={styles.buttonIcon}>{button.icon}</View>
        )}
      </TouchableOpacity>
    );
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [
            { translateY },
            { scale },
            ...pan.getTranslateTransform(),
          ],
          [position]: position === "top" ? 0 : 20,
        },
        containerStyle,
      ]}
    >
      <LinearGradient
        colors={
          backgroundColor
            ? [backgroundColor, backgroundColor]
            : (gradientColors as [string, string, ...string[]])
        }
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {icon && (
            <View style={styles.iconContainer}>
              {typeof icon === "string" ? (
                <MaterialIcons name={icon as any} size={24} color="#fff" />
              ) : (
                icon
              )}
            </View>
          )}

          <View style={styles.textContainer}>
            {title && (
              <Text
                style={[styles.title, titleStyle]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            )}
            <Text
              style={[styles.message, messageStyle]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {message}
            </Text>
          </View>

          {swipeable && (
            <TouchableOpacity
              onPress={hideToast}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons
                name="close"
                size={20}
                color="rgba(255,255,255,0.7)"
              />
            </TouchableOpacity>
          )}
        </View>

        {actionButtons.length > 0 && (
          <View
            style={[
              styles.actionsContainer,
              actionButtons.length > 1 && styles.multipleActions,
            ]}
          >
            {actionButtons.map(renderActionButton)}
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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

export default ActionToast;
