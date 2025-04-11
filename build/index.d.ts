import ToastManager, { initializeToast } from "./components/ToastManager";
import { ToastOptions } from "./types";
export { ToastManager, initializeToast };
export declare const showToast: (options: ToastOptions) => void;
export type { ToastOptions, ActionButton, ToastPosition, ToastManagerHandle, } from "./types";
