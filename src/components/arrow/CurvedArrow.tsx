import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { hp } from '../../constants/layout';
import { useTheme } from '../../providers/ThemeProvider';

const CurvedArrow = () => {
  const { theme } = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);

  useEffect(() => {
    const animation = withSequence(
      withTiming(1, { duration: 800 }),
      withTiming(0, { duration: 800 }),
    );

    const translateAnimation = withSequence(
      withTiming(10, { duration: 800 }),
      withTiming(-10, { duration: 800 }),
    );

    opacity.value = withRepeat(animation, -1, false);
    translateY.value = withRepeat(translateAnimation, -1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.arrowContainer, animatedStyle]}>
      <Svg width="50" height="70" viewBox="0 0 50 70">
        <Defs>
          <LinearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop
              offset="0%"
              stopColor={theme.primary || '#667eea'}
              stopOpacity="0.2"
            />
            <Stop
              offset="100%"
              stopColor={theme.primary || '#667eea'}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        {/* Curved arrow */}
        <Path
          d="M 25 5 Q 25 35, 25 50"
          stroke="url(#gradient2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow Head */}
        <Path
          d="M 25 50 L 20 45 M 25 50 L 30 45"
          stroke="url(#gradient2)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
};

export default CurvedArrow;

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
    zIndex: 10,
  },
});
