import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { fontFamily } from '@utils/fonts';
import Toast from 'react-native-toast-message';
SplashScreen.preventAutoHideAsync();

const loadFonts = () =>
  Font.loadAsync({
    [fontFamily.LIGHT]: require('@fonts/Sansation-Light.ttf'),
    [fontFamily.LIGHT_ITALIC]: require('@fonts/Sansation-LightItalic.ttf'),
    [fontFamily.REGULAR]: require('@fonts/Sansation-Regular.ttf'),
    [fontFamily.REGULAR_ITALIC]: require('@fonts/Sansation-Italic.ttf'),
    [fontFamily.BOLD]: require('@fonts/Sansation-Bold.ttf'),
    [fontFamily.BOLD_ITALIC]: require('@fonts/Sansation-BoldItalic.ttf'),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <DrawerNavigator />
      <Toast />
    </View>
  );
}
