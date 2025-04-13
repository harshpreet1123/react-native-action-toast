# React Native Action Toast 🚀

[![Demo Video](https://img.shields.io/badge/DEMO-VIDEO-blueviolet?style=for-the-badge)](https://res.cloudinary.com/dmyxu8m6x/video/upload/v1744442001/gnjlntdsl8dgdied1rkc.mp4)
[![npm version](https://img.shields.io/npm/v/react-native-action-toast.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-action-toast)

An elegant toast notification library for React Native featuring interactive action buttons, smooth animations, and seamless Expo integration

---

## ✨ Features

- 🎨 Stunning gradient backgrounds  
- 🛠 Customizable action buttons  
- 📱 Expo compatible (no native linking required)  
- ⚡ Position options: `top` or `bottom`  
- 🔔 Built-in notification types: `success`, `error`, etc.

---

## 🎥 Watch it in Action

[![Watch the demo](https://img.shields.io/badge/WATCH_DEMO-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://res.cloudinary.com/dmyxu8m6x/video/upload/v1744442001/gnjlntdsl8dgdied1rkc.mp4)

*(Click the badge above to watch the demo video)*

---

## 📦 Installation

```
npm install react-native-action-toast
```
or
```
yarn add react-native-action-toast
```
or
```
npx expo install react-native-action-toast
```
---
## 🪶Quick Start
1. Add ToastManger in App
```
import { ToastManager, initializeToast } from 'react-native-action-toast';

export default function App() {
  const toastRef = initializeToast(); // intialze ref
  
  return (
    <>
      {/* Your app content */}
      <ToastManager ref={toastRef} /> // Add ToastManger and pass the toastRef
    </>
  );
}
```

2. Start using toasts anywhere in the app.
```
import { getToastManager } from 'react-native-action-toast';


// Toast with action buttons
getToastManager().showToast({
  title: "New Message",
  message: "You have 3 unread conversations",
  position: "top",
  actionButtons: [
    {
      text: "View",
      onPress: () => console.log("View pressed"),
      backgroundColor: "#4CAF50"
    }
  ]
});

// Quick methods
//Success
getToastManager().showSuccess(
    "Profile Saved", //messgae
    undefined, //backgroundColor if not passed will use default colors
    "bottom" //position
    )
// Error
getToastManager().showError(
    "Failed to save changes",
    "red",
    "top"
    )
//Similar showInfo and showWarning methods
    
//Quick custom toast
getToastManager().showCustom(
    "Custom settings have been applied", //message
    "Custom Style", //title
    "bottom", //postiton
    "palette", //icon name
    undefined, //backgroundColor
    ["#9c27b0", "#673ab7"] //gradinet colors
    )
```
---
## 📚 API Reference

#### 🔔 Toast Options

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>title</code></td>
      <td><code>string</code></td>
      <td>-</td>
      <td>Toast title</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td><code>string</code></td>
      <td>-</td>
      <td>Toast message</td>
    </tr>
    <tr>
      <td><code>position</code></td>
      <td><code>'top'</code> or <code>'bottom'</code></td>
      <td><code>'bottom'</code></td>
      <td>Toast position</td>
    </tr>
    <tr>
      <td><code>duration</code></td>
      <td><code>number</code></td>
      <td><code>4000</code></td>
      <td>Display duration in ms</td>
    </tr>
    <tr>
      <td><code>icon</code></td>
      <td><code>string</code> or <code>ReactNode</code></td>
      <td>-</td>
      <td>Icon name or custom component</td>
    </tr>
    <tr>
      <td><code>gradientColors</code></td>
      <td><code>string[]</code></td>
      <td>-</td>
      <td>Gradient background colors</td>
    </tr>
    <tr>
      <td><code>backgroundColor</code></td>
      <td><code>string</code></td>
      <td>-</td>
      <td>Solid background color (alternative)</td>
    </tr>
    <tr>
      <td><code>actionButtons</code></td>
      <td><code>ActionButton[]</code></td>
      <td>-</td>
      <td>Array of action buttons</td>
    </tr>
  </tbody>
</table>

---

## 🧩 ActionButton

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>text</code></td>
      <td><code>string</code></td>
      <td>Button label</td>
    </tr>
    <tr>
      <td><code>onPress</code></td>
      <td><code>function</code></td>
      <td>Click handler</td>
    </tr>
    <tr>
      <td><code>backgroundColor</code></td>
      <td><code>string</code></td>
      <td>Button background</td>
    </tr>
    <tr>
      <td><code>textStyle</code></td>
      <td><code>TextStyle</code></td>
      <td>Optional text styles</td>
    </tr>
    <tr>
      <td><code>icon</code></td>
      <td><code>ReactNode</code></td>
      <td>Optional custom icon</td>
    </tr>
    <tr>
      <td><code>iconPosition</code></td>
      <td><code>'left'</code> or <code>'right'</code></td>
      <td>Icon position</td>
    </tr>
  </tbody>
</table>

---
## 🎨 Examples

```
// Custom toast with two buttons
getToastManager().showToast({
  title: "New Feature Available",
  message: "Try our new dark mode!",
  position: "top",
  icon: "star",
  gradientColors: ["#6a11cb", "#2575fc"],
  actionButtons: [
    {
      text: "Enable",
      onPress: enableDarkMode,
      backgroundColor: "#2575fc"
    },
    {
      text: "Later",
      onPress: () => {},
      backgroundColor: "rgba(255,255,255,0.2)"
    }
  ]
});
```
