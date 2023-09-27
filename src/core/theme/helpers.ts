//https://stackoverflow.com/questions/69961218/react-native-app-design-is-different-in-different-ios-device

import { Dimensions, PixelRatio } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 11s's scale
const scalew = SCREEN_WIDTH / 828;
const scaleh = SCREEN_HEIGHT / 1792;

export function normalizeh(size: number) {
  const newSize = size * scaleh;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function normalizew(size: number) {
  const newSize = size * scalew;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
