import React from "react";
import ReactNative from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./redux";

try {
  ReactNative.I18nManager.allowRTL(false);
  ReactNative.I18nManager.forceRTL(false);
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e);
}

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
          <StatusBar backgroundColor="#0b3a90" />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
