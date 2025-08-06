# Segment + CleverTap React Native Integration

This project demonstrates how to integrate **Segment React Native SDK (v1)** with **CleverTap** as a destination. It includes:

* Segment SDK setup
* CleverTap integration via Segment
* Identify user functionality
* Track custom events with and without properties

---

## ✅ Features

* Segment initialization with CleverTap destination
* User profile updates using `analytics.identify()`
* Event tracking using `analytics.track()`
* Sample UI with input fields for `name`, `identity`, `email`, and `phone`

---

## 🚀 Getting Started

### **1. Clone the Repository**

```bash
git clone https://github.com/rohkode/segment-reactnative.git
cd segment-reactnative
```

### **2. Install Dependencies**

```bash
npm install
```

---

## 📱 Running the App

### **iOS**

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

### **Android**

```bash
npx react-native run-android
```

---

## ⚙️ Configuration

### **Segment**

* Create a Segment **React Native source** in your Segment dashboard.
* Copy the **Write Key** and replace it in `App.tsx`:

```javascript
const segmentWriteKey = 'YOUR_SEGMENT_WRITE_KEY';
```

### **CleverTap**

* In Segment dashboard:

  * Go to your **React Native source** → **Destinations**.
  * Add **CleverTap** as a destination.
  * Enter your CleverTap **Account ID**, **Passcode**, and select the correct **Region**.

---

## ✅ Code Overview

### **Initialize Segment**

```javascript
await analytics.setup(segmentWriteKey, {
  trackAppLifecycleEvents: true,
  recordScreenViews: true,
});
(analytics as any).use(CleverTapIntegration);
```

### **Identify User**

```javascript
analytics.identify(identity, {
  name,
  email,
  phone,
});
```

### **Track Event**

```javascript
analytics.track('Button Clicked');
```

### **Track Event with Properties**

```javascript
analytics.track('Product Purchased', {
  productName: 'T-Shirt',
  price: 499,
  currency: 'INR',
});
```

---

## 🔍 Testing Integration

* **Segment Debugger**:

  * Go to **Connections → Sources → Your React Native Source → Debugger**.
  * Verify `Identify` and `Track` events are arriving.
* **CleverTap Dashboard**:

  * Go to **User Explorer** and search by `identity`.
  * Check user profile and events.

---

## ⚠️ Important Notes

* This project uses **Segment SDK v1 (v1.5.0)** because CleverTap currently **does not support v2**.
* If you're on React Native 0.70+:

  * Update Kotlin version in:

    * `node_modules/@segment/analytics-react-native/android/build.gradle`
    * `node_modules/@segment/analytics-react-native-clevertap/android/build.gradle`

---
* CleverTap Dashboard
  and make the README more visual? Or keep it simple for now?
