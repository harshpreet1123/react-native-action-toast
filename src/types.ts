import { ViewStyle, TextStyle, ImageStyle, GestureResponderEvent } from 'react-native';
import React from 'react';

export type ToastPosition = 'top' | 'bottom' | 'center';

export interface ActionButton {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
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
  icon?: React.ReactNode;
  onDismiss?: () => void;
  swipeable?: boolean;
  animationDuration?: number;
  backgroundColor?: string;
}