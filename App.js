import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/main";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          JosefinSansRegular: require("./fonts/JosefinSans-Regular.ttf"),
          JosefinSansMedium: require("./fonts/JosefinSans-Medium.ttf"),
          JosefinSansBold: require("./fonts/JosefinSans-Bold.ttf"),
          LatoRegular: require("./fonts/Lato-Regular.ttf"),
          LatoSemiBold: require("./fonts/Lato-SemiBold.ttf"),
          LatoBold: require("./fonts/Lato-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <Main />
      </Provider>
    </View>
  );
}
