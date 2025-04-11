import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View } from "react-native";
import ActionToast from "./ActionToast";
import { ToastOptions, ToastManagerHandle } from "../types";

interface ToastInstance extends ToastOptions {
  id: string;
}

const ToastManager = forwardRef<ToastManagerHandle>((props, ref) => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  const showToast = (options: ToastOptions) => {
    const toastId = Date.now().toString();
    setToasts((prev) => [...prev, { ...options, id: toastId }]);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (
    message: string,
    title?: string,
    position: "top" | "bottom" = "top"
  ) => {
    showToast({
      title: title || "Success",
      message,
      icon: "check-circle",
      gradientColors: ["#4CAF50", "#2E7D32"],
      position,
    });
  };

  const showError = (
    message: string,
    title?: string,
    position: "top" | "bottom" = "top"
  ) => {
    showToast({
      title: title || "Error",
      message,
      icon: "error",
      gradientColors: ["#F44336", "#C62828"],
      position,
    });
  };

  const showWarning = (
    message: string,
    title?: string,
    position: "top" | "bottom" = "top"
  ) => {
    showToast({
      title: title || "Warning",
      message,
      icon: "warning",
      gradientColors: ["#FF9800", "#F57C00"],
      position,
    });
  };

  const showInfo = (
    message: string,
    title?: string,
    position: "top" | "bottom" = "top"
  ) => {
    showToast({
      title: title || "Info",
      message,
      icon: "info",
      gradientColors: ["#2196F3", "#1565C0"],
      position,
    });
  };

  const showCustom = (
    message: string,
    title?: string,
    position: "top" | "bottom" = "top",
    icon?: string | React.ReactNode,
    backgroundColor?: string,
    gradientColors?: string[]
  ) => {
    showToast({
      title,
      message,
      position,
      icon,
      backgroundColor,
      gradientColors,
      actionButtons: [], // No action buttons for custom simple toast
    });
  };

  useImperativeHandle(ref, () => ({
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCustom,
  }));

  return (
    <View
      pointerEvents="box-none"
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {toasts.map((toast) => (
        <ActionToast
          key={toast.id}
          {...toast}
          onHide={() => hideToast(toast.id)}
        />
      ))}
    </View>
  );
});

let toastRef: React.RefObject<ToastManagerHandle> | null = null;

export const initializeToast = (): React.RefObject<ToastManagerHandle> => {
  toastRef = React.createRef<ToastManagerHandle>();
  return toastRef;
};

export const getToastManager = (): ToastManagerHandle => {
  if (!toastRef || !toastRef.current) {
    throw new Error(
      "ToastManager not initialized. Call initializeToast() first."
    );
  }
  return toastRef.current;
};

export default ToastManager;
