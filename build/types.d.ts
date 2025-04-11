import { ViewStyle, TextStyle, GestureResponderEvent } from "react-native";
import React from "react";
export type ToastPosition = "top" | "bottom";
export interface ActionButton {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    textStyle?: TextStyle;
    buttonStyle?: ViewStyle;
    backgroundColor?: string;
    icon?: React.ReactNode | string;
    iconPosition?: "left" | "right";
}
export interface ToastOptions {
    title?: string;
    message: string;
    duration?: number;
    position?: ToastPosition;
    actionButtons?: ActionButton[];
    titleStyle?: TextStyle;
    messageStyle?: TextStyle;
    containerStyle?: ViewStyle;
    icon?: React.ReactNode | string;
    onDismiss?: () => void;
    swipeable?: boolean;
    animationDuration?: number;
    backgroundColor?: string;
    gradientColors?: string[];
}
export interface ToastManagerHandle {
    showToast: (options: ToastOptions) => void;
    showSuccess: (message: string, title?: string, position?: "top" | "bottom") => void;
    showError: (message: string, title?: string, position?: "top" | "bottom") => void;
    showWarning: (message: string, title?: string, position?: "top" | "bottom") => void;
    showInfo: (message: string, title?: string, position?: "top" | "bottom") => void;
    showCustom: (message: string, title?: string, position?: "top" | "bottom", icon?: string | React.ReactNode, backgroundColor?: string, gradientColors?: string[]) => void;
}
