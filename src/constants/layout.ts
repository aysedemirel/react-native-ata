import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

const getDeviceType = () => {
  const minDimension = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
  const maxDimension = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT);

  if (Platform.OS === 'ios') {
    const isIPadPro13 =
      minDimension >= 1000 &&
      minDimension <= 1050 &&
      maxDimension >= 1350 &&
      maxDimension <= 1400;

    const isIPadPro129 =
      minDimension >= 1000 &&
      minDimension <= 1050 &&
      maxDimension >= 1350 &&
      maxDimension <= 1380;

    const isIPadPro11 =
      minDimension >= 800 &&
      minDimension <= 850 &&
      maxDimension >= 1150 &&
      maxDimension <= 1250;

    if (
      isIPadPro13 ||
      isIPadPro129 ||
      isIPadPro11 ||
      minDimension >= 768 ||
      (SCREEN_WIDTH >= 768 && SCREEN_HEIGHT >= 1024) ||
      (SCREEN_WIDTH >= 1024 && SCREEN_HEIGHT >= 768)
    ) {
      return 'tablet';
    }

    if (SCREEN_WIDTH < 375 && ASPECT_RATIO > 1.5) {
      return 'small';
    }

    if (ASPECT_RATIO < 1.3 || ASPECT_RATIO > 2.5) {
      return 'unusual';
    }

    return 'normal';
  }

  if (Platform.OS === 'android') {
    // Pixel Tablet: 2560 x 1600 (minDim: 1600)
    // Samsung Tab S9: 2800 x 1752 (minDim: 1752)
    if (
      minDimension >= 600 ||
      (SCREEN_WIDTH >= 600 && SCREEN_HEIGHT >= 960) ||
      (SCREEN_WIDTH >= 960 && SCREEN_HEIGHT >= 600)
    ) {
      const isLikelyTV =
        minDimension >= 1920 && ASPECT_RATIO >= 1.7 && ASPECT_RATIO <= 1.8; // ~16:9

      if (isLikelyTV) {
        return 'tv';
      }

      return 'tablet';
    }

    if (SCREEN_WIDTH < 360 && ASPECT_RATIO > 1.5) {
      return 'small';
    }

    if (ASPECT_RATIO < 1.3 || ASPECT_RATIO > 2.5) {
      return 'unusual';
    }

    return 'normal';
  }

  return 'normal';
};

const DEVICE_TYPE = getDeviceType();

export const isTablet = DEVICE_TYPE === 'tablet';
export const isSmallDevice = DEVICE_TYPE === 'small';
export const isTV = DEVICE_TYPE === 'tv';
export const isUnusualAspectRatio = DEVICE_TYPE === 'unusual';
export const isPortrait = SCREEN_HEIGHT >= SCREEN_WIDTH;
export const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

const isTabletPortrait = isTablet && isPortrait;

const getScaleFactor = () => {
  switch (DEVICE_TYPE) {
    case 'tv':
      return 0.5;
    case 'tablet':
      const minDim = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);

      // iPad Pro 13"
      if (Platform.OS === 'ios' && minDim >= 1000 && minDim <= 1050) {
        return 0.75;
      }

      // iPad Pro 11"
      if (minDim >= 800 && minDim <= 850) {
        return 0.85;
      }

      // Pixel Tablet
      if (Platform.OS === 'android' && minDim >= 1600) {
        return 0.65;
      }

      return 0.7;
    case 'small':
      return 1;
    case 'unusual':
      return ASPECT_RATIO < 1.3 ? 0.6 : 1.1;
    default:
      return 1;
  }
};

const getFontScaleFactor = () => {
  switch (DEVICE_TYPE) {
    case 'tv':
      return 0.8;
    case 'tablet':
      const minDim = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);

      // iPad Pro 13"
      if (Platform.OS === 'ios' && minDim >= 1000 && minDim <= 1050) {
        return 1.1;
      }

      // iPad Pro 11"
      if (minDim >= 800 && minDim <= 850) {
        return 1.05;
      }

      // (Pixel Tablet: 2560x1600)
      if (Platform.OS === 'android' && minDim >= 1600) {
        return 0.95;
      }

      return 1.0;
    case 'small':
      return 1;
    case 'unusual':
      return ASPECT_RATIO < 1.3 ? 0.8 : 1.1;
    default:
      return 1;
  }
};

const SCALE_FACTOR = getScaleFactor();
const FONT_SCALE_FACTOR = getFontScaleFactor();

export const wp = (percentage: number) => {
  const value = (SCREEN_WIDTH * percentage) / 100;
  return value * SCALE_FACTOR;
};

export const hp = (percentage: number) => {
  const value = (SCREEN_HEIGHT * percentage) / 100;

  if (isTabletPortrait) {
    const heightScaleFactor = ASPECT_RATIO < 1.5 ? 1.2 : 1.0;
    return value * SCALE_FACTOR * heightScaleFactor;
  }

  return value * SCALE_FACTOR;
};

export const hpFixed = (percentage: number) => {
  const value = (SCREEN_HEIGHT * percentage) / 100;

  if (isTabletPortrait) {
    return value * SCALE_FACTOR * 1.3;
  }

  return value * SCALE_FACTOR;
};

export const hpNormalized = (percentage: number) => {
  const baseAspectRatio = 16 / 9;
  const currentAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  const aspectRatioCompensation = currentAspectRatio / baseAspectRatio;

  const value = (SCREEN_HEIGHT * percentage) / 100;
  return value * SCALE_FACTOR * aspectRatioCompensation;
};

// ABSOLUTE WIDTH - No scaling (for full-width containers)
// Use this for elements that should be exact screen width
// Example: Modal backgrounds, slide containers, full-width images
export const absoluteWidth = (percentage: number) => {
  return (SCREEN_WIDTH * percentage) / 100;
};

// ABSOLUTE HEIGHT - No scaling (for full-height containers)
// Use this for elements that should be exact screen height
// Example: Modal backgrounds, full-screen views
export const absoluteHeight = (percentage: number) => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

export const normalize = (size: number) => {
  const shortestSide = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
  const baseWidth = isTablet ? 768 : 375;
  const scale = shortestSide / baseWidth;
  const adjustedScale = isTablet ? Math.min(Math.max(scale, 0.9), 1.1) : scale;
  const scaledSize = size * adjustedScale;
  const finalSize = scaledSize * SCALE_FACTOR;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(finalSize));
  }
  return Math.round(finalSize);
};

export const normalizeFont = (size: number) => {
  const shortestSide = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
  const baseWidth = isTablet ? 768 : 375;
  const scale = shortestSide / baseWidth;
  const adjustedScale = isTablet ? Math.min(Math.max(scale, 0.85), 1.1) : scale;
  const scaledSize = size * adjustedScale;
  const finalSize = scaledSize * FONT_SCALE_FACTOR;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(finalSize));
  }
  return Math.round(finalSize);
};

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768;
export const isLargeDevice = SCREEN_WIDTH >= 768;
export const isExtraLargeDevice = SCREEN_WIDTH >= 1024;

export const statusBarHeight = Platform.select({
  ios: 20,
  android: StatusBar.currentHeight || 100,
  default: 0,
});

export { ASPECT_RATIO, SCREEN_HEIGHT, SCREEN_WIDTH };

