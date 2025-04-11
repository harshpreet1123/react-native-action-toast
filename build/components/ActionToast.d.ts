import React from "react";
import { ToastOptions } from "../types";
declare const ActionToast: React.FC<ToastOptions & {
    onHide: () => void;
}>;
export default ActionToast;
