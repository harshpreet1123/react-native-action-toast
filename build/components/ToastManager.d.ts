import React from "react";
import { ToastManagerHandle } from "../types";
declare const ToastManager: React.ForwardRefExoticComponent<React.RefAttributes<ToastManagerHandle>>;
export declare const initializeToast: () => React.RefObject<ToastManagerHandle>;
export declare const getToastManager: () => ToastManagerHandle;
export default ToastManager;
