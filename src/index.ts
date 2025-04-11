import ToastManager, {
  initializeToast,
  getToastManager,
} from "./components/ToastManager";
import { ToastOptions } from "./types";

export { ToastManager, initializeToast };

export const showToast = (options: ToastOptions) => {
  try {
    const manager = getToastManager();
    manager.showToast(options);
  } catch (error) {
    console.error("Toast not initialized:", error);
  }
};

export type {
  ToastOptions,
  ActionButton,
  ToastPosition,
  ToastManagerHandle,
} from "./types";
